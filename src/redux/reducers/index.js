import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import loginModeReducer from './loginModeReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errorsReducer, // contains registrationMessage and loginMessage
  loginModeReducer, // will have a value of 'login' or 'registration' to control which screen is shown
  userReducer, // will have an id and username if someone is logged in
  categoriesReducer, // fetches and stores the categories
});

export default rootReducer;
