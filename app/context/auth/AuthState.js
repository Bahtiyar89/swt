import React, { useReducer } from 'react';
import axios from 'axios';
import { modifyLoader } from '../loader/loader_action';
import NavigationService from 'app/navigation/NavigationService';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { CLEAR_ERRORS } from '../types';
import { CommonActions } from '@react-navigation/native';

import utility from '../../utils/Utility';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const FALSE_REDIRECT = 'FALSE_REDIRECT';
export const VARIFY_OK = 'VARIFY_OK';

const AuthState = props => {
  const initialState = {
    token: utility.getItem('token'),
    loading: false,
    isSigned: false,
    varifyId: '',
    error: [],
    user: utility.getItemObject('user'),
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //logout
  const signOut = async () => {
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Login User
  const signin = async FormData => {
    console.log('FormData:', FormData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch(modifyLoader(true));
      /* const res = await axios.post(
        `https://flexim.tk/funeral/api/v1/users/login`,
        FormData,
        config,
      );
      */
      dispatch({
        type: LOGIN_SUCCESS,
        payload: FormData,
      });
      dispatch(modifyLoader(false));
    } catch (err) {
      dispatch(modifyLoader(false));
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };
  /*
  //Load User
  const signout = async () => {
    try {
      await axios.get(`${API}/v1/users/signout`);
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //forgotPassword Errors
  const forgotPassword = async FormData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      axios.post(`${API}/v1/users/forgotPassword`, FormData, config);
    } catch (error) {
      console.log('error11 ');
    }
  };

  //clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const reverseRedirect = () => dispatch({ type: FALSE_REDIRECT });
*/
  //Register user
  const register = async FormData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch(modifyLoader(true));
    const res = await axios.post(
      `https://flexim.tk/funeral/api/v1/users/register/customer`,
      FormData,
      config,
    );
    dispatch(modifyLoader(false));
    if (res.data.status === 'FAIL') {
      dispatch({
        type: REGISTER_FAIL,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    }
  };

  const approveVarify = async (FormData, navigation) => {
    console.log('FormData:', FormData);
    const id = { id: FormData };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch(modifyLoader(true));
    const res = await axios.post(
      `https://flexim.tk/funeral/api/v1/users/sendVerifyCode`,
      id,
      config,
    );
    console.log('reddd', res.data);
    dispatch(modifyLoader(false));
    if (res.data.status === 'FAIL') {
      dispatch({
        type: REGISTER_FAIL,
        payload: res.data.message,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isSigned: state.isSigned,
        varifyId: state.varifyId,
        user: state.user,
        /* token: state.token,
        loading: state.loading,
        error: state.error,
        redirectToReferrer: state.redirectToReferrer,
        user: state.user,
        //  register,
        forgotPassword,
        clearErrors,
        reverseRedirect,
        signin,
        signout
        */
        signin,
        signOut,
        register,
        approveVarify,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
