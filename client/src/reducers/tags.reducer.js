import * as firebaseAPI from '../api/FirebaseAPI';
import { createActionSet } from '../utils/action.helper';

export const FETCH_TAGS = createActionSet('FETCH_TAGS');

export const SELECT_TAGS = 'SELECT_TAGS';

const initialState = {
    tags: null,
    isLoading: false,
    error: null,
    selected: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS.PENDING:
            return { ...state, isLoading: true };

        case FETCH_TAGS.REJECTED:
            return { ...state, isLoading: false, error: action.payload };
        case FETCH_TAGS.FULFILLED:
            return { ...state, isLoading: false, tags: action.payload };

        case SELECT_TAGS:
            return { ...state, selected: action.payload };

        default:
            return state;
    }
};

export const fetchTagsAction = () => {
    return {
        type: FETCH_TAGS.BASE,
        payload: firebaseAPI.getTags()
    };
};

export const setSelectedTagsAction = tags => {
    return {
        type: SELECT_TAGS,
        payload: tags
    };
};
