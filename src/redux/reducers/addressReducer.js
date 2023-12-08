import {
    GET_ADDRESS_FAIL,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAIL,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS
} from '../constants/addressConstant';
import { LOGOUT_SUCCESS } from '../constants/userConstant';

const initialState = {
    address: {},
    error: null,
    loading: false,
    message: null
}

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_REQUEST:
        case ADD_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case GET_ADDRESS_SUCCESS:
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload
            }
        case GET_ADDRESS_FAIL:
        case ADD_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                address: {},
                message: null
            }
        default:
            return state
    }
}