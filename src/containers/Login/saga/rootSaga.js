import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { doLogin, doSignout } from '../saga';
import { DO_LOGIN } from '../constants';
import { SIGN_OUT } from '../../App/constants';

export default function* loginSagas() {
  yield takeLatest(DO_LOGIN, doLogin);
  yield takeLatest(SIGN_OUT, doSignout);
}
