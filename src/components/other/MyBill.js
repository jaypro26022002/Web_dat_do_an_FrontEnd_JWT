import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyBill.scss'; // Import CSS file for styling

const MyBill = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);

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

    const formatAmount = (amount) => {
        // Định dạng số với không có phần phân tách nghìn và không có chữ số thập phân
        return parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
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
                const extraData = decodeURIComponent(queryParams.get('extraData'));
                const items = JSON.parse(extraData);

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
                setItems(items);
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

            <table className="order-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nameProduct}</td>
                            <td>{item.quantity}</td>
                            <td>{parseFloat(item.price).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                            <td>{(parseFloat(item.price) * item.quantity).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="order-details">
                <p>Mã đơn hàng: {orderData.orderId}</p>
                <p>Số tiền: {formatAmount(orderData.amount)} VND</p>
                <p>Thông tin đơn hàng: {orderData.orderInfo}</p>
                <p>Mã giao dịch: {orderData.transId}</p>
                <p>Loại thanh toán: {orderData.payType}</p>
                <p>Thời gian phản hồi: {formatResponseTime(orderData.responseTime)}</p>
            </div>
        </div>
    );
};

export default MyBill;


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './MyBill.scss'; // Import CSS file for styling

// const MyBill = () => {
//     const [orderData, setOrderData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const location = useLocation();

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
//         const fetchOrderData = async () => {
//             try {
//                 const queryParams = new URLSearchParams(location.search);
//                 const partnerCode = queryParams.get('partnerCode');
//                 const orderId = queryParams.get('orderId');
//                 const amount = queryParams.get('amount') || 'N/A';
//                 const orderInfo = queryParams.get('orderInfo');
//                 const transId = queryParams.get('transId');
//                 const resultCode = queryParams.get('resultCode');
//                 const message = queryParams.get('message');
//                 const payType = queryParams.get('payType') || 'N/A';
//                 const responseTime = queryParams.get('responseTime');

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
//         <div className="my-bill-container">
//             <h1>{orderData.message}</h1>
//             <h1>THÔNG TIN ĐƠN HÀNG</h1>
//             <p><a href='/home'>Bạn có muốn đặt thêm</a></p>

//             <form>
//                 <table className="table table-bordered table-hover">
//                     <thead>
//                         <tr>
//                             <th scope="col">Tên sản phẩm</th>
//                             <th scope="col">Giá</th>
//                             <th scope="col">Số lượng</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {listUsers && listUsers.length > 0 ?
//                             <>
//                                 {listUsers.map((item, index) => {
//                                     return (
//                                         <tr key={`row-${index}`}>
//                                             <td>{item.nameProduct}</td>
//                                             <td>{item.price}</td>
//                                             <td>{item.quantity}</td>
//                                         </tr>
//                                     )
//                                 })}
//                             </>
//                             :
//                             <>
//                                 <tr><td>Not Found</td></tr></>
//                         }
//                     </tbody>
//                 </table>
//             </form>

//             <form>
//                 <div className="form-group">
//                     <label>Partner Code</label>
//                     <input type="text" value={orderData.partnerCode} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Mã đơn hàng</label>
//                     <input type="text" value={orderData.orderId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Số tiền</label>
//                     <input type="text" value={orderData.amount} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Thông tin đơn hàng</label>
//                     <input type="text" value={orderData.orderInfo} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Mã giao dịch</label>
//                     <input type="text" value={orderData.transId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Mã kết quả</label>
//                     <input type="text" value={orderData.resultCode} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Hình thức thanh toán</label>
//                     <input type="text" value={orderData.payType} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Thời gian phản hồi</label>
//                     <input type="text" value={formatResponseTime(orderData.responseTime)} readOnly />
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default MyBill;