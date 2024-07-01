import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalType.scss';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewShop, updateCurrentShop } from '../../services/userService';
import _ from "lodash";

const ModalShop = (props) => {
    const { action, dataModalShop } = props;
    const defaultShopData = {
        nameShop: '',
        file: '',
        previewImgURL: '',
        address: '',
        type: '',
        rating: '',
        price: '',
        timeWork: ''
    };

    const validInputsDefault = {
        nameShop: true,
        address: true,
        timeWork: true,
        price: true,
    };

    const [shopData, setShopData] = useState(defaultShopData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [file, setFile] = useState();

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setShopData(prevState => ({ ...prevState, previewImgURL: previewUrl }));
        }
    }

    const [shopTypes, setShopTypes] = useState([]);

    useEffect(() => {
        // getTypes();
    }, []);

    useEffect(() => {
        if (action === 'UPDATE' && dataModalShop) {
            setShopData({ ...dataModalShop });
        }
    }, [dataModalShop]);

    useEffect(() => {
        if (action === 'CREATE') {
            setShopData({ ...dataModalShop, })
        }
    }, [action]);

    // const getTypes = async () => {
    //     const res = await fetchType();
    //     if (res && res.EC === 0) {
    //         setShopTypes(res.DT);
    //         if (res.DT && res.DT.length > 0) {
    //             setShopData((prevData) => ({ ...prevData, type: res.DT[0].id_type_product }));
    //         }
    //     } else {
    //         toast.error(res.EM);
    //     }
    // };

    const handleOnChangeInput = (value, name) => {
        let _shopData = _.cloneDeep(shopData);
        _shopData[name] = value;
        setShopData(_shopData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        const fieldsToValidate = ['nameShop', 'address', 'timeWork', 'rating', 'price'];
        for (const field of fieldsToValidate) {
            if (!shopData[field]) {
                setValidInputs((prevInputs) => ({ ...prevInputs, [field]: false }));
                toast.error(`Empty input ${field}`);
                return false;
            }
        }
        return true;
    };

    const handleConfirmShop = async () => {
        let check = checkValidateInputs();
        if (check) {
            const formdata = new FormData();
            formdata.append('image', file);  // Ensure the key matches what the backend expects
            formdata.append('nameShop', shopData.nameShop);
            formdata.append('address', shopData.address);
            formdata.append('rating', shopData.rating);
            formdata.append('price', shopData.price);
            formdata.append('timeWork', shopData.timeWork);

            if (action === 'UPDATE') {
                formdata.append('id_shop', shopData.id_shop);  // Ensure id_product is included
            }

            let res = action === 'CREATE' ?
                await createNewShop(formdata) :
                await updateCurrentShop(formdata);

            if (res && res.EC === 0) {
                props.onHide();
                setShopData(defaultShopData);
                toast.success("Shop created/updated successfully!");
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
    };

    return (
        <Modal size="lg" show={props.show} className='modal-shop' onHide={handleCloseModalShop}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>{props.action === 'CREATE' ? 'Thêm nhà hàng' : 'Thay đổi nhà hàng'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <form method='POST' action="/upload-profile-picRe" encType="multipart/form-data">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Thêm ảnh đại diện</label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type="file" hidden
                                    onChange={(event) => handleFile(event)} />

                                <label className='label-upload' htmlFor='previewImg'>Upload Image</label>
                                <div className='preview-image' style={{ backgroundImage: `url(${shopData.previewImgURL || ''})` }}></div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên cửa hàng (<span className='red'>*</span>) :</label>
                            <input className={validInputs.nameShop ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={shopData.nameShop}
                                onChange={(event) => handleOnChangeInput(event.target.value, "nameShop")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Địa chỉ(<span className='red'>*</span>) :</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={shopData.address}
                                onChange={(e) => handleOnChangeInput(e.target.value, "address")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Thời gian làm việc (<span className='red'>*</span>) :</label>
                            <input className={validInputs.timeWork ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={shopData.timeWork}
                                onChange={(e) => handleOnChangeInput(e.target.value, "timeWork")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Hạn tiền có thể chi tiêu ở nhà hàng (<span className='red'>*</span>) :</label>
                            <input className={validInputs.price ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={shopData.price}
                                onChange={(e) => handleOnChangeInput(e.target.value, "price")}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalShop}>Close</Button>
                <Button variant="primary" onClick={handleConfirmShop}>
                    {action === 'CREATE' ? 'Lưu' : 'Thay đổi'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalShop;
