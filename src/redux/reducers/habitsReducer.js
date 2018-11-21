
// Used to store the user's habits
const habitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HABITS':
            return action.payload;
        default:
            return state;
    }
}
  
export default habitsReducer;