import {
    ADD_ADDRESS_FAIL,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    GET_ADDRESS_FAIL,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS
} from '../constants/addressConstant';

import api from './server';
import { API } from '../../Backend';
import axios from 'axios'

export const createAddress = (values) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ADDRESS_REQUEST });

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

        const { data } = await apih.post('/api/address/createaddress', { address: values });

        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data.address });
        return data
    } catch (err) {
        dispatch({ type: ADD_ADDRESS_FAIL, payload: err.response.data.message })
        return err.respone.data
    }
}

export const getAddress = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST })

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
        const { data } = await apih.get('/api/address/getaddress');

        dispatch({ type: GET_ADDRESS_SUCCESS, payload: data.address === null ? {} : data.address })
        return data
    } catch (err) {
        dispatch({ type: GET_ADDRESS_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}