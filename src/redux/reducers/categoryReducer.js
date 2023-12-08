import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS
} from '../constants/categoryConstant';

const initialState = {
    loading: false,
    error: null,
    message: null,
    categories: []
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                categories: action.payload.categories
            }

        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                message: null
            }
        default:
            return state;
    }
}