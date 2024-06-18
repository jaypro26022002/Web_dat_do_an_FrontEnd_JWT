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

export {
    fetchAllProductCom, fetchAllProductKFC, fetchAllProductSushi, fetchAllProductBun,
    fetchAllProductSang,fetchAllProductTrua,fetchAllProductToi,  
}