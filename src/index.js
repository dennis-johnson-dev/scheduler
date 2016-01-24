import 'babel-core/polyfill';

import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { combineReducers } from 'redux';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './components/App';
import CreateEvent from './components/CreateEvent';
import Viewer from './components/Viewer';
import { setCurrentTime, resetState } from './actions';
import configureStore from './configureStore';
import routes from './routes';

import './styles/styles.scss';

const rootStore = configureStore(hashHistory);

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
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Viewer } />
        <Route path="create" component={ CreateEvent } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('site')
);
