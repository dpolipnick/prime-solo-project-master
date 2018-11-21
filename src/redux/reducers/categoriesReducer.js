
// Used to store the categories (e.g. 'Swear Word', 'Policical Correctness', 'Speech Filler')
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_CATEGORIES':
          return action.payload;
      default:
          return state;
  }
}

export default categoriesReducer;