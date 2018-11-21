// Vendors
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga that GETs the Categories from the server
function* fetchCategoriesSaga(action) {
    console.log('In fetchCategoriesSaga');
    try {
        const response = yield call( axios.get, '/api/project/categories' );
        yield put( { type: 'SET_CATEGORIES', payload: response.data } );
    }
    catch (error) {
        console.log('error with categories DB GET request', error);
    }
  }

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategoriesSaga);
}

export default categoriesSaga;