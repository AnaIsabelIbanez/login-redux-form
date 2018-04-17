import { takeLatest } from 'redux-saga/effects';

import doLogin from './doLoginSaga';
import { DO_LOGIN } from '../constants';

export default function* loginSagas() {
  yield takeLatest(DO_LOGIN, doLogin);
}
