import _ from 'lodash';

import { ADD_EVENT, CURRENT_TIME_SET, STATE_RESET } from '../constants';

export function addEvent(text) {
  return {
    type: ADD_EVENT,
    payload: text,
    id: _.uniqueId()
  };
}

export function setCurrentTime(currentTime) {
  return {
    type: CURRENT_TIME_SET,
    currentTime
  };
}

export function resetState() {
  return {
    type: STATE_RESET
  };
}
