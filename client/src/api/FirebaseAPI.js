import firebase from 'firebase';
import 'firebase/firestore';
import { TAGS } from '../utils/constants';

const db = firebase.firestore();

export const getTags = type => {
  const tagsRef = db.collection('tags');

  switch (type) {
    case TAGS.LOCATION_REGION:
      return tagsRef.doc(TAGS.LOCATION_REGION).get();
    case TAGS.PARTY_KIND:
      return tagsRef.doc(TAGS.PARTY_KIND).get();
    case TAGS.MUSIC_STYLE:
      return tagsRef.doc(TAGS.MUSIC_STYLE).get();

    default:
      return null;
  }
};

export const postEvent = event => {
  const eventsRef = db.collection('events').doc(event.id);

  return eventsRef.set(event, { merge: true });
};

export const isEventExist = id => {
  const eventsRef = db.collection('events').doc(id);

  return eventsRef.get().then(resp => resp.exists);
};
