import {
    SEND_OTP_FAIL,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/userConstant';


const initialState = {
    isAuth: false,
    loading: false,
    error: null,
    message: null,
    user: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_OTP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }


        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                message: action.payload.message,
                user: action.payload.user,

            }

        case VERIFY_OTP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                message: null,
                user: null,
                error: null
            }

        default:
            return state
    }
}