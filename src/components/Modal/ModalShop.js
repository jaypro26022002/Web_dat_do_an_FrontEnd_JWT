import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalType.scss';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewType, updateCurrentType } from '../../services/userService';
import _ from "lodash";
// import { CommonUtils } from ".utils";

const ModalShop = (props) => {

    const { action, dataModalShop } = props;
    const defaultShopData = {
        nameShop: '',
        address: '',
        type: '',
        timeWork: ''
    };

    const validInputsDefault = {
        nameShop: true,
        address: true,
        type: true,
        timeWork: true

    };

    const [shopData, setShopData] = useState(defaultShopData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [shopTypes, setShopTypes] = useState([]);

    // const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getTypes();

    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setShopData({ ...dataModalShop, type: dataModalShop.TypeProduct ? dataModalShop.TypeProduct.id_type_product : '' });
        }
    }, [dataModalShop]);

    useEffect(() => {
        if (action === 'CREATE') {
            if (userTypes && userTypes.length > 0) {
                setUserData({ ...shopData, type: shopTypes[0].id_type_product })
            }
        }
    }, [action]);

    const getTypes = async () => {
        let res = await fetchType();
        if (res && res.EC === 0) {
            setShopType(res.DT);
            if (res.DT && res.DT.length > 0) {
                let types = res.DT;
                setShopData({ ...shopData, type: types[0].id_type_product });
            }
        } else {
            toast.error(res.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _shopData = _.cloneDeep(shopData);
        _shopData[name] = value;
        setShopData(_shopData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameShop'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!shopData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmProduct = async () => {
        let check = checkValidateInputs();
        if (check) {
            let res = action === 'CREATE' ?
                await createNewShop({ ...shopData })
                : await updateCurrentShop({ ...shopData });

            if (res && res.EC === 0) {
                props.onHide();
                setShopData(defaultShopData);
                toast.success("Food created/updated successfully!");
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalShop = () => {
        props.onHide();
        setShopData(defaultShopData);
        setValidInputs(validInputsDefault);
    }

    return (
        <Modal size="lg" show={props.show} className='modal-type' onHide={handleCloseModalShop}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === 'CREATE' ? 'Create new shop' : 'Edit a shop'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <form method='POST' action="/upload-profile-picRe" encType="multipart/form-data">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên cửa hàng (<span className='red'>*</span>) :</label>
                            <input className={validInputs.nameShop ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={shopData.nameShop}
                                onChange={(e) => handleOnChangeInput(e.target.value, "nameShop")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Type (<span className='red'>*</span>) :</label>
                            <select
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, "type")}
                                value={shopData.type}
                            >
                                {shopTypes.length > 0 && shopTypes.map((item, index) => {
                                    return (
                                        <option key={`type-${index}`} value={item.id}>{item.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={() => handleConfirmProduct()}>
                    {action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalShop;
