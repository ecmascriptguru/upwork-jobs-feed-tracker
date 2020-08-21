import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from '../utils/storage';
import thunk from "redux-thunk";

const initialState = {};
const middlewares = [thunk];
let devtools = x => x;

if (
  process.env.NODE_ENV !== "production" &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares), devtools)
);

/*
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});
*/
export default store;
