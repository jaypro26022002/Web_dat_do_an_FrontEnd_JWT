import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteProduct = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc sẽ xóa sản phẩm này: {props.dataModal.nameProduct} ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={props.ConfirmDeleteProduct}>
                        Chấp nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;
