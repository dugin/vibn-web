import {SET_EVENT} from "../actions/event";

const initialState = {
    event: {}
};

export const eventReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_EVENT:
            return {
                ...state,
                event: action.event
            };

        default:
            return state;
    }

};

export default eventReducer;