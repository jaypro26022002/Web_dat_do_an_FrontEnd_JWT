import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalType.scss';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewType, updateCurrentType } from '../../services/userService';
import _ from "lodash";
// import { CommonUtils } from ".utils";

const ModalType = (props) => {

    const { action, dataModalType } = props;
    const defaultTypeData = {
        nameType: '',
    };

    const validInputsDefault = {
        nameType: true,
    };

    const [typeData, setTypeData] = useState(defaultTypeData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [previewImgURL, setPreviewImgURL] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        if (action === 'UPDATE' && dataModalType) {
            setTypeData({
                ...defaultTypeData,
                ...dataModalType,
            });
        } else {
            setTypeData(defaultTypeData);
        }
    }, [action, dataModalType]);

    const handleOnChangeInput = (value, name) => {
        let _typeData = _.cloneDeep(typeData);
        _typeData[name] = value;
        setTypeData(_typeData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameType'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!typeData[arr[i]]) {
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
                await createNewType({ ...typeData })
                : await updateCurrentType({ ...typeData });

            if (res && res.EC === 0) {
                props.onHide();
                setTypeData(defaultTypeData);
                toast.success("Food created/updated successfully!");
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalType = () => {
        props.onHide();
        setTypeData(defaultTypeData);
        setValidInputs(validInputsDefault);
    }

    return (
        <Modal size="lg" show={props.show} className='modal-type' onHide={handleCloseModalType}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === 'CREATE' ? 'Create new type' : 'Edit a type'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <form method='POST' action="/upload-profile-picRe" encType="multipart/form-data">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên loại sản phẩm (<span className='red'>*</span>) :</label>
                            <input className={validInputs.nameType ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={typeData.nameType}
                                onChange={(e) => handleOnChangeInput(e.target.value, "nameType")}
                            />
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

export default ModalType;
