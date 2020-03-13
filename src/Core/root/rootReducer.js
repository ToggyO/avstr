import { combineReducers } from 'redux';
import authorizationReducer from '../authorization/reducers/authorizationReducer';

const rootReducer = combineReducers({
    authorizationReducer,
});

export default rootReducer;
