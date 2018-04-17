import jwtDecode from 'jwt-decode';
import {
  SET_USER, SIGN_OUT,
} from '../constants';

const getJwtToken = () => {
  const token = sessionStorage.getItem('jwtToken');
  return token ? jwtDecode(sessionStorage.getItem('jwtToken')) : null;
};

const initialState = {
  user: getJwtToken(),
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: jwtDecode(payload),
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default userReducer;
