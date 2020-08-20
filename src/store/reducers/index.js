import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import jobs from './jobs';
import keywords from './keywords';
import plans from './plans';

const rootReducer = combineReducers({
  auth,
  settings,
  jobs,
  keywords,
  plans,
});

export default rootReducer;
