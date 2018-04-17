import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SIGN_OUT } from './constants';

export function* doSignout() {
  sessionStorage.removeItem('jwtToken');
  yield put(push('/login'));
}

export default function* appSaga() {
  yield takeLatest(SIGN_OUT, doSignout);
}
