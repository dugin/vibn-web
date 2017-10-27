const functions = require('firebase-functions');

const Facebook = require('./services/facebook');
const Firebase = require('./services/firebase');

const firebase = new Firebase();
const facebook = new Facebook();

exports.updateEvents = functions.https.onRequest((request, response) => {
    console.log(`Iniciando a function updateEvents...`);

    firebase.getEventsAfterToday()
        .then(snapshot => {
            const ids = [];

            snapshot.forEach(doc => {
                ids.push(doc.id);
            });

            console.log(`Atualizando ${ids.length} eventos...`);

            return Promise.all(
                ids.map(id => facebook.getEvent(id)
                    .then(event => firebase.updateEvent(event))
                    .catch(err => console.error(err))
                ))
        })
        .then(val => response.send("Atualização dos Eventos feita com sucesso!"))
        .catch(err => response.send(err))
});

