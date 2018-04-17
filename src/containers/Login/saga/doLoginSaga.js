import { call, put, select } from 'redux-saga/effects';

import { doLogin as apiLogin } from '../../../api/user';
import { setUser } from '../../App/actions';
import { getPassword, getUsername } from '../selectors';
import { changePassword, changeUsername } from '../actions';

export default function* doLogin() {
  const username = yield select(getUsername());
  const password = yield select(getPassword());

  try {
    const { token } = yield call(apiLogin, { username, password });
    sessionStorage.setItem('jwtToken', token);
    yield put(changeUsername(''));
    yield put(changePassword(''));
    yield put(setUser(token));
  } catch (err) {
    sessionStorage.removeItem('jwtToken');
  }
}
