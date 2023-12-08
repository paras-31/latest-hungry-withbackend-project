import axios from 'axios';
import { API } from '../../Backend';

const token = localStorage.getItem('token')

const api = axios.create({
    baseURL: API,
    headers: {
        "Content-type": 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    },
    withCredentials: true
})

export default api;