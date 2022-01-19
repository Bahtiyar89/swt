import React, { useReducer } from 'react';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { CLEAR_ERRORS } from '../types';
import { doGet, doPost } from '../../utils/apiActions';

import utility from '../../utils/Utility';
import {
  F4_POST_SUCC_BALANCE,
  LOGOUT,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FALSE_REDIRECT,
  VARIFY_OK,
  LOADING,
  CHECKOUT_ORDER,
  GET_CHECKOUT_ORDER,
  BALANCE_0,
  CLOSE_MODAL_BALANCE,
} from '../types';

const AuthState = props => {
  const toast = useToast();
  const initialState = {
    token: utility.getItem('token'),
    loading: false,
    isSigned: false,
    varifyId: '',
    user: utility.getItemObject('user'),
    calculateArray: [],
    modalBalanceErr: false,
    balance: '',
    error: [],
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const postFileBalanceToCheck = async file => {
    console.log('file: ', file);
    dispatch({ type: LOADING, payload: true });
    doPost('api/Monitor/GetBalance/', {
      PublicKey: file.pk,
      networkAlias: 'MainNet',
    })
      .then(({ data }) => {
        console.log('data: 2', data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          if (data.balance >= 0.1) {
            console.log('moree www', data);
            dispatch({
              type: F4_POST_SUCC_BALANCE,
              payload: data,
            });
          } else if (data.balance === 0) {
            dispatch({
              type: BALANCE_0,
              payload: data,
            });
            console.log('data.balance === 0', data.balance === 0);
          } else {
            dispatch({ type: LOADING, payload: false });
          }
        }
      })
      .catch(error => {
        dispatch({ type: LOADING, payload: false });
        toast.show(error.message, {
          type: 'warning',
          duration: 3000,
          animationType: 'zoom-in',
        });
      });
  };

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
    dispatch({ type: LOADING, payload: true });
    doPost(`v1/account/login/`, FormData.data)
      .then(({ data }) => {
        dispatch({ type: LOADING, payload: false });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...data, ...FormData.data },
        });
      })
      .catch(error => {
        toast.show(error.response.request._response + ' попробуйте попожже', {
          type: 'warning',
          duration: 4000,
          animationType: 'zoom-in',
        });
        dispatch({ type: LOADING, payload: false });
      });
  };

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

  const closeModel = async () => {
    try {
      dispatch({ type: CLOSE_MODAL_BALANCE });
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
        calculateArray: state.calculateArray,
        //balance
        modalBalanceErr: state.modalBalanceErr,
        balance: state.balance,
        token: state.token,
        error: state.error,

        /* 
        //  register,
        forgotPassword,
        clearErrors,
        reverseRedirect,
        signin,
        signout
        */
        postFileBalanceToCheck,
        closeModel,
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
