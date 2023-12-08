import React ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { getcategories } from '../../../redux/actions/category';
import ProductCategory from '../Category/Category';

const Menu = () => {
  const dispatch=useDispatch();
  const {categories}=useSelector((state)=>state.categoryReducer);

  useEffect(()=>{
    dispatch(getcategories())
  },[])

  return (
    <>
      <div style={{ marginTop: "1em" }}>
        {categories.map((category) => (
          <ProductCategory key={category._id} category={category} />
        ))}
      </div>
    </>
  )
}

export default Menu