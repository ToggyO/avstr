import { combineReducers } from 'redux';
import authorizationReducer from '../authorization/authorizationReducer';

const rootReducer = combineReducers({
    authorizationReducer,
});

export default rootReducer;
