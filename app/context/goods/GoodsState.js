import React, { useReducer } from 'react';
import { useToast } from 'react-native-toast-notifications';
import basex from 'bs58-rn';
import Buffer from 'buffer';
import Sodium from 'react-native-sodium';
import Base64 from 'base64-js';

import utility from '../../utils/Utility';
import GoodsContext from './GoodsContext';
import GoodsReducer from './GoodsReducer';
import { CLEAR_ERRORS } from '../types';
import { doPost, doGetByBody } from '../../utils/apiActions';

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
    good: [
      {
        name: 'city_From',
        valString: '',
      },
      {
        name: 'city_To',
        valString: '',
      },
      {
        name: 'weight',
        valString: '',
      },
      {
        name: 'volume',
        valString: '',
      },
    ],
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

  const transactionExecute = async (
    FormData,
    transactionPackagedStr,
    file,
    arr,
  ) => {
    console.log('transactionPackagedStr', transactionPackagedStr);
    console.log('file exx', file);
    const ALPHABET =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const base58 = basex(ALPHABET);

    let decodedFoBase58 = base58.decode(file?.sk);
    const decryptedMessageFromByteArray = Base64.fromByteArray(decodedFoBase58);
    console.log('dec', decryptedMessageFromByteArray);

    let decoded = base58.decode(transactionPackagedStr);
    const decrypted = Base64.fromByteArray(decoded);
    console.log('dec 333', decrypted);

    let dt = await Sodium.crypto_sign_detached(
      decrypted,
      decryptedMessageFromByteArray,
    );
    console.log('dt 333: ', dt);

    let signature = base58.encode(Buffer.Buffer.from(dt, 'base64'));
    console.log('signature:: ', signature);
    doPost('api/transaction/Execute', {
      authKey: '',
      NetworkAlias: 'MainNet',
      MethodApi: 'SmartMethodExecute',
      PublicKey: file.pk,
      TokenPublicKey: '35soygBAV35AvoJUBhGe9YjCygCBPai3FL6ZPRtKkaZD',
      TokenMethod: 'SetNewPost',
      TransactionSignature: signature,
      notSaveNewState: 0,
      Fee: 0.1,
      contractParams: FormData,
    })
      .then(({ data }) => {
        console.log('data resp execute: ', data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          console.log('successs: ', data);
          dispatch({
            type: PRODUCT_SAVED,
            payload: { FormData, arr },
          });
        } else {
          dispatch({ type: LOADING, payload: false });
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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

  //Post a Good
  const postAGood = async (FormData, file, arr) => {
    console.log('FormData', FormData);
    console.log('file 1', file.pk);
    const contract = {
      authKey: '',
      NetworkAlias: 'MainNet',
      MethodApi: 'SmartMethodExecute',
      PublicKey: file.pk,
      TokenPublicKey: '35soygBAV35AvoJUBhGe9YjCygCBPai3FL6ZPRtKkaZD',
      TokenMethod: 'SetNewPost',
      notSaveNewState: 0,
      Fee: 0.1,
      contractParams: FormData,
    };
    console.log('contract: ', contract);
    dispatch({ type: LOADING, payload: true });
    doPost('api/transaction/pack', contract)
      .then(({ data }) => {
        console.log('data:Pack ', data);
        if (data.success) {
          transactionExecute(
            FormData,
            data.dataResponse.transactionPackagedStr,
            file,
            arr,
          );
        } else {
          dispatch({ type: LOADING, payload: false });
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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
    /* dispatch({ type: LOADING, payload: true });
    doPost(`v1/post/b/qwe/`, FormData)
      .then(({ data }) => {
        FormData['trackid'] = data.trackid;
        console.log('data::: 555', data);
        dispatch({ type: LOADING, payload: false });
        let newType1 = Object.assign([], arr);
        console.log('FormData:::: ', FormData);
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
      });*/
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
