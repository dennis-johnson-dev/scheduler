import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux'

export default function configureStore(history) {
  const rootReducer = require('./reducers');
  const reduxRouterMiddleware = syncHistory(history);
  const createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunk
  )(createStore);
  const store = createStoreWithMiddleware(rootReducer);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers');
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};
