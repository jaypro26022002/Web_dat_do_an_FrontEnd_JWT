import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import './ModalProduct.scss';
import { toast } from "react-toastify";
import { createNewProduct, updateCurrentProduct } from '../../services/userService';
import _ from "lodash";

const ModalProduct = (props) => {

    const { action, dataModalProduct } = props;
    const defaultProductData = {
        nameProduct: '',
        file: '',
        price: '',
        pricedown: '',
        quantity: '',
        collection: '',
        fastDelivery: false,
        id_type_product: '',
        ratings: '',
        previewImgURL: '',
    };

    const validInputsDefault = {
        nameProduct: true,
        price: true,
        pricedown: true,
        quantity: true,
        collection: true,
        id_type_product: true,
        ratings: true,
    };

    const [productData, setProductData] = useState(defaultProductData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [file, setFile] = useState();

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setProductData(prevState => ({ ...prevState, previewImgURL: previewUrl }));
        }
    }

    useEffect(() => {
        if (action === 'UPDATE' && dataModalProduct) {
            setProductData({ ...dataModalProduct });
        }
    }, [dataModalProduct]);

    useEffect(() => {
        if (action === 'CREATE') {
            setProductData({ ...productData, fastDelivery: false })
        }
    }, [action]);

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameProduct', 'price', 'pricedown', 'quantity', 'collection', 'ratings', 'id_type_product'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!productData[arr[i]]) {
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

    const handleOnChangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    // const handleConfirmProduct = async () => {
    //     let check = checkValidateInputs();
    //     if (check) {
    //         const formdata = new FormData();
    //         formdata.append('image', file);  // Ensure the key matches what the backend expects
    //         formdata.append('nameProduct', productData.nameProduct);
    //         formdata.append('price', productData.price);
    //         formdata.append('pricedown', productData.pricedown);
    //         formdata.append('quantity', productData.quantity);

    //         let res = action === 'CREATE' ?
    //             await createNewProduct(formdata) :
    //             await updateCurrentProduct(formdata);

    //         if (res && res.EC === 0) {
    //             props.onHide();
    //             setProductData(defaultProductData);
    //             toast.success("Product created/updated successfully!");
    //         } else if (res && res.EC !== 0) {
    //             toast.error(res.EM);
    //             let _validInputs = _.cloneDeep(validInputsDefault);
    //             _validInputs[res.DT] = false;
    //             setValidInputs(_validInputs);
    //         }
    //     }
    // };

    const handleConfirmProduct = async () => {
        let check = checkValidateInputs();
        if (check) {
            const formdata = new FormData();
            formdata.append('image', file);
            formdata.append('nameProduct', productData.nameProduct);
            formdata.append('price', productData.price);
            formdata.append('pricedown', productData.pricedown);
            formdata.append('quantity', productData.quantity);
            formdata.append('collection', productData.collection);
            formdata.append('id_type_product', productData.id_type_product);
            formdata.append('fastDelivery', productData.fastDelivery);
            formdata.append('ratings', productData.ratings);


            if (action === 'UPDATE') {
                formdata.append('id_product', productData.id_product);  // Ensure id_product is included
            }

            let res = action === 'CREATE' ?
                await createNewProduct(formdata) :
                await updateCurrentProduct(formdata);

            if (res && res.EC === 0) {
                props.onHide();
                setProductData(defaultProductData);
                toast.success("Product created/updated successfully!");
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalProduct = () => {
        props.onHide();
        setProductData(defaultProductData);
        setValidInputs(validInputsDefault);
    }

    return (
        <Modal size="lg" show={props.show} className='modal-product' onHide={handleCloseModalProduct}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>{props.action === 'CREATE' ? 'Thêm sản phẩm mới' : 'Sửa thông tin sản phẩm'}</span>
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
                                <div className='preview-image' style={{ backgroundImage: `url(${productData.previewImgURL || ''})` }}></div>
                            </div>
                        </div>
                    </form>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Tên sản phẩm (<span className='red'>*</span>) :</label>
                        <input className={validInputs.nameProduct ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.nameProduct}
                            onChange={(event) => handleOnChangeInput(event.target.value, "nameProduct")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Giảm giá(<span className='red'>*</span>) :</label>
                        <input className={validInputs.pricedown ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.pricedown}
                            onChange={(e) => handleOnChangeInput(e.target.value, "pricedown")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Giá (<span className='red'>*</span>) :</label>
                        <input className={validInputs.price ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.price}
                            onChange={(e) => handleOnChangeInput(e.target.value, "price")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Số lượng (<span className='red'>*</span>) :</label>
                        <input className={validInputs.quantity ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.quantity}
                            onChange={(e) => handleOnChangeInput(e.target.value, "quantity")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Cửa hàng (<span className='red'>*</span>) :</label>
                        <input className={validInputs.collection ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.collection}
                            onChange={(e) => handleOnChangeInput(e.target.value, "collection")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Bữa ăn (<span className='red'>*</span>) :</label>
                        <input className={validInputs.id_type_product ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.id_type_product}
                            onChange={(e) => handleOnChangeInput(e.target.value, "id_type_product")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group pt-2'>
                        <label>Dịch vụ ưu tiên :</label>
                        <select
                            className='form-select'
                            onChange={(event) => handleOnChangeInput(event.target.value === "true", "fastDelivery")}
                            value={productData.fastDelivery}
                        >
                            <option value={true}>giao hàng nhanh</option>
                            <option value={false}>không có dịch vụ</option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Đánh giá (<span className='red'>*</span>) :</label>
                        <input className={validInputs.ratings ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={productData.ratings}
                            onChange={(e) => handleOnChangeInput(e.target.value, "ratings")}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={handleConfirmProduct}>
                    {action === 'CREATE' ? 'Lưu' : 'Thay đổi'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalProduct;
