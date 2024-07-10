import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import './checkorder.scss'; // Import CSS file for styling
import { fetchAllUserOrder } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
import ModalUserorder from '../Modal/ModalUserOrder';

const UserOrder = () => {
    const { user } = useContext(UserContext);
    const [orderData, setOrderData] = useState({});
    const [items, setItems] = useState([]);

    const [isShowModalUserorder, setIsShowModalUserorder] = useState(false);
    const [actionModalUserorder, setActionModalUserorder] = useState("CREATE");
    const [dataModalUserorder, setDataModalUserorder] = useState({});

    const formatResponseTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (user && user.account && user.account.username) {
                const response = await fetchAllUserOrder(user.account.username);
                if (response.DT && response.EC === 0) {
                    setOrderData(response.DT);
                    setItems(response.DT); // Assuming response.DT is an array of order items
                } else {
                    setOrderData({ message: 'Failed to fetch orders' });
                }
            } else {
                console.error('User or username not defined');
            }
        };

        fetchOrders();
    }, [user]);

    const handleEditUserorder = (Checkorder) => {
        setActionModalUserorder("UPDATE");
        setDataModalUserorder(Checkorder);
        setIsShowModalUserorder(true);
    };

    const onHideModalUserorder = () => {
        setIsShowModalUserorder(false);
        setActionModalUserorder(false);
        setDataModalUserorder({});
    };


    return (
        <>
            <div className="my-bill-container">
                <h1>Lịch sử đơn hàng của bạn</h1>
                <p><a href='/home'>Bạn có muốn đặt thêm</a></p>

                <table className="order-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tổng tiền</th>
                            <th>Thời gian đặt hàng</th>
                            <th scope="col">Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={`row-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.total}</td>
                                    <td>{formatResponseTime(item.createdAt)}</td>
                                    <td>
                                        <span className="mx-3" onClick={() => handleEditUserorder(item)}>
                                            <i className="fa fa-pencil edit" aria-hidden="true"></i>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4">No orders found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalUserorder
                onHide={onHideModalUserorder}
                show={isShowModalUserorder}
                action={actionModalUserorder}
                dataModalCheckorder={dataModalUserorder} // Pass as dataModalCheckorder
            />
        </>
    );
};

export default UserOrder;
