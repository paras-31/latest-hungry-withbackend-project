import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    GET_CART_REQUEST,
    GET_CART_FAIL,
    GET_CART_SUCCESS
} from '../constants/cartConstant';

import {
    LOGOUT_SUCCESS
} from '../constants/userConstant'

const initialState = {
    cartItems: {},
    loading: false,
    error: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case GET_CART_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADD_TO_CART_SUCCESS:
        case GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cartItems: action.payload.cartItems
            }

        case ADD_TO_CART_FAIL:
        case GET_CART_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                cartItems: {},
                error: null,
                loading: false
            }
        default:
            return state
    }
}