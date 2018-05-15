import { combineReducers } from 'redux';
import eventReducer from './event.reducer';
import tagsReducer from './tags.reducer';

export default combineReducers({
  eventReducer,
 tagsReducer
});
