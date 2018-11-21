// Vendors
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga that GETs the Categories from the server
function* fetchCategoriesSaga(action) {
    console.log('In fetchCategoriesSaga');
    try {
        const response = yield call( axios.get, '/api/categories' );
        yield put( { type: 'SET_CATEGORIES', payload: response.data } );
    }
    catch (error) {
        console.log('error with categories DB GET request', error);
    }
}

// Saga that performs a POST request to add a category to the database
function* addCategorySaga(action) {
    console.log('Adding category to the database:', action.payload);
    try {
        yield call( axios.post, '/api/categories', action.payload);
        yield put( { type: 'FETCH_CATEGORIES' } );
        alert('New category successfully added!')
    } 
    catch (error) {
        console.log('Error with category POST request:', error);
        alert('New category unsuccessful... Please try again.')
    }
  }

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategoriesSaga);
  yield takeLatest('ADD_CATEGORY', addCategorySaga);
}

export default categoriesSaga;