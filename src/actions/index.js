import _ from 'lodash';
import { request } from '../api/client';

import {
  EVENT_ADDED,
  CURRENT_TIME_SET,
  STATE_RESET
} from '../constants';

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

export const eventAdded = (event) => {
  return {
    type: EVENT_ADDED,
    payload: event
  };
};

export const addNewEvent = (event) => {
  return async (dispatch, getState) => {
    try {
      const result = await request({
        method: 'post',
        url: '/api/events',
        body: event
      });
    } catch (e) {
      console.log('api call failed');
    }

    dispatch(eventAdded(event));
  };
}
