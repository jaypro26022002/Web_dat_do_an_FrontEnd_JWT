import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { fetchOrderDetailsByOrderId } from "../../services/userService";
import './ModalProduct.scss';

const ModalUserorder = (props) => {
    const { show, onHide, dataModalCheckorder } = props;
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (dataModalCheckorder && dataModalCheckorder.id_order) {
            fetchOrderDetails(dataModalCheckorder.id_order);
        }
    }, [dataModalCheckorder]);

    const fetchOrderDetails = async (orderId) => {
        let response = await fetchOrderDetailsByOrderId(orderId);
        if (response && response.EC === 0) {
            setOrderDetails(response.DT);
        } else {
            setOrderDetails([]);
        }
    };

    const handleCloseModalProduct = () => {
        onHide();
    };

    return (
        <Modal size="lg" show={show} className='modal-product' onHide={handleCloseModalProduct}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Kiểm tra thông tin chi tiết đơn hàng</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Mã đơn hàng</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Giá tiền</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Trạng thái đơn hàng</th>
                                    <th scope="col">Thời gian đặt hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.length > 0 ? (
                                    orderDetails.map((item, index) => (
                                        <tr key={`row-${index}`}>
                                            <td>{item.id_order}</td>
                                            <td>{item.nameProduct}</td>
                                            <td>{item.price}</td>
                                            <td>{item.district}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.status}</td>
                                            <td>{item.createdAt}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">Not Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalProduct}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUserorder;
