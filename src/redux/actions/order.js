import {
    ORDER_PLACE_FAIL,
    ORDER_PLACE_REQUEST,
    ORDER_PLACE_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS
} from '../constants/orderConstant';

import api from './server';
import { API } from '../../Backend';
import axios from 'axios';

export const placeOrder = (payload) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_PLACE_REQUEST });

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
        const { data } = await apih.post('/api/order/create', payload);

        dispatch({ type: ORDER_PLACE_SUCCESS, payload: data })
        return data
    } catch (err) {
        dispatch({ type: ORDER_PLACE_FAIL, payload: err.response.data.message })
        return err.response.data
    }
}

export const getOrder = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST })

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


        const { data } = await apih.get('/api/order/getorder');

        dispatch({ type: GET_ORDER_SUCCESS, payload: data.order })

    } catch (err) {
        dispatch({ type: GET_ORDER_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}