import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import useReducer from './reducer/cameraReducer';
import wareHouseReducer from './reducer/wareHouseReducer';
import playBackReducer from './reducer/playBackReducer';
import notificationReducer from "./reducer/notificationReducer";
import reportReducer from './reducer/reportReducer';
const rootReducer = combineReducers({
  useReducer,
  wareHouseReducer,
  playBackReducer,
  notificationReducer,
  reportReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
