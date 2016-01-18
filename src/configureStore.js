import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  const rootReducer = require('./reducers');
  const createStoreWithMiddleware = applyMiddleware(
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
