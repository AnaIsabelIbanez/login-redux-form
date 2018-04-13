import { call, put, select, takeLatest } from 'redux-saga/effects';

import { DO_LOGIN } from './constants';
import { setUser } from '../App/actions';
import { getUsername, getPassword } from './selectors';
import { doLogin as apiLogin } from '../../api/user';


export function* doLogin() {
  const username = yield select(getUsername());
  const password = yield select(getPassword());

  try {
    const user = yield call(apiLogin, { username, password });
    sessionStorage.setItem('jwtToken', user.token);
    yield put(setUser(user));
  } catch (err) {
    sessionStorage.removeItem('jwtToken');
  }
}

export default function* login() {
  yield takeLatest(DO_LOGIN, doLogin);
}
