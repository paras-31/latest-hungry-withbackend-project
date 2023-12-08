import {
    SEND_OTP_FAIL,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/userConstant';

import api from './server';

export const sendotp = (phone) => async (dispatch) => {
    try {
        dispatch({ type: SEND_OTP_REQUEST });

        const { data } = await api.post('/api/user/sendotp', { phone: phone });

        dispatch({ type: SEND_OTP_SUCCESS, payload: data });
        return data
    } catch (err) {
        dispatch({ type: SEND_OTP_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const verifyotp = (otp) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_OTP_REQUEST });

        const { data } = await api.post('/api/user/verifyotp', otp);
        localStorage.setItem('token', data.token);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
        return data

    } catch (err) {
        dispatch({ type: VERIFY_OTP_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('token')
}