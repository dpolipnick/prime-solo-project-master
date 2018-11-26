// Vendors
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

// Saga that GETs the occurrences from the server/DB
function* fetchOccurrencesSaga(action) {
    console.log('In fetchOccurrencesSaga getting this data:', action.payload);
    try {
        // const response = yield call( axios.get, '/api/occurrences', action.payload);
        const response = yield axios.get('/api/occurrences', {params: action.payload});
        yield put( { type: 'SET_OCCURRENCES', payload: response.data } );
    }
    catch (error) {
        console.log('error with occurrences DB GET request', error);
    }
}

// Saga that performs a POST request to add an occurrence to the database
function* addOccurrenceSaga(action) {
    console.log('Adding occurrence to the database:', action.payload);
    try {
        yield call( axios.post, '/api/occurrences', action.payload);
        console.log(`Occurrence successfully added to the Database.`);
        swal("Done!", "Your occurrence of that bad habit has been added to your history.", "success");
    } 
    catch (error) {
        console.log('Error with occurrence POST request:', error);
    }
}

// Saga that DELETES an occurrence from the DB via axios del. request
function* deleteOccurrenceSaga(action){
    console.log('Deleting this Occurrence:', action.payload);
    try{
      yield call(axios.delete, `/api/occurrences/${action.payload.id}`);
      yield put({type: 'FETCH_OCCURRENCES'});
    }
    catch (error){
      console.log('Error deleting occurrence:', error);
    }
}

function* occurrencesSaga() {
  yield takeEvery('FETCH_OCCURRENCES', fetchOccurrencesSaga);
  yield takeEvery('ADD_OCCURRENCE', addOccurrenceSaga);
  yield takeEvery('DELETE_OCCURRENCE', deleteOccurrenceSaga);
}

export default occurrencesSaga;