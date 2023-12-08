import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS
} from '../constants/categoryConstant';

import api from './server';


export const getcategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORIES_REQUEST })

        const { data } = await api.get('/api/category/getcategory');

        console.log('data', data)

        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
        return data
    } catch (err) {
        dispatch({ type: GET_CATEGORIES_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}