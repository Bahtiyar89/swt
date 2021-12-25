import React, { useReducer } from 'react';
import axios from 'axios';
import GoodsContext from './GoodsContext';
import GoodsReducer from './GoodsReducer';
import { CLEAR_ERRORS } from '../types';
import { doGet, doPost, doGetByBody } from '../../utils/apiActions';
import { useToast } from 'react-native-toast-notifications';

import utility from '../../utils/Utility';
export const LOGOUT = 'LOGOUT';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const FALSE_REDIRECT = 'FALSE_REDIRECT';
export const VARIFY_OK = 'VARIFY_OK';
export const LOADING = 'LOADING';
export const CALCULATED = 'CALCULATED';
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER';
export const GET_CHECKOUT_ORDER = 'GET_CHECKOUT_ORDER';
export const MAIN_PAGE_GOOD = 'MAIN_PAGE_GOOD';
export const HIDE_MODAL = 'HIDE_MODAL';
export const PRODUCT_SAVED = 'PRODUCT_SAVED';

const GoodsState = props => {
  const toast = useToast();
  const initialState = {
    good: {
      authorization: {
        username: '',
        password: '',
      },
      weight: 0,
      volume: 0,
      city_From: '',
      city_To: '',
      sender_FIO: '',
      sender_EMail: '',
      sender_Tel: '',
      sender_DocID: '',
      sender_INN: '',
      sender_Addr: '',
      recip_FIO: '',
      recip_EMail: '',
      recip_Tel: '',
      recip_DocID: '',
      recip_INN: '',
      recip_Addr: '',
      LinkOnGood: '',
      DescrGood: '',
      Status: '',
      Price: 0,
      trackid: 0,
    },
    allGoods: utility.getItemObject('allGoods'),
    loading: false,
    modalSaveGood: false,
    error: [],
  };
  const [state, dispatch] = useReducer(GoodsReducer, initialState);

  //Fetch All Goods
  const fetchAllGoods = async FormData => {
    console.log('3333 33', FormData);
    dispatch({ type: LOADING, payload: true });

    doGetByBody(`v1/post/`, FormData)
      .then(({ data }) => {
        dispatch({ type: LOADING, payload: false });
        console.log('444 444 444:', data);
      })
      .catch(error => {
        console.log('error: ', error.response);
        toast.show(error.message, {
          type: 'warning',
          duration: 4000,
          animationType: 'zoom-in',
        });
        dispatch({ type: LOADING, payload: false });
      });
    dispatch({ type: LOADING, payload: false });
  };

  //Post a Good
  const postAGood = async (FormData, arr) => {
    console.log('3333 33', FormData);
    console.log('arr ', arr);
    dispatch({ type: LOADING, payload: true });
    doPost(`v1/post/b/qwe/`, FormData)
      .then(({ data }) => {
        console.log('data::: 555', data);
        dispatch({ type: LOADING, payload: false });
        let newType1 = Object.assign([], arr);
        newType1.push(FormData);
        dispatch({
          type: PRODUCT_SAVED,
          payload: newType1,
        });
      })
      .catch(error => {
        console.log('error.response ', error.response);
        toast.show(error.response.request._response, {
          type: 'warning',
          duration: 4000,
          animationType: 'zoom-in',
        });
        dispatch({ type: LOADING, payload: false });
      });
  };

  const setMainGood = form => {
    console.log('form: ', form);
    dispatch({ type: MAIN_PAGE_GOOD, payload: form });
  };

  const calculatPriceGood = calc => {
    dispatch({ type: CALCULATED, payload: calc });
  };

  const modalSaveGoodHide = hideModal => {
    dispatch({ type: HIDE_MODAL, payload: hideModal });
  };

  return (
    <GoodsContext.Provider
      value={{
        error: state.error,
        modalSaveGood: state.modalSaveGood,
        good: state.good,
        allGoods: state.allGoods,
        loading: state.loading,
        calculatPriceGood,
        fetchAllGoods,
        postAGood,
        setMainGood,
        modalSaveGoodHide,
      }}>
      {props.children}
    </GoodsContext.Provider>
  );
};

export default GoodsState;
