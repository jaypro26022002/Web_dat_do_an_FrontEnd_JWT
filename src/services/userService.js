// import axios from "axios";

import axios from '../setup/axios';
// upload img
const UploadFile = (formdata) => {
    return axios.post('/api/v1/upload-image', formdata)
}
const fetchImg = (user) => {
    return axios.get('/api/v1/getimg');
}


const registerNewUser = (email, phone, username, password) => {
    // axios tạo API để truyền dữ liệu qua Backend thông qua link kết nối server 
    return axios.post('/api/v1/register', {
        email, phone, username, password
    })
}

const fetchFeedback = () => {
    return axios.get('/api/v1/feedback/readContact');//template string
}
const contactNew = (contactData) => {
    return axios.post('/api/v1/create/contact', { ...contactData })
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
    return axios.delete('/api/v1/user/delete', { data: { id_user: user.id_user } });
}

const fetchGroup = (user) => {
    return axios.get('/api/v1/group/read');
}

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", { ...userData })
}

// Product
const fetchAllProduct = (page, limit) => {
    return axios.get(`/api/v1/product/read?page=${page}&limit=${limit}`);//template string
}
// const createNewProduct = (productData) => {
//     return axios.post("/api/v1/product/create", { ...productData, })
// }
const createNewProduct = (productData) => {
    return axios.post("/api/v1/product/create", productData)
}
const updateCurrentProduct = (productData) => {
    return axios.put("/api/v1/product/update", productData)
}
const deleteProduct = (product) => {
    return axios.delete('/api/v1/product/delete', { data: { id_product: product.id_product } });
}


const updateCurrentUser = (userData) => {
    return axios.put("/api/v1/user/update", { ...userData })
}

//type
const fetchAllType = (page, limit) => {
    return axios.get(`/api/v1/type/read?page=${page}&limit=${limit}`);//template string
}
const createNewType = (typeData) => {
    return axios.post("/api/v1/type/create", { ...typeData, })
}
const updateCurrentType = (typeData) => {
    return axios.put("/api/v1/type/update", { ...typeData })
}
const deleteType = (type) => {
    return axios.delete('/api/v1/type/delete', { data: { id: type.id_type } });
}

// shop
const fetchAllShop = (page, limit) => {
    return axios.get(`/api/v1/shop/read?page=${page}&limit=${limit}`);//template string 
}
const deleteShop = (shop) => {
    return axios.delete('/api/v1/shop/delete', { data: { id_shop: shop.id_shop } });
}
const fetchType = (shop) => {
    return axios.get('/api/v1/type1/read');
}
const createNewShop = (shopData) => {
    return axios.post("/api/v1/shop/create", shopData)
}
const updateCurrentShop = (shopData) => {
    return axios.put("/api/v1/shop/update", shopData)
}

// display image
const fetchAllProduct1 = () => {
    return axios.get(`/api/v1/product/read1`);//template string
}
const fetchAllProductEvent = () => {
    return axios.get(`/api/v1/product/readevent`);//template string
}

const getUserAccount = () => {
    return axios.get(`/api/v1/account`);
}

const logoutUser = () => {
    return axios.post("/api/v1/logout");
}

const fetchAllOrder = (page, limit) => {
    return axios.get(`/api/v1/adminorder/read?page=${page}&limit=${limit}`);//template string 
}
const fetchOrderDetailsByOrderId = (orderId) => {
    return axios.get(`/api/v1/adminorderdetail/read?orderId=${orderId}`);
};

const fetchAllCheckDoanhThu = () => {
    return axios.get(`/api/v1/adminorder/checkdoanhthu`);//template string 
}

const fetchAllCheckDoanhThuDetail = () => {
    return axios.get(`/api/v1/adminorder/checkdoanhthuDetail`);//template string 
}

const fetchAllUserOrder = async (username) => {
    try {
        const response = await axios.get(`/api/v1/userorder/checkdoanhthu`, { params: { username } });
        console.log('API Call:', response);
        return response;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};

export {
    fetchAllUser, deleteUser, createNewUser, updateCurrentUser,
    registerNewUser, loginUser,
    fetchGroup,
    fetchAllProduct, createNewProduct, updateCurrentProduct, deleteProduct,
    fetchAllType, createNewType, updateCurrentType, deleteType,
    fetchAllShop, deleteShop, fetchType, createNewShop, updateCurrentShop,
    contactNew,
    UploadFile, fetchImg,
    fetchAllProduct1,
    getUserAccount,
    logoutUser,
    fetchFeedback,
    fetchAllOrder, fetchOrderDetailsByOrderId,
    fetchAllCheckDoanhThu, fetchAllCheckDoanhThuDetail,
    fetchAllUserOrder,
    fetchAllProductEvent
};