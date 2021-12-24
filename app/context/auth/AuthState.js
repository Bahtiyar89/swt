import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { CLEAR_ERRORS } from '../types';
import { doGet, doPost } from '../../utils/apiActions';
import { useToast } from 'react-native-toast-notifications';

import utility from '../../utils/Utility';
export const LOGOUT = 'LOGOUT';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const FALSE_REDIRECT = 'FALSE_REDIRECT';
export const VARIFY_OK = 'VARIFY_OK';
export const LOADING = 'LOADING';
export const CALCULATED = 'CALCULATED';
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER';
export const GET_CHECKOUT_ORDER = 'GET_CHECKOUT_ORDER';

const AuthState = props => {
  const toast = useToast();
  const initialState = {
    token: utility.getItem('token'),
    loading: false,
    isSigned: false,
    varifyId: '',
    error: [],
    user: utility.getItemObject('user'),
    calculatedValue: 0,
    calculateArray: [],
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //logout
  const signOut = async () => {
    try {
      dispatch({ type: LOADING, payload: true });
      dispatch({
        type: LOGOUT,
      });
      dispatch({ type: LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };

  //Login User
  const signin = async FormData => {
    console.log('FormData: ', FormData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: LOADING, payload: true });
      /* const res = await axios.post(
        `https://flexim.tk/funeral/api/v1/users/login`,
        FormData,
        config,
      );
      */
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: FormData,
      });
    } catch (err) {
      dispatch({ type: LOADING, payload: false });
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
  const register = async (FormData, navigation) => {
    dispatch({ type: LOADING, payload: true });
    doPost(`v1/account/signup/`, FormData)
      .then(({ data }) => {
        dispatch({ type: LOADING, payload: false });
        navigation.navigate('Home');
      })
      .catch(error => {
        toast.show(error.message, {
          type: 'warning',
          duration: 4000,
          animationType: 'zoom-in',
        });
        dispatch({ type: LOADING, payload: false });
      });
  };

  const approveVarify = async (FormData, navigation) => {
    const id = { id: FormData };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({ type: LOADING, payload: true });
    const res = await axios.post(
      `https://flexim.tk/funeral/api/v1/users/sendVerifyCode`,
      id,
      config,
    );
    dispatch({ type: LOADING, payload: false });
    if (res.data.status === 'FAIL') {
      dispatch({
        type: REGISTER_FAIL,
        payload: res.data.message,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const calculatingMethod = calc => {
    dispatch({ type: CALCULATED, payload: calc });
  };
  const checkoutOrderMethod = obj => {
    console.log('objjjj ', obj);
    dispatch({ type: CHECKOUT_ORDER, payload: obj });
  };
  const getCheckout = async () => {
    try {
      dispatch({ type: GET_CHECKOUT_ORDER });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isSigned: state.isSigned,
        varifyId: state.varifyId,
        user: state.user,
        loading: state.loading,
        calculatedValue: state.calculatedValue,
        calculateArray: state.calculateArray,
        /* token: state.token, 
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
        calculatingMethod,
        signin,
        signOut,
        register,
        approveVarify,
        checkoutOrderMethod,
        getCheckout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
