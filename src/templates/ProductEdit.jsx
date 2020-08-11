import React, {useCallback, useState, useEffect} from 'react';
import {SelectBox, PrimaryButton, TextInput} from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import ImageArea from '../components/Products/ImageArea';
import {db} from '../firebase/index';
import { SetSizeArea } from '../components/Products';

const ProductEdit = () => {
    const dispatch = useDispatch();
    //ここから編集機能
    let id = window.location.pathname.split('/product/edit')[1];

    if (id !== "") {
      id = id.split("/")[1]
    }

    useEffect(() => {
      if (id != "") {
        db.collection('products').doc(id).get()
          .then(snapshot => {                        //結果を"snapshot"で受け取っている
            const data = snapshot.data();
            // console.log(data);
            setName(data.name);
            setImages(data.images);
            setGender(data.gender);
            setCategory(data.category);
            setPrice(data.price);
            setDescription(data.description);
            setSizes(data.sizes);
          })
      }
    }, [id]);
    // ここまで編集機能

  // 1.このページで変更の必要のあるstateを定義する
  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [images, setImages] = useState([]),
        [price, setPrice] = useState(""),
        [sizes, setSizes] = useState([]);

  // 2. useCallbackでstateをフォームの内容に変更する。        
  const inputName = useCallback((event) => {
    setName(event.target.value)
  },[setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  },[setDescription]);
  
  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  },[setPrice]);

  const categories = [
    {id: "tops", name:"トップス"},
    {id: "shirts", name:"シャツ"},
    {id: "pants", name:"パンツ"},
  ];

  const genders = [
    {id: "all", name:"どちらも"},
    {id: "male", name:"メンズ"},
    {id: "female", name:"レディース"},
  ];


  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages}>

        </ImageArea>
        <TextInput
          fullWidth={true} label={"商品名"} multiline={false} required={true}
          rows={1} value={name} type={"text"} onChange={inputName}
        />
        <TextInput
          fullWidth={true} label={"商品説明"} multiline={true} required={true}
          rows={5} value={description} type={"text"} onChange={inputDescription}
        />
        <SelectBox 
          label={"カテゴリー"} required={true } options={categories} select={setCategory} value={category}
        />
        <SelectBox 
          label={"性別"} required={true } options={genders} select={setGender} value={gender}
        />
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={true}
          rows={1} value={price} type={"number"} onChange={inputPrice}
        />
        <div className="module-spacer--medium" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"登録する"}
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit;