import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../reducks/users/selectors';
import { fetchOrdersHistory } from '../reducks/users/operations';
import {OrderHistoryItem} from '../components/Products/index';


const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey['100'],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }
  }
}))

const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const orders = getOrderHistory(selector);

  useEffect(() => {                        // 最初は空だが、再レンダー後にordersの中身ができる
    dispatch(fetchOrdersHistory())
  }, []);



  return (
    <section className='c-section-wrapin'>
      <List className={classes.orderList}>
        {orders.length > 0 && (
          orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
        )}
      </List>

    </section>
  )
}

export default OrderHistory;