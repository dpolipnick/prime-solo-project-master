
// Used to store the category tags (e.g. 'Swear Word', 'Policical Correctness', 'Speech Filler')
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_CATEGORIES':
          return action.payload;
      default:
          return state;
  }
}

// user will be on the redux state at:
// state.user
export default categoriesReducer;