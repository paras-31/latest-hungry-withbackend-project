import api from './server';
import {
    GET_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    UPDATE_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS
} from '../constants/cartConstant';
import { store } from '../store'
import { API } from '../../Backend';
import axios from 'axios';

export const getCartItems = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_REQUEST })

        const token = localStorage.getItem('token')

        const apih = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })

        const { data } = await apih.get('/api/cart/getcart');

        dispatch({ type: GET_CART_SUCCESS, payload: data })
        return data
    } catch (err) {
        dispatch({ type: GET_CART_FAIL, payload: err.response.data.message })
    }
}


export const addToCart = (product, newqty = 1) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')

        const apih = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
        const { cartItems } = store.getState().cartReducer;
        const { isAuth } = store.getState().userReducer;

        const qty = cartItems[product._id]
            ? parseInt(cartItems[product._id].qty + newqty)
            : 1

        cartItems[product._id] = {
            ...product,
            qty
        }

        if (isAuth) {
            dispatch({ type: ADD_TO_CART_REQUEST });

            const cartItems = [{ productId: product._id, quantity: qty }]

            const res = await apih.post('/api/cart/addtocart', { cartItems });
            console.log('res', res.data)
            if (res.status === 200) {
                dispatch(getCartItems())
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }

        dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems } })
    } catch (err) {
        dispatch({ type: ADD_TO_CART_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const updateCart = () => async (dispatch) => {
    const { isAuth } = store.getState().userReducer;

    const token = localStorage.getItem('token')
    const apih = axios.create({
        baseURL: API,
        headers: {
            "Content-type": 'application/json',
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })

    let cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;

    if (isAuth) {
        localStorage.removeItem('cart');

        if (cartItems) {
            const payload = {
                cartItems: Object.keys(cartItems).map((key, index) => {
                    console.log('cart', cartItems[key].qty)
                    return {
                        quantity: cartItems[key].qty,
                        productId: cartItems[key]._id
                    }
                })
            }

            if (Object.keys(cartItems).length > 0) {
                const res = await apih.post(`/api/cart/addtocart`, payload);

                if (res.status === 200) {
                    dispatch(getCartItems())
                }
            }
        } else {
            dispatch(getCartItems())
        }
    } else {
        if (cartItems) {
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems } })
        }
    }
}

export const removeCartItem = (payload) => async (dispatch) => {
    try {
        const { isAuth } = store.getState().userReducer;

        if (isAuth) {
            dispatch({ type: REMOVE_CART_ITEM_REQUEST })

            const token = localStorage.getItem('token')
            const apih = axios.create({
                baseURL: API,
                headers: {
                    "Content-type": 'application/json',
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })

            const res = await apih.post(`/api/cart/removeitem`, { payload })

            if (res.status === 200) {
                dispatch({ type: REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems())
            }
        } else {
            const items = JSON.parse(localStorage.getItem('cart')) || null;
            console.log(items);
            const item = delete items[payload.productId];

            if (item) {
                localStorage.setItem('cart', JSON.stringify(items));
                if (Object.keys(items).length > 0) {
                    dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems: items } })
                } else {
                    dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems: {} } })
                }
            }
        }
    } catch (err) {
        dispatch({ type: REMOVE_CART_ITEM_FAIL, payload: err.response.data.message })
    }
}