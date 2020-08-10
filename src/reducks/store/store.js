import {
  createStore as reduxCreateStore, //別名インポート
  combineReducers,
  applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware, } from 'connected-react-router';
import thunk from 'redux-thunk';

// import {ProductsReducer} form '../products/reducers';
import {UsersReducer} from '../users/reducers'; 

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
} 