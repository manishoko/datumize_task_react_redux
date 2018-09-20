import { combineReducers } from 'redux';
import users from './users';
import projects from './projects';
import roles from './roles';
const rootReducer = combineReducers({
       users:users,
       projects:projects,
       roles:roles
})
export default rootReducer;
