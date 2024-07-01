import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    return (

        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa cửa hàng này</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc sẽ xóa cửa hàng này: {props.dataModal.email} ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={props.ConfirmDeleteUser}>
                        Chấp nhận
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalDelete;