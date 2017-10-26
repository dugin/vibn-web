const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment-timezone');
moment.tz.setDefault("America/Sao_Paulo");
const geo = require('firebase/firestore/api/geo_point');

moment.locale('pt-BR');

const FB = require('fb'),
    fb = new FB.Facebook({
        accessToken: '876019839240922|hjW0NAxrXjS7GTFsvTLIDDo8TZk',
        appId: '876019839240922',
        appSecret: '2dde1311c1dcbdc9f4928178f3923945',
        version: 'v2.4',
    });
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.updateEvents = functions.https.onRequest((request, response) => {

    db.collection('events')
        .where('endDate', '>=', moment().toDate())
        .get()
        .then(snapshot => {
            const ids = [];

            snapshot.forEach(doc => {
                ids.push(doc.id);
            });

            console.log(`Atualizando ${ids.length} eventos...`);

            return Promise.all(
                ids.map(id => getEventFromFacebook(id)
                    .then(updateEventOnFirebase)
                    .catch(err => console.error(err)))
            )
        })
        .then(val => response.send("Atualização dos Eventos feita com sucesso!"))
        .catch(err => response.send(err))
});


function updateEventOnFirebase(event) {

    if (typeof event === 'object') {
        console.log('Evento ID: ' + event.id);
        return db.collection('events').doc(event.id)
            .update(setEventObject(event));
    }
    else
        return Promise.resolve();
}

function setEventObject(event) {
    let place = {};

    if (event.place) {
        if (event.place.location) {
            place = {
                address: event.place.location.street || null,
                city: event.place.location.city || null,
                state: event.place.location.state || null,

            };
            // if (event.place.location.latitude && event.place.location.longitude)
            //     place.coordinates =new geo.GeoPoint(Number.parseFloat(event.place.location.latitude), Number.parseFloat(event.place.location.longitude))
        }
        place.name = event.place.name || null;
    }
    return {
        startDate: moment(event.start_time).toDate(),
        endDate: moment(event.end_time).toDate(),
        img: event.cover.source,
        modifiedAt: moment().toDate(),
        ...place,
        attendingCount: event.attending_count,
        description: event.description,
        id: event.id,
        title: event.name
    };
}

function getEventFromFacebook(id) {

    return new Promise((resolve, reject) => {
        fb.api(id, {fields: 'id,name,attending_count,cover,description,is_canceled,owner,start_time,end_time,place'}, (res) => {
            if (!res || res.error) {
                reject(res.error);
            }
            else
                resolve(res);
        });
    })
}