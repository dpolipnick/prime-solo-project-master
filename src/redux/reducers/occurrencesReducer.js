
// Used to store the user's occurrences
const occurrencesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OCCURRENCES':
            return action.payload;
        default:
            return state;
    }
}
  
export default occurrencesReducer;