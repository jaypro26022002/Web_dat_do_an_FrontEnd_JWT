import axios from '../setup/axios';

const fetchAllProductCom = () => {
    return axios.get(`/api/v1/product/readcom`);//template string
}
const fetchAllProductKFC = () => {
    return axios.get(`/api/v1/product/readkfc`);//template string
}
const fetchAllProductSushi = () => {
    return axios.get(`/api/v1/product/readsushi`);//template string
}
const fetchAllProductBun = () => {
    return axios.get(`/api/v1/product/readbun`);//template string
}
const fetchAllProductSang = () => {
    return axios.get(`/api/v1/product/readsang`);//template string
}
const fetchAllProductTrua = () => {
    return axios.get(`/api/v1/product/readtrua`);//template string
}
const fetchAllProductToi = () => {
    return axios.get(`/api/v1/product/readtoi`);//template string
}

const fetchShop1 = () => {
    return axios.get(`/api/v1/shop/readShop`);//template string
}
const fetchShop2 = () => {
    return axios.get(`/api/v1/shop/readShop2`);//template string
}
const fetchShop3 = () => {
    return axios.get(`/api/v1/shop/readShop3`);//template string
}
const fetchShop4 = () => {
    return axios.get(`/api/v1/shop/readShop4`);//template string
}

const createOrder = (orderData) => {
    return axios.post('/api/v1/orders', orderData); // Adjust the endpoint as needed
}
const createMoMoPayment = (orderData) => {
    return axios.post('/api/v1/momo/payment', orderData) // Adjust the endpoint as needed
}

const checkorder_status = (orderData) => {
    return axios.post('/api/v1/check-status-transaction', orderData) // Adjust the endpoint as needed
}

const checkbill = (orderData) => {
    return axios.get('/api/v1/callback', orderData) // Adjust the endpoint as needed
}

export {
    fetchAllProductCom, fetchAllProductKFC, fetchAllProductSushi, fetchAllProductBun,
    fetchAllProductSang, fetchAllProductTrua, fetchAllProductToi,
    createOrder, createMoMoPayment, checkorder_status, checkbill,
    fetchShop1, fetchShop2, fetchShop3, fetchShop4
}