import {db, FirebaseTimestamp} from '../../firebase';
import { push } from 'connected-react-router';
import {fetchProductsAction, deleteProductAction} from './actions';

const productsRef = db.collection('products')

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy('updated_at', 'desc').get()
      .then(snapshots => {
        const productList = [];
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),  //priceは文字列になっていたので数値に変換（JSのメソッド）
      sizes: sizes,
      updated_at: timestamp 
    }
    
    if (id === "") {                // 新規作成商品のとき
    const ref = productsRef.doc();
    id = ref.id                //firestoreが自動で採番したIDを取得できる
    data.id = id
    data.created_at = timestamp
    }
    if (name === "") {
      alert('商品名は必須です')
      return false
    } else if (price === "") {
      alert('価格は必須です')
      return false
    } else if (sizes.length === 0) {
      alert('サイズは1つ以上必須です')
      return false
    } else {
    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push("/"))
      }).catch((error) => {
        throw new Error(error)
      })
    }

  }
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {                                    // 削除したらstateを更新する
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
};

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [],
        soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size
          }
          return {
            size: size.size,
            quantity: size.quantity - 1
          }
        } else {
          return size
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      })

      batch.update(productsRef.doc(product.productId), {sizes: updatedSizes})
      batch.delete(userRef.collection('cart').doc(product.cartId))
    }

    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ?
                          soldOutProducts.join('と') :
                          soldOutProducts[0];
      alert(errorMessage + 'が在庫切れとなったため、注文処理を中断しました。')
      return false
    } else {
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))
          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp
          }
          orderRef.set(history)

          dispatch(push('order/complete'))

        }).catch(() => {
          alert('注文処理に失敗しました。もう一度お試しください。')
          return false
        })
    }

  }
}