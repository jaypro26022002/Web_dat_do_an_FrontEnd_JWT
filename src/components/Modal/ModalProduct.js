// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import './ModalProduct.scss';
// import { useEffect, useState } from "react";
// import CommonUtils from "../../utils/CommonUtils";
// import { toast } from "react-toastify";
// import { createNewProduct, updateCurrentProduct } from '../../services/userService';
// import _ from "lodash";
// // import { CommonUtils } from ".utils";

// const ModalProduct = (props) => {

//     const { action, dataModalProduct } = props;
//     const defaultProductData = {
//         nameProduct: '',
//         thumbnail: '',
//         price: '',
//         pricedown: '',
//         quantity: '',
//         previewImgURL: '',
//         avatar: ''
//     };

//     const validInputsDefault = {
//         nameProduct: true,
//         price: true,
//         pricedown: true,
//         quantity: true,
//     };

//     const [productData, setProductData] = useState(defaultProductData);
//     const [validInputs, setValidInputs] = useState(validInputsDefault);
//     const [previewImgURL, setPreviewImgURL] = useState(null);
//     const [avatar, setAvatar] = useState(null);

//     // const [userGroups, setUserGroups] = useState([]);

//     useEffect(() => {
//         if (action === 'UPDATE' && dataModalProduct) {
//             setProductData({
//                 ...dataModalProduct,
//                 // group: dataModalProduct.Group ? dataModalProduct.Group.id_product: ''
//             });
//         }
//     }, [dataModalProduct]);
//     useEffect(() => {
//         if (action === 'UPDATE') {
//             // if(userGroup && userGroup.length > 0) {}
//             setProductData({
//                 ...dataModalProduct,
//                 // group: userGroup[0].id_group
//             });
//         }
//     }, [action]);

//     // useEffect(() => {
//     //     if (action === 'CR-EATE') {
//     //         setProductData({ productData })
//     //     }
//     // }, [action]);
//     useEffect(() => {
//         if (action === 'UPDATE') {
//             console.log(">> check data props:", dataModalProduct)
//             setProductData(dataModalProduct);
//         }
//     }, [dataModalProduct])


//     const handleOnChangeInput = (value, name) => {
//         let _productData = _.cloneDeep(productData);
//         _productData[name] = value;
//         setProductData(_productData);
//     };

//     const checkValidateInputs = () => {
//         setValidInputs(validInputsDefault);
//         let arr = ['nameProduct', 'pricedown', 'price', 'quantity'];
//         let check = true;
//         for (let i = 0; i < arr.length; i++) {
//             if (!productData[arr[i]]) {
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[arr[i]] = false;
//                 setValidInputs(_validInputs);
//                 toast.error(`Empty input ${arr[i]}`);
//                 check = false;
//                 break;
//             }
//         }
//         return check;
//     };

//     const handleConfirmProduct = async () => {
//         let check = checkValidateInputs();
//         if (check) {
//             let res = action === 'CREATE' ?
//                 await createNewProduct({ ...productData })
//                 : await updateCurrentProduct({ ...productData });

//             if (res && res.EC === 0) {
//                 props.onHide();
//                 setProductData(defaultProductData);
//                 toast.success("Food created/updated successfully!");
//             } else if (res && res.EC !== 0) {
//                 toast.error(res.EM);
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[res.DT] = false;
//                 setValidInputs(_validInputs);
//             }
//         }
//     };

//     const handleChangeImage = async (event) => {
//         let data = event.target.files;
//         let file = data[0];
//         if (file) {
//             let base64 = await CommonUtils.getBase64(file);
//             let objectUrl = URL.createObjectURL(file);
//             setProductData({
//                 ...productData,
//                 avatar: base64,
//                 previewImgURL: objectUrl,
//             });
//         }
//     };
//     const handleCloseModalProduct = () => {
//         props.onHide();
//         setProductData(defaultProductData);
//         setValidInputs(validInputsDefault);
//     }
//     // const handleChangeImage = async (event) => {
//     //     let data = event.target.files;
//     //     let file = data[0];
//     //     // console.log(">> check data files: ", file);
//     //     if (file) {
//     //         let base64 = await CommonUtils.getBase64(file);
//     //         console.log(">> check getBase64: ", base64);
//     //         let objectUrl = URL.createObjectURL(file);
//     //         setPreviewImgURL(objectUrl);
//     //         setAvatar(base64);
//     //     }
//     // };

//     // const handleEditFood = (food) => {
//     //     console.log(">> check food modal", food)
//     //     this.props.handleEditFoodKey(food)
//     // }

