import * as Action from './actions';
// actions.js内でexportしているすべての関数や定数をActionという名前でimportしている
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
      
    default:
      return state
    
  }
}
