import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import styles from "../CartItem/cartItem.module.css";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../../redux/actions/cart";

const Cart = () => {
  const { isAuth } = useSelector((state) => state.userReducer);
  const {cartItems} = useSelector((state) => state.cartReducer);
  const dispatch=useDispatch()


    useEffect(()=>{
        if(isAuth){
            dispatch(getCartItems())
        }
    },[isAuth])

    

  // increasing the quantity
  const handleIncreaseQuantity = (_id,qty) => {
    const {itemName,price,image,description}=cartItems[_id];

    dispatch(addToCart({_id,itemName,price,image,description},1))
  };

  // decreasing the quantity
  const handleDecreaseQuantity = (_id,qty) => {
    const {itemName,price,image,description}=cartItems[_id];

    dispatch(addToCart({_id,itemName,price,image,description},-1))
  };

  // deleteing the product from cart
  const handleDeleteProduct = async (_id) => {
    dispatch(removeCartItem({productId:_id}))
  };

  const cartTotal=()=>{
      let total=0;
      Object.keys(cartItems).map((key,index)=>{
            total+=cartItems[key].price*cartItems[key].qty
      })
      
      return total;
  }

  return (
    <div>
      { cartItems && Object.keys(cartItems).length>0 ? (
        <div className={`${styles.cartItempage}`}>
          <div className={`${styles.cartItemContainers}`}>
            <div className={`${styles.cartItembox} col-12-12`}>
              <div
                className={`${styles.mycart}`}
                style={{ flexGrow: 1, overflow: "visible" }}
              >
                <div
                  className={`${styles.orderitem} w-full`}
                  style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px" }}
                >
                  <div
                    className={`${styles.cartheading} w-full`}
                    style={{ backgroundColor: "rgb(255,255,255)" }}
                  >
                    <div className="block w-12/12">
                      <div className={`${styles.heading}`}>
                        <div className={`${styles.heading_text}`}>
                          My Cart({Object.keys(cartItems).length})
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.cartitemclass} w-full`}
                    style={{ backgroundColor: "rgb(255,255,255)" }}
                  >
                    {Object.keys(cartItems).map((key, index) => (
                      <CartItem
                        key={index}
                        cartitem={cartItems[key]}
                        onDeleteProduct={handleDeleteProduct}
                        onDecreaseQuantity={handleDecreaseQuantity}
                        onIncreaseQuantity={handleIncreaseQuantity}
                      />
                    ))}
                  </div>
                    <div className={`${styles.place_order_button} col-12-12`}>
                      <div className={`${styles.place_order}`}>
                  <Link to={"/checkout"}>

                        <button
                          className={`${styles.order_button} root_button`}
                        >
                          <span>Place Order</span>
                        </button>
                        </Link>

                      </div>
                    </div>
                </div>
              </div>

              <div className={`${styles.cart_right_section} `}>
                <div className={`${styles.cart_right} col-12-12`}>
                  <div className={`${styles.cart_right_container}`}>
                    <div className={styles.cart_right_details_section}>
                      <span className={styles.cart_right_price_heading}>
                        price details
                      </span>
                      <div className={styles.cart_right_price_details}>
                        <div className={`${styles.price_section}`}>
                          <div className={`${styles.details}`}>
                            <div className={`${styles.details1}`}>
                              Price({Object.keys(cartItems).length} item)
                            </div>
                          </div>
                          <span>{cartTotal()}</span>
                        </div>
                        <div className={`${styles.price_section}`}>
                          <div className={`${styles.details}`}>
                            <div className={`${styles.details1}`}>
                              Delivery Charges
                            </div>
                          </div>
                          <span>
                            <span
                              className={`${styles.detail_color} ${styles.detail_transform}`}
                            >
                              free
                            </span>
                          </span>
                        </div>
                        <div className={`${styles.cart_right_total_amount}`}>
                          <div className={`${styles.price_section}`}>
                            <div className={`${styles.details}`}>
                              <div className={`${styles.details1}`}>
                                Total Amount
                              </div>
                            </div>
                            <span>
                              <div className={`flex-row`}>
                                <div className={` ${styles.amount} `}>
                                  <div className={`${styles.details}`}>
                                    <div className={`item-center`}></div>
                                  </div>
                                  <span className={`rupee`}>
                                    {cartTotal()}
                                  </span>
                                </div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${style.cart}`}>
          <div className={`${style.cart_container} shadow-md`}>
            <img
              src="/images/emptycart.jpg"
              alt="emptycart"
              style={{ width: 151, height: 151 }}
            />
            {isAuth ? (
              <>
                <div className={`${style.text_wrapper}`}>
                  <span className={style.text_1}>your cart is empty</span>
                  <span className={style.text_2}>
                    Please add some items from the menu
                  </span>
                </div>
                <div className={`${style.button_wrapper}`}>
                  <div className={`${style.button_container}`}>
                    <Link to="/menu">
                      <button>
                        <span>Explore Menu</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`${style.text_wrapper}`}>
                  <span className={style.text_1}>Missing Cart Items?</span>
                  <span className={style.text_2}>
                    Login to see cart items you previously added
                  </span>
                </div>
                <div className={`${style.button_wrapper}`}>
                  <div className={`${style.button_container_1}`}>
                    <Link to="/login">
                      <button>
                        <span>LOGIN</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