//     return (
//         <Modal size="lg" show={props.show} className='modal-product' onHide={handleCloseModalProduct}>
//             <Modal.Header closeButton>
//                 <Modal.Title>
//                     <span>{props.action === 'CREATE' ? 'Create new product' : 'Edit a product'}</span>
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className='content-body row'>
//                     <form method='POST' action="/upload-profile-picRe" encType="multipart/form-data">
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Add your image</label>
//                             <div className='preview-img-container'>
//                                 <input id='previewImg' type="file" hidden
//                                     onChange={(event) => handleChangeImage(event)}
//                                 />
//                                 <label className='label-upload' htmlFor='previewImg'>Upload Image</label>
//                                 <div className='preview-image'
//                                     style={{ backgroundImage: `url(${productData.previewImgURL || ''})` }}
//                                 ></div>
//                             </div>
//                         </div>
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Name product (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.nameProduct ? 'form-control' : 'form-control is-invalid'}
//                                 type='text'
//                                 value={productData.nameProduct}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "nameProduct")}
//                             />
//                         </div>
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Price down(<span className='red'>*</span>) :</label>
//                             <input className={validInputs.pricedown ? 'form-control' : 'form-control is-invalid'}
//                                 type='text'
//                                 value={productData.pricedown}
//                                 onChange={(e) => handleOnChangeInput(e.target.value, "pricedown")}
//                             />
//                         </div>
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Price (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.price ? 'form-control' : 'form-control is-invalid'}
//                                 type='text'
//                                 value={productData.price}
//                                 onChange={(e) => handleOnChangeInput(e.target.value, "price")}
//                             />
//                         </div>
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Quantity (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.quantity ? 'form-control' : 'form-control is-invalid'}
//                                 type='text'
//                                 value={productData.quantity}
//                                 onChange={(e) => handleOnChangeInput(e.target.value, "quantity")}
//                             />
//                         </div>
//                     </form>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={props.onHide}>Close</Button>
//                 <Button variant="primary" onClick={() => handleConfirmProduct()}>
//                     {action === 'CREATE' ? 'Save' : 'Update'}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default ModalProduct;

import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import './ModalProduct.scss';
import CommonUtils from "../../utils/CommonUtils";
import { toast } from "react-toastify";
import { createNewProduct, updateCurrentProduct } from '../../services/userService';
import _ from "lodash";

const ModalProduct = (props) => {
    const { action, dataModalProduct } = props;
    const defaultProductData = {
        nameProduct: '',
        thumbnail: '',
        price: '',
        pricedown: '',
        quantity: '',
        previewImgURL: '',
        avatar: ''
    };

    const validInputsDefault = {
        nameProduct: true,
        price: true,
        pricedown: true,
        quantity: true,
    };

    const [productData, setProductData] = useState(defaultProductData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        if (action === 'UPDATE' && dataModalProduct) {
            setProductData({ ...dataModalProduct });
        }
    }, [action, dataModalProduct]);

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameProduct', 'price', 'pricedown', 'quantity'];
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

    const handleConfirmProduct = async () => {
        let check = checkValidateInputs();
        if (check) {
            let res = action === 'CREATE' ?
                await createNewProduct({ ...productData })
                : await updateCurrentProduct({ ...productData });

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

    const handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setProductData({
                ...productData,
                avatar: base64,
                previewImgURL: objectUrl,
            });
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
                    <span>{props.action === 'CREATE' ? 'Create new product' : 'Edit a product'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <form method='POST' action="/upload-profile-picRe" encType="multipart/form-data">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Add your image</label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type="file" hidden onChange={(event) => handleChangeImage(event)} />
                                <label className='label-upload' htmlFor='previewImg'>Upload Image</label>
                                <div className='preview-image' style={{ backgroundImage: `url(${productData.previewImgURL || ''})` }}></div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Name product (<span className='red'>*</span>) :</label>
                            <input className={validInputs.nameProduct ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.nameProduct}
                                onChange={(event) => handleOnChangeInput(event.target.value, "nameProduct")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Price down(<span className='red'>*</span>) :</label>
                            <input className={validInputs.pricedown ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.pricedown}
                                onChange={(e) => handleOnChangeInput(e.target.value, "pricedown")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Price (<span className='red'>*</span>) :</label>
                            <input className={validInputs.price ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.price}
                                onChange={(e) => handleOnChangeInput(e.target.value, "price")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Quantity (<span className='red'>*</span>) :</label>
                            <input className={validInputs.quantity ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.quantity}
                                onChange={(e) => handleOnChangeInput(e.target.value, "quantity")}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={handleConfirmProduct}>
                    {action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalProduct;
