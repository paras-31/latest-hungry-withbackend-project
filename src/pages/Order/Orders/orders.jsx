import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import moment from "moment";
import style from "./orders.module.css";
import styles from "../../Cart/Cart/Cart.module.css";
import { getOrder } from "../../../redux/actions/order";

const Orders = () => {
  const {order}=useSelector((state)=>state.orderReducer)
  const {isAuth}=useSelector((state)=>state.userReducer);
  const dispatch=useDispatch()

  useEffect(()=>{
    if(isAuth){
      dispatch(getOrder())
    }
  },[])

  return (
    <>
      <div>
        <>
          {isAuth && order.length > 0 ? (
            <>
              <div>
                <div className={`${style.order}`}>
                  <div className={`${style.order_cnt}`}>
                    <div className={`${style.order_heading_cnt}`}>
                      <div className={`${style.order_heading}`}>All Orders</div>
                    </div>
                    <div className={`${style.order_container}`}>
                      {order.map((order, index) => {
                        return (
                          <div
                            className={`${style.order_item} ${style.order_width}`}
                            key={index}
                          >
                            <div
                              className={`${style.order_item_cnt} shadow-lg`}
                            >
                              <div className={`${style.order_item_details}`}>
                                <div className={`${style.order_hd}`}>
                                  <div className={`${style.order_status}`} style={order.orderStatus[4].isCompleted? {backgroundColor:'#fc283f'}:{}}>
                                    <div className={`${style.order_status_h}`} >
                                      {order.orderStatus[4].isCompleted===true
                                      ? order.orderStatus[4].type:   
                                      order.orderStatus[3].isCompleted === true
                                        ? order.orderStatus[3].type
                                        : order.orderStatus[2].isCompleted ===
                                          true
                                        ? order.orderStatus[2].type
                                        : order.orderStatus[1].isCompleted ===
                                          true
                                        ? order.orderStatus[1].type
                                        : order.orderStatus[0].isCompleted ===
                                          true
                                        ? order.orderStatus[0].type
                                        : ""}
                                    </div>
                                  </div>
                                  <span>
                                    {order.orderStatus[3].isCompleted === true
                                      ? order.orderStatus[3].type
                                      : order.orderStatus[0].type}{" "}
                                    on{" "}
                                    {order.orderStatus[3].isCompleted === true
                                      ? moment(
                                          order.orderStatus[3].date
                                        ).format("MMM Do,h:mm A")
                                      : moment(order.createdAt).format(
                                          "MMM Do,h:mm A"
                                        )}
                                  </span>
                                </div>

                                <div className={`${style.item_detail}`}>
                                  <div className={`${style.item_qty}`}>
                                    Order Id :
                                  </div>
                                  &nbsp;
                                  <div className={`${style.item_desc}`}>
                                    {order.orderId}
                                  </div>
                                </div>
                              </div>
                              <div className={`${style.order_view_details}`}>
                                <div
                                  className={`${style.order_details_button}`}
                                >
                                  <Link
                                    to={`/order_details?order_id=${order.orderId}`}
                                    state={{orderId:order.orderId}}
                                  >
                                    <button className={`${style.order_btn}`}>
                                      <span>view detail</span>
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={`${styles.cart}`}>
              <div className={`${styles.cart_container} shadow-md`}>
                <img
                  src="/images/emptycart.jpg"
                  alt="emptycart"
                  style={{ width: 151, height: 151 }}
                />
                {isAuth ? (
                  <>
                    <div className={`${styles.text_wrapper}`}>
                      <span className={styles.text_1}>No Order Found</span>
                      <span className={styles.text_2}>
                        Add some items from the menu
                      </span>
                    </div>
                    <div className={`${styles.button_wrapper}`}>
                      <div className={`${styles.button_container}`}>
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
                    <div className={`${styles.text_wrapper}`}>
                      <span className={styles.text_1}>Missing Orders?</span>
                      <span className={styles.text_2}>
                        Login to See the details of your order
                      </span>
                    </div>
                    <div className={`${styles.button_wrapper}`}>
                      <div className={`${styles.button_container_1}`}>
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
        </>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Orders