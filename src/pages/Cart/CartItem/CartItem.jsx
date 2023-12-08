import React,{useState} from "react";
import style from "./cartItem.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import {API} from '../../../Backend'

const CartItem = (props) => {
  const {_id, itemName, price, qty, image, description } = props.cartitem;
  const { onDeleteProduct, onIncreaseQuantity, onDecreaseQuantity } = props;
  const { loading } = useSelector((state) => state.cartReducer);
  const [quantity,setQuantity]=useState(qty);

  const getItemTotal = (qty, price1) => {
    let total = 0;
    total = total + qty * price1;
    return total;
  };

  const onIncreaseQty=()=>{
    setQuantity(qty+1);
    onIncreaseQuantity(_id,qty+1);
  }

  const onDecreaseQty=()=>{
      if(qty<=1) return ;
      setQuantity(qty-1);
      onDecreaseQuantity(_id,qty-1);
  }

  return (
    <div className={` ${style.itemclass}`}>
      <div className={`flex ${style.cartItemWrapper}`}>
        <div className={`${style.cartitem_left}`}>
          <div className={`${style.item_image}`}>
            <LazyLoadImage
              src={`${API}${image}`}
              className={`${style.item_img}`}
              alt="item-image"
            />
          </div>
        </div>
        <div className={`${style.cartitem_right}`}>
          <div className={`col-12-12`}>
            <span className={`${style.item_name}`}>{itemName}</span>
            <span className={`${style.item_description}`}>{description}</span>
            <div className={`${style.item_price}`}>
              <div className={`${style.price}`}>
                <div
                  className={`${style.price_fnl}`}
                  data-label="cart-item-price"
                >
                  <span className={`${style.itemrupee} rupee`}>
                    {getItemTotal(qty, price)}
                  </span>
                </div>
              </div>
              <div>
                <div className={`${style.quantity}`} data-label="quantity">
                  {qty === 1 ? (
                    <div
                      className={`${style.delete}`}
                      data-label={`${props.cartitem._id}`}
                      onClick={() => onDeleteProduct(_id)}
                    ></div>
                  ) : (
                    <div
                      className={`${style.decrease}`}
                      data-label={`${props.cartitem._id}`}
                      onClick={onDecreaseQty}
                    ></div>
                  )}
                  <span className={`${style.quantity_value}`}>{qty}</span>
                  <div
                    className={`${style.increase}`}
                    data-label="increase"
                    onClick={onIncreaseQty}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
