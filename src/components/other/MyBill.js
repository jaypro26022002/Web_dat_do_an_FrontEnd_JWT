import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyBill.scss'; // Import CSS file for styling

const MyBill = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();

    const formatResponseTime = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const partnerCode = queryParams.get('partnerCode');
                const orderId = queryParams.get('orderId');
                const amount = queryParams.get('amount') || 'N/A';
                const orderInfo = queryParams.get('orderInfo');
                const transId = queryParams.get('transId');
                const resultCode = queryParams.get('resultCode');
                const message = queryParams.get('message');
                const payType = queryParams.get('payType') || 'N/A';
                const responseTime = queryParams.get('responseTime');

                const order = {
                    partnerCode,
                    orderId,
                    amount,
                    orderInfo,
                    transId,
                    resultCode,
                    message,
                    payType,
                    responseTime
                };

                setOrderData(order);
            } catch (error) {
                console.error('Error fetching order data:', error);
                setError('Error fetching order data');
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
        <div className="my-bill-container">
            <h1>{orderData.message}</h1>
            <h1>THÔNG TIN ĐƠN HÀNG</h1>
            <p><a href='/home'>Bạn có muốn đặt thêm</a></p>
            <form>
                <div className="form-group">
                    <label>Partner Code</label>
                    <input type="text" value={orderData.partnerCode} readOnly />
                </div>
                <div className="form-group">
                    <label>Mã đơn hàng</label>
                    <input type="text" value={orderData.orderId} readOnly />
                </div>
                <div className="form-group">
                    <label>Số tiền</label>
                    <input type="text" value={orderData.amount} readOnly />
                </div>
                <div className="form-group">
                    <label>Thông tin đơn hàng</label>
                    <input type="text" value={orderData.orderInfo} readOnly />
                </div>
                <div className="form-group">
                    <label>Mã giao dịch</label>
                    <input type="text" value={orderData.transId} readOnly />
                </div>
                <div className="form-group">
                    <label>Mã kết quả</label>
                    <input type="text" value={orderData.resultCode} readOnly />
                </div>
                <div className="form-group">
                    <label>Hình thức thanh toán</label>
                    <input type="text" value={orderData.payType} readOnly />
                </div>
                <div className="form-group">
                    <label>Thời gian phản hồi</label>
                    <input type="text" value={formatResponseTime(orderData.responseTime)} readOnly />
                </div>
            </form>
        </div>
    );
};

export default MyBill;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const MyBill = () => {
//     const [orderData, setOrderData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const location = useLocation();

//     // Hàm chuyển đổi thời gian từ timestamp sang chuỗi "ngày/tháng/năm giờ:phút:giây"
//     const formatResponseTime = (timestamp) => {
//         const date = new Date(parseInt(timestamp));
//         const year = date.getFullYear();
//         const month = ("0" + (date.getMonth() + 1)).slice(-2);
//         const day = ("0" + date.getDate()).slice(-2);
//         const hours = ("0" + date.getHours()).slice(-2);
//         const minutes = ("0" + date.getMinutes()).slice(-2);
//         const seconds = ("0" + date.getSeconds()).slice(-2);
//         return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
//     };

//     useEffect(() => {

//         // Hàm chuyển đổi thời gian từ timestamp sang chuỗi "giờ phút giây"


//         const fetchOrderData = async () => {
//             try {
//                 const queryParams = new URLSearchParams(location.search);

//                 // Extract relevant parameters
//                 const partnerCode = queryParams.get('partnerCode');
//                 const orderId = queryParams.get('orderId');
//                 const amount = queryParams.get('amount') || 'N/A'; // Default to 'N/A' if amount is empty
//                 const orderInfo = queryParams.get('orderInfo');
//                 const transId = queryParams.get('transId');
//                 const resultCode = queryParams.get('resultCode');
//                 const message = queryParams.get('message');
//                 const payType = queryParams.get('payType') || 'N/A'; // Default to 'N/A' if payType is empty
//                 const responseTime = queryParams.get('responseTime');

//                 // Build order data object
//                 const order = {
//                     partnerCode,
//                     orderId,
//                     amount,
//                     orderInfo,
//                     transId,
//                     resultCode,
//                     message,
//                     payType,
//                     responseTime
//                 };

//                 setOrderData(order);
//             } catch (error) {
//                 console.error('Error fetching order data:', error);
//                 setError('Error fetching order data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrderData();
//     }, [location.search]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!orderData) {
//         return <div>No order data found.</div>;
//     }

//     return (
//         <div>
//             <h1>{orderData.message}</h1> {/* Display MoMo response message */}
//             <h1>THÔNG TIN ĐƠN HÀNG</h1>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="partnerCode">Partner Code</label>
//                     <input type="text" className="form-control" id="partnerCode" value={orderData.partnerCode} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="orderId">Mã đơn hàng</label>
//                     <input type="text" className="form-control" id="orderId" value={orderData.orderId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="amount">Số tiền</label>
//                     <input type="text" className="form-control" id="amount" value={orderData.amount} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="orderInfo">Thông tin đơn hàng</label>
//                     <input type="text" className="form-control" id="orderInfo" value={orderData.orderInfo} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="transId">Mã giao dịch</label>
//                     <input type="text" className="form-control" id="transId" value={orderData.transId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="resultCode">Mã kết quả</label>
//                     <input type="text" className="form-control" id="resultCode" value={orderData.resultCode} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="payType">Hình thức thanh toán</label>
//                     <input type="text" className="form-control" id="payType" value={orderData.payType} readOnly />
//                 </div>
//                 {/* // Đoạn JSX để hiển thị thời gian phản hồi */}
//                 <div className="form-group">
//                     <label htmlFor="responseTime">Thời gian phản hồi</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="responseTime"
//                         value={formatResponseTime(orderData.responseTime)}
//                         readOnly
//                     />
//                 </div>

//             </form>
//         </div>
//     );
// };

// export default MyBill;