const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment-timezone');
moment.tz.setDefault("America/Sao_Paulo");

moment.locale('pt-BR');

const FB = require('fb'),
    fb = new FB.Facebook({
        accessToken: functions.config().facebook.accesstoken,
        appId: functions.config().facebook.appid,
        appSecret: functions.config().facebook.appsecret,
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
    let obj = {};

    if (event.place) {
        if (event.place.location) {
            obj = {
                address: event.place.location.street || null,
                city: event.place.location.city || null,
                state: event.place.location.state || null,
            };
            if (event.place.location.latitude && event.place.location.longitude)
                obj.coordinates = new admin.firestore.GeoPoint(Number.parseFloat(event.place.location.latitude), Number.parseFloat(event.place.location.longitude))
        }
        obj.place = event.place.name || null;
    }

    obj.startDate = moment(event.start_time).toDate();
    obj.endDate = moment(event.end_time).toDate();
    obj.img = event.cover.source;
    obj.modifiedAt = moment().toDate();
    obj.attendingCount = event.attending_count;
    obj.description = event.description;
    obj.id = event.id;
    obj.title = event.name;

    return obj;
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