import React, { useCallback } from 'react';
import List from '@material-ui/core/List'
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInCart } from '../reducks/users/selectors';
import {CartListItem} from '../components/Products';
import { PrimaryButton, GreyButton} from '../components/UIkit/index';
import {push} from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  })

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>
        ショッピングカート
      </h2>
      <List className={classes.root} >
        {productsInCart.length > 0 && (
          productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
        )}
      </List>
      <div className="module-spacer--medium"/>
      <div className="p-grid__column" >
        <PrimaryButton label={"レジに進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"買い物を続ける"} onClick={() => dispatch(push('/'))} />
      </div>
    </section>
  )
}

export default CartList;