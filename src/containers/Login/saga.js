import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { SIGN_OUT } from '../App/constants';
import { DO_LOGIN } from './constants';
import { setUser } from '../App/actions';
import { getUsername, getPassword } from './selectors';
import { doLogin as apiLogin } from '../../api/user';


export function* doLogin() {
  const username = yield select(getUsername());
  const password = yield select(getPassword());

  try {
    const { token } = yield call(apiLogin, { username, password });
    sessionStorage.setItem('jwtToken', token);
    yield put(setUser(token));
  } catch (err) {
    sessionStorage.removeItem('jwtToken');
  }
}

export function* doSignout() {
  console.log('doSign');
  sessionStorage.removeItem('jwtToken');
  yield put(push('/login'));
}

export default function* login() {
  yield takeLatest(DO_LOGIN, doLogin);
  yield takeLatest(SIGN_OUT, doSignout);
}
