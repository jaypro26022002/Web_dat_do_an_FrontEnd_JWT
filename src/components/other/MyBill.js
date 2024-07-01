import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { checkbill } from '../../services/cartService';

const MyBill = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const orderId = queryParams.get('orderId'); // Assuming orderId is passed in query params

                if (!orderId) {
                    throw new Error('orderId is missing in query parameters.');
                }

                const response = await checkbill(orderId); // Pass orderId to checkbill function
                if (response.EC === 0) {
                    setOrderData(response.DT);
                } else {
                    setError(`Failed to load order data: ${response.EM}`);
                }
            } catch (error) {
                setError(`Failed to load order data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!orderData) {
        return <div>No order data found.</div>;
    }

    return (
        <div>
            <h1>{orderData.message}</h1> {/* Display MoMo response message */}
            <button>tìm kiếm thêm sản phẩm khác ở đây</button>
            <h1>THÔNG TIN ĐƠN HÀNG</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="Email1">Email address</label>
                    <input type="email" className="form-control" id="Email" value={orderData.email} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Tên người nhận</label>
                    <input type="text" className="form-control" id="name" value={orderData.username} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="district">Địa chỉ</label>
                    <input type="text" className="form-control" id="district" value={orderData.district} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input type="text" className="form-control" id="phone" value={orderData.phone} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="orderId">Mã đơn hàng</label>
                    <input type="text" className="form-control" id="orderId" value={orderData.orderId} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Số tiền</label>
                    <input type="text" className="form-control" id="amount" value={orderData.total} readOnly />
                </div>
            </form>
        </div>
    );
};

export default MyBill;



// useEffect(() => {
//     const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
//     setOrderData(storedOrderData);
// }, []);


// import React, { useEffect, useState } from 'react';
// import checkbill from '../../services/cartService';

// const MyBill = () => {
//     const [orderData, setOrderData] = useState(null);

//     useEffect(() => {
//         const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
//         setOrderData(storedOrderData);
//     }, []);

//     if (!orderData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>ĐẶT HÀNG THÀNH CÔNG</h1>
//             <button>tìm kiếm thêm sản phẩm khác ở đây</button>
//             <h1>THÔNG TIN ĐƠN HÀNG</h1>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="Email1">Email address</label>
//                     <input type="email" className="form-control" id="Email" value={orderData.email} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="name">Tên người nhận</label>
//                     <input type="text" className="form-control" id="name" value={orderData.username} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="district">Địa chỉ</label>
//                     <input type="text" className="form-control" id="district" value={orderData.district} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="phone">Số điện thoại</label>
//                     <input type="text" className="form-control" id="phone" value={orderData.phone} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="orderId">Mã đơn hàng</label>
//                     <input type="text" className="form-control" id="orderId" value={orderData.orderId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="amount">Số tiền</label>
//                     <input type="text" className="form-control" id="amount" value={orderData.total} readOnly />
//                 </div>
//             </form>
//         </div>
//     )
// }
// export default MyBill;
