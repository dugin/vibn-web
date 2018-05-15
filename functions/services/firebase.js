const admin = require('firebase-admin');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');
const functions = require('firebase-functions');

class Firebase {
  constructor() {
    this.init();
  }

  init() {
    this.EVENTS = 'events';
    admin.initializeApp(functions.config().firebase);
    this.db = admin.firestore();
  }

  getEventsAfterToday() {
    return this.db
      .collection(this.EVENTS)
      .where('endDate', '>=', moment().toDate())
      .get();
  }

  updateEvent(event) {
    console.log('Atualizando o Evento ' + event.name);
    return this.db
      .collection(this.EVENTS)
      .doc(event.id)
      .update(this.setEventObject(event));
  }

  setEventObject(event) {
    let obj = {};

    if (event.place) {
      if (event.place.location) {
        obj = {
          address: event.place.location.street || null,
          city: event.place.location.city || null,
          state: event.place.location.state || null
        };
        if (event.place.location.latitude && event.place.location.longitude)
          obj.coordinates = new admin.firestore.GeoPoint(
            Number.parseFloat(event.place.location.latitude),
            Number.parseFloat(event.place.location.longitude)
          );
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

    return obj;
  }
}

module.exports = Firebase;
