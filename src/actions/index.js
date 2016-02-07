import _ from 'lodash';
import Immutable from 'immutable';
import { request } from '../api/client';

import {
  EVENT_ADDED,
  EVENT_RECEIVED,
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
    type: EVENT_RECEIVED,
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

    dispatch(eventAdded(Immutable.fromJS(event)));
  };
};

export const eventsReceived = (events) => {
  return {
    type: EVENTS_RECEIVED,
    payload: events
  };
}

export const eventReceived = (event) => {
  return {
    type: EVENT_RECEIVED,
    payload: event
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
      const events = Immutable.fromJS(response.body);
      dispatch(eventsReceived(events));
    }
  };
};

export const fetchEvent = (eventId) => {
  return async (dispatch, getState) => {
    const state = getState();
    let response;
    try {
      response = await request({
        method: 'get',
        url: `/api/events/${eventId}`
      });
    } catch (e) {}
    if (response && response.body) {
      const { events } = getState();
      const event = Immutable.fromJS(response.body);
      dispatch(eventReceived(event));
    }
  };
};
