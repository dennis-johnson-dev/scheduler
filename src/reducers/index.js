import Immutable from 'immutable';
import moment from 'moment';
import { routeReducer as routing } from 'redux-simple-router';
import { combineReducers } from 'redux';

import { ADD_EVENT, CURRENT_TIME_SET, STATE_RESET } from '../constants';

const initialState = (numOfItems) => {
  const getStartStop = (currentTime, idx) => {
    const startTime = moment(currentTime).add(5 * idx, 'seconds');
    const endTime = moment(currentTime).add(5 * (idx + 1), 'seconds');
    return Immutable.Map({
      startTime,
      endTime
    });
  };

  const getRandomBgColor = (numOfItems) => {
    return Immutable.List().setSize(numOfItems).reduce((acc, item) => {
      return acc + `${ Math.floor(Math.random() * 16).toString(16) }`;
    }, '');
  };

  const getSchema = idx => Immutable.Map({
    bgColor: `#${getRandomBgColor(6).split(',').join(',')}`,
    company: 'company',
    id: parseInt(`12${idx}`, 10),
    imageUrl: `/images/person/${idx}`,
    name: 'First Last',
    title: `y-${idx}`
  });

  const currentTime = moment();

  const getItems = (numOfItems, currentTime) => {
    return Immutable.List().setSize(numOfItems).map((item, i) => {
      return getSchema(i).merge(getStartStop(currentTime, i));
    });
  };

  return getItems(numOfItems, currentTime);
}(5);

const initialMaxDuration = initialState.reduce((acc, event) => {
  return acc + event.get('endTime').diff(event.get('startTime'), 'seconds');
}, 0);

const events = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return state.push(Immutable.Map({
        id: action.id,
        text: action.payload
      }));
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

const maxDuration = (state = initialMaxDuration, action) => {
  switch (action.type) {
    case STATE_RESET:
      return initialMaxDuration;
    default:
      return state
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
  maxDuration,
  routing,
  startTime
});
