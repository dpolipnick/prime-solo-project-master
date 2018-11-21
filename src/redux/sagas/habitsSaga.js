// Vendors
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

// Saga that GETs the habits from the server
function* fetchHabitsSaga(action) {
    console.log('In fetchHabitsSaga');
    try {
        const response = yield call( axios.get, '/api/habits' );
        yield put( { type: 'SET_HABITS', payload: response.data } );
    }
    catch (error) {
        console.log('error with habits DB GET request', error);
    }
}

// Saga that performs a POST request to add a habit to the database
function* addHabitSaga(action) {
    console.log('Adding habit to the database:', action.payload);
    try {
        yield call( axios.post, '/api/habits', action.payload);
        yield put( { type: 'FETCH_HABITS' } );
        alert('New habit successfully added!')
    } 
    catch (error) {
        console.log('Error with habit POST request:', error);
        alert('New habit unsuccessful... Please try again.')
    }
  }

function* habitsSaga() {
  yield takeEvery('FETCH_HABITS', fetchHabitsSaga);
  yield takeEvery('ADD_HABIT', addHabitSaga);
}

export default habitsSaga;