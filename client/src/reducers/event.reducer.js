import { createActionSet } from '../utils/action.helper';
import * as facebookAPI from '../api/FacebookAPI';
import * as firebaseAPI from '../api/FirebaseAPI';

export const SET_EVENT = 'SET_EVENT';
export const FETCH_EVENT = createActionSet('FETCH_EVENT');
export const POST_EVENT = createActionSet('POST_EVENT');

export const ERRORS_TYPE = {
    ALREADY_IN_DATABASE : 'ALREADY_IN_DATABASE'
};

const initialState = {
  event: {},
  isLoading: null
};

export const eventReducer = (state = initialState, action) => {
  console.log(action.type);

  switch (action.type) {
    case FETCH_EVENT.PENDING:
    case POST_EVENT.PENDING:
      return { ...state, isLoading: true };

    case FETCH_EVENT.REJECTED:
    case POST_EVENT.REJECTED:
      return { ...state, isLoading: false, ...action.payload };
    case FETCH_EVENT.FULFILLED:
    case SET_EVENT:
      return { ...state, isLoading: false, event: action.payload };

    case POST_EVENT.FULFILLED:
      return initialState;

    default:
      return state;
  }
};

export default eventReducer;

export const setEventAction = event => {
  return {
    type: SET_EVENT,
    payload: event
  };
};

export const postEventAction = event => {
  return {
    type: POST_EVENT.BASE,
    payload: firebaseAPI.postEvent(event)
  };
};

export const fetchEventAction = eventID => async dispatch => {
  dispatch({
    type: FETCH_EVENT.PENDING
  });

  try {
    const exist = await firebaseAPI.isEventExist(eventID);

    if (!exist) {
      const event = await facebookAPI.getEvent(eventID);

      dispatch({
        type: FETCH_EVENT.FULFILLED,
        payload: event
      });
    } else {
      dispatch({
        type: FETCH_EVENT.REJECTED,
        payload: { error: {type: ERRORS_TYPE.ALREADY_IN_DATABASE ,message: 'Evento já existe no nosso Banco de Dados'}}
      });
    }
  } catch (e) {
    dispatch({
      type: FETCH_EVENT.REJECTED,
      payload: { error: e, event: { id: eventID } }
    });
  }
};
