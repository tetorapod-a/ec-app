import React from 'react';
import {getUserId, getUserName} from '../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../reducks/users/operations';
import {push} from 'connected-react-router';


const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);  //store全体のstateを取得
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return(
    <div>
      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
      <button onClick={() => dispatch(push("/product/edit"))}>商品を登録する(管理者用)</button>
    </div>
  );
};

export default Home; 