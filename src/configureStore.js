import { createStore } from 'redux';

import { resetState } from './actions';

export default function configureStore() {
  const rootReducer = require('./reducers');
  const store = createStore(rootReducer);

  if (module.hot) {
    store.dispatch(resetState());
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers');
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};
