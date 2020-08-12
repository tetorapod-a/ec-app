import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {getUserId} from '../../reducks/users/selectors';
import {db} from '../../firebase/index';
import NoImage from '../../assets/img/src/no_image.png';
import {push} from 'connected-react-router';



const useStyles = makeStyles({
  list: {
    height: 128
  },
  image: {
    objectFit: 'cover',
    height: 96,
    width: 96,
    margin: 16
  },
  text: {
    width: '100%'
  }
});


const CartListItem = (props) => {
  const dispatch = useDispatch();
  const classes =useStyles();
  const selector = useSelector(state => state);
  const uid = getUserId(selector); 

  const image = (props.product.images.length > 0 ) ? props.product.images[0].path : NoImage;
  const price = props.product.price.toLocaleString();
  const name = props.product.name;
  const size = props.product.size;
  const id = props.product.productId;

  const removeProductFromCart = (id) => {
    return db.collection('users').doc(uid).collection('cart').doc(id).delete()
  }

  return (
    <>
    <ListItem className={classes.list} >
        <ListItemAvatar onClick={() => dispatch(push("/product/" + id))}>
          <img className={classes.image} src={image} alt="image"/>
        </ListItemAvatar>
        <div className={classes.text} onClick={() => dispatch(push("/product/" + id))}>
          <ListItemText primary={name} secondary={'サイズ：' + size} />
          <ListItemText primary={"¥" + price} />
        </div>
      <IconButton onClick={() => removeProductFromCart(props.product.cartId)} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
    <Divider />
    
    </>
  )

}

export default CartListItem;