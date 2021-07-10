import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const enhancers = compose(
  applyMiddleware(reduxThunk),
  typeof window !== 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f
);

export const store = createStore(reducers, {}, enhancers);
