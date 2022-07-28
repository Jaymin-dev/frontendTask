import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// we will connect our reducers here
import { Reducer } from './Reducer';

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    dashboard: Reducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(history)(state, action);
};

export default createRootReducer;
