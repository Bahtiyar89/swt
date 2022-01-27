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
      const { FormData, arr, data: newProduct } = action.payload;
      console.log('FormData', FormData);
      const product = {
        city_From: FormData[0].valString,
        city_To: FormData[1].valString,
        sender_DocID: FormData[8].valString,
        sender_INN: FormData[9].valString,
        sender_EMail: FormData[6].valString,
        sender_Addr: FormData[10].valString,
        recip_FIO: FormData[11].valString,
        recip_Tel: FormData[13].valString,
        recip_DocID: FormData[14].valString,
        recip_INN: FormData[15].valString,
        recip_EMail: FormData[12].valString,
        recip_Addr: FormData[16].valString,
        Price: FormData[4].valString,
        transactionId: newProduct.transactionId,
      };
      let newType1 = Object.assign([], arr);
      newType1.push(product);
      utility.setItemObject('calculator', newType1);
      return { ...state, modalSaveGood: true };
    case LOADING:
      console.log('loading red', action.payload);
      return { ...state, loading: action.payload };
    case HIDE_MODAL:
      return { ...state, modalSaveGood: action.payload };
    case CALCULATED:
      return { ...state };
    case MAIN_PAGE_GOOD:
      return { ...state };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
