//サインインがされているか判定するコンポーネント
//子要素(children)とは<Auth> </Auth>で挟まれたコンポーネント

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

const Auth = ({children}) => {  //子要素出力のためchildrenは特別なprops
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {            //componentDidMountの動作
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, []);

  if (!isSignedIn) {
    return <></>
  } else {
    return children  
  }

}

export default Auth;