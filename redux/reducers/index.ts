import { combineReducers } from 'redux';

import blogReducer from './blogReducer';
import projectReducer from './projectReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';

export default combineReducers({
  blogs: blogReducer,
  projects: projectReducer,
  user: userReducer,
  ui: uiReducer,
});
