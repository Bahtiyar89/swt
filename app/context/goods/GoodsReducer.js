import utility from '../../utils/Utility';
import { CommonActions } from '@react-navigation/native';
import { CLEAR_ERRORS } from '../types';
import {
  LOGOUT,
  PRODUCT_SAVED,
  CALCULATED,
  HIDE_MODAL,
  MAIN_PAGE_GOOD,
  LOADING,
} from './GoodsState';

export default (state, action) => {
  switch (action.type) {
    case PRODUCT_SAVED:
      console.log('action.payload: ', action.payload);
      utility.setItemObject('calculator', action.payload);
      return { ...state, modalSaveGood: true };
    case LOADING:
      return { ...state, loading: action.payload };
    case HIDE_MODAL:
      return { ...state, modalSaveGood: action.payload };
    case CALCULATED:
      return {
        ...state,
        good: {
          ...state.good,
          Price: action.payload,
        },
      };
    case MAIN_PAGE_GOOD:
      return { ...state, good: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
