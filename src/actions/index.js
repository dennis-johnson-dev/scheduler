import _ from 'lodash';
import Immutable from 'immutable';
import { request } from '../api/client';

import {
  EVENT_ADDED,
  EVENTS_RECEIVED,
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
    }

    dispatch(eventAdded(event));
  };
};

export const eventsReceived = (events) => {
  return {
    type: EVENTS_RECEIVED,
    payload: events
  };
}

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await request({
        method: 'get',
        url: '/api/events'
      });
    } catch (e) {}
    if (response && response.body) {
      const result = Immutable.fromJS(response.body);
      dispatch(eventsReceived(result));
    }
  };
};
