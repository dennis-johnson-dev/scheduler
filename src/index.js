import 'babel-core/polyfill';

import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { combineReducers } from 'redux';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './components/App';
import { setCurrentTime, resetState } from './actions';
import configureStore from './configureStore';

import './styles/styles.scss';

const rootStore = configureStore();
const endTime = moment().add(rootStore.getState().maxDuration, 'seconds');

const timeout = window.setInterval(() => {
  const currentTime = moment();
  rootStore.dispatch(setCurrentTime(currentTime));

  if (currentTime.isAfter(endTime) || currentTime.isSame(endTime, 'seconds')) {
    window.clearTimeout(timeout);
  }
}, 1000);

render(
  <Provider store={ rootStore }>
    <App />
  </Provider>,
  document.getElementById('site')
);
