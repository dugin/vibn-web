import firebase from 'firebase';
import firestore from 'firebase/firestore';
import {TAGS} from "../utils/constants";


const db = firebase.firestore();


export const getTags = (type) => {

    const tagsRef = db.collection("tags");

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

export const postEvent = (event) => {
    const eventsRef = db.collection("events");

    return eventsRef.add(event);
};