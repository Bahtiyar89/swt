import { LOADING, APP_LANGUAGE, F4_POST_BALANCE } from './types';

export default (state, action) => {
  switch (action.type) {
    case APP_LANGUAGE:
      return { ...state, locale: action.payload };
    default:
      return state;
  }
};
