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
        const prevProducts = getState().product.list;
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
};