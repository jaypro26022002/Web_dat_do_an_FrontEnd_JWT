// import axios from "axios";

import axios from '../setup/axios';

const registerNewUser = (email, phone, username, password) => {
    // axios tạo API để truyền dữ liệu qua Backend thông qua link kết nối server 
    return axios.post('/api/v1/register', {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);//template string
}

const deleteUser = (user) => {
    return axios.delete('/api/v1/user/delete', { data: { id: user.id } });
}

const fetchGroup = (user) => {
    return axios.get('/api/v1/group/read');
}

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", { ...userData })
}

const fetchAllFood = (page, limit) => {
    return axios.get(`/api/v1/food/read?page=${page}&limit=${limit}`);//template string
}
const createNewFood = (foodData) => {
    return axios.post("/api/v1/food/create", {
        ...foodData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
}

const updateCurrentUser = (userData) => {
    return axios.put("/api/v1/user/update", { ...userData })
}

export {
    registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser,
    fetchAllFood, createNewFood, updateCurrentUser
};