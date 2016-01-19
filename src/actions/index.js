import _ from 'lodash';
import { request } from '../api/client';

import {
  ADD_EVENT,
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

export const addNewEvent = (events) => {
  return async (dispatch, getState) => {
    try {
      const result = await request({
        method: 'post',
        url: '/api/events',
        body: events
      });
    } catch (e) {
      console.log('api call failed');
    }
  };
}
