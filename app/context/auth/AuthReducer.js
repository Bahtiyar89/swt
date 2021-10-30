import utility from '../../utils/Utility';
import { CommonActions } from '@react-navigation/native';
import { CLEAR_ERRORS } from '../types';
import {
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FALSE_REDIRECT,
  VARIFY_OK,
  LOADING,
} from './AuthState';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case VARIFY_OK:
      console.log('adddd', CommonActions.navigate({ name: 'Login' }));
      CommonActions.navigate({ name: 'Login' });
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        varifyId: action.payload.data.id,
        isSigned: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      utility.setItemObject('user', action.payload);
      //  utility.setItem('token', action.payload.token);
      return {
        ...state,
        isSigned: true,
        loading: false,
        user: action.payload.user,
      };
    case FALSE_REDIRECT:
      return {
        ...state,
        redirectToReferrer: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: [action.payload],
      };
    case LOGOUT:
      utility.removeItem('token');
      utility.removeItem('user');
      console.log('LOGOUT : ');
      return {
        ...state,
        isSigned: false,
        loading: false,
        user: null,
        error: [],
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
