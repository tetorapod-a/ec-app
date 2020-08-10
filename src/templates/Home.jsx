import React from 'react';
import {getUserId, getUserName} from '../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../reducks/users/operations';


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
    </div>
  );
};

export default Home; 