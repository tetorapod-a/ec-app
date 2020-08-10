import React, {useCallback, useState} from 'react';
import TextInput from '../components/UIkit/TextInput';
import {SelectBox, PrimaryButton} from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();

  // 1.このページで変更の必要のあるstateを定義する
  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState("");

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
        <div className="center">
          <PrimaryButton
            label={"登録する"}
            onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit;