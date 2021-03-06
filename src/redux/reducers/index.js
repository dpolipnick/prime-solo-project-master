import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import categoriesReducer from './categoriesReducer';
import habitsReducer from './habitsReducer';
import occurrencesReducer from './occurrencesReducer';
import historyReducer from './historyReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  categoriesReducer, // fetches and stores the categories
  habitsReducer, // stores and fetches the habits
  occurrencesReducer, // stores the user's occurrences for the custom search table
  historyReducer, // stores the user's habit occurrence history for the graphs on the Analytics page
});

export default rootReducer;
