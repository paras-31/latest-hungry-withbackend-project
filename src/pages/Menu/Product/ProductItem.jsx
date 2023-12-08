import React,{useState} from 'react'
import style from "./Product.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useSelector,useDispatch } from "react-redux";
import {addToCart} from '../../../redux/actions/cart'
import {API} from '../../../Backend'

const ProductItem = ({product}) => {
  const [adding, setAdding] = useState(false);
  const {isAuth}=useSelector((state)=>state.userReducer)
  const dispatch=useDispatch();

  const handleAddItem=(product)=>{
    setAdding(true)
    const {_id,itemName,price,image,description}=product
    dispatch(addToCart({_id,itemName,price,image,description})).then((res)=>{
      setAdding(false)
    })
  }

  return (
    <div className={`${style.productStyle} shadow-lg`}>
    <div className="overflow-hidden " data-label={`${product.name}`}>
      <div className={`${style.itemStyle}`}>
        <div className="width-100">
          <div className={`${style.product_image}`}>
            <div className={`${style.img_cvr}`}>
              <LazyLoadImage
                src={`${API}${product.image}`}
                alt={`${product.name}`}
              />
            </div>
            <div className={`${style.backgroundStyle}`}></div>
            <div className={`${style.priceStyle}  `}>
              <span className={`${style.rupee} ${style.rupee_content}`}>
                {product.price}
              </span>
            </div>
          </div>
        </div>
        <div className="width-100 flex-wrap flex-basis m-3 ">
          <div className={`${style.descriptionStyle}`}>
            <span className={`${style.productName}`}>{product.itemName}</span>
            <span
              className={`${style.descriptionName}`}
              title={`${product.description}`}
            >
              {product.description}
            </span>
          </div>
          <div className={`${style.buttonSection}`}>
            <div className="self_center">
            {adding ? (
                <button
                  data-label="addtocart"
                  className={`${style.addtocart}`}
                  style={{ border: "1.5px solid grey" }}
                  disabled
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: "bold",
                      color: "grey",
                    }}
                    className="text_white tracking_wider"
                  >
                    Going To Cart
                  </span>
                </button>
              ) : (
                <button
                  data-label="addtocart"
                  className={`${style.addtocart}`}
                  style={{ border: "1.5px solid green" }}
                  onClick={() => handleAddItem(product)}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: "bold",
                      color: "green",
                    }}
                    className="text_white tracking_wider"
                  >
                    ADD TO CART
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductItem