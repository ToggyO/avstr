import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import authorizationReducer from '../authorization/reducers/authorizationReducer';

const rootReducer = combineReducers({
    authorizationReducer,
    oidcReducer,
});

export default rootReducer;
