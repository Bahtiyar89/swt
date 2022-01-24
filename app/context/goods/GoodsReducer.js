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
const getAsync = async () => {
  let b = await utility.getItemObject('calculator');
  console.log('bbbb', b);
  return b;
};
export default (state, action) => {
  switch (action.type) {
    case PRODUCT_SAVED:
      const { FormData, arr } = action.payload;

      const product = {
        city_From: FormData[14].valString,
        city_To: FormData[15].valString,
        sender_DocID: FormData[3].valString,
        sender_INN: FormData[4].valString,
        sender_EMail: FormData[1].valString,
        sender_Addr: FormData[5].valString,
        recip_FIO: FormData[6].valString,
        recip_Tel: FormData[8].valString,
        recip_DocID: FormData[9].valString,
        recip_INN: FormData[10].valString,
        recip_EMail: FormData[7].valString,
        recip_Addr: FormData[11].valString,
        Price: FormData[18].valString,
      };
      let newType1 = Object.assign([], arr);
      newType1.push(product);
      utility.setItemObject('calculator', newType1);
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
