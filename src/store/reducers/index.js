import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import jobs from './jobs';
import keywords from './keywords';
import plans from './plans';
import login from './LoginReducer';
import user from './UserReducer';

const rootReducer = combineReducers({
  auth,
  settings,
  jobs,
  keywords,
  plans,
  login,
  user,
});

export default rootReducer;
