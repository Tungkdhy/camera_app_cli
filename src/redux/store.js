import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import useReducer from './reducer/cameraReducer';
import wareHouseReducer from './reducer/wareHouseReducer';
import playBackReducer from './reducer/playBackReducer';

const rootReducer = combineReducers({
  useReducer,
  wareHouseReducer,
  playBackReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
