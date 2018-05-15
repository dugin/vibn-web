import reducers from './reducers/root.reducer';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

function isDevelopment() {
  return () => true;
  //  return () => env === 'development';
}

const loggerMiddleware = createLogger({
  predicate: isDevelopment(process.env.ENV)
});

const middlewares = [reduxThunk, promise(), loggerMiddleware];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(reducers);
