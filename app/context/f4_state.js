import React, { useReducer } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { CommonActions } from '@react-navigation/native';

import F4Context from './f4_context';
import F4Reducer from './f4_reducer';
import { doGet, doPost } from '../utils/apiActions';
import { APP_LANGUAGE } from './types';

const F4State = props => {
  const toast = useToast();

  const initialState = {
    locale: 'ru',
  };
  const [state, dispatch] = useReducer(F4Reducer, initialState);

  const changeAppLanguage = async lang => {
    dispatch({
      type: APP_LANGUAGE,
      payload: lang,
    });
  };

  return (
    <F4Context.Provider
      value={{
        locale: state.locale,
        changeAppLanguage,
      }}>
      {props.children}
    </F4Context.Provider>
  );
};

export default F4State;
