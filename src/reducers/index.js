import Immutable from 'immutable';
import moment from 'moment';
import { routeReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {
  EVENT_ADDED,
  EVENT_RECEIVED,
  EVENTS_RECEIVED,
  CURRENT_TIME_SET,
  STATE_RESET
} from '../constants';

const initialState = Immutable.List();

const events = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_ADDED:
      return state.push(action.payload);
    case EVENTS_RECEIVED:
      return action.payload;
    case EVENT_RECEIVED:
      return state.push(action.payload);
    case STATE_RESET:
      return initialState;
    default:
      return state;
  }
};

const currentTime = (state = moment(), action) => {
  switch (action.type) {
    case CURRENT_TIME_SET:
      return action.currentTime;
    default:
      return state;
  }
};

const startTime = (state = moment(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  currentTime,
  events,
  routing,
  startTime
});
