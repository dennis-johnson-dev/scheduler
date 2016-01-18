import 'babel-core/polyfill';

import { createHistory } from 'history';
import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { combineReducers } from 'redux';
import { syncReduxAndRouter } from 'redux-simple-router';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './components/App';
import Viewer from './components/Viewer';
import { setCurrentTime, resetState } from './actions';
import configureStore from './configureStore';
import routes from './routes';

import './styles/styles.scss';

const rootStore = configureStore();
const history = createHistory();
syncReduxAndRouter(history, rootStore);

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
    <Router routes={ routes }/>
  </Provider>,
  document.getElementById('site')
);
