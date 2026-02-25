import axios from 'axios';

const API = axios.create({
    baseURL: '/api',
});

export const getProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
