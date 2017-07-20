import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { isProd } from '../../config';
import rootReducer from './rootReducer';

export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = isProd ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const preloadedState = window.__PRELOADED_STATE__;
  /* eslint-enable no-underscore-dangle */
  const store = createStore(rootReducer, { hello: Immutable.fromJS(preloadedState.hello) },
    composeEnhancers(applyMiddleware(thunkMiddleware)));
  return store;
}
