import * as Action from './actions';
// actions.js内でexportしているすべての関数や定数をActionという名前でimportしている
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Action.SIGN_IN:
      return { 
        ...state,
        ...action.payload
        // initialStateの中身をaction.payloadの内容に上書きする。（スプレッド構文）
      }
    case Action.SIGN_OUT:
        return {
          ...action.payload
        };
    case Action.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload]
      };
    default:
      return state
      
  
  }
}
