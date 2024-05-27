import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import CommonUtils from "../../utils/CommonUtils";
import { toast } from "react-toastify";
import { createNewFood } from '../../services/userService';
import _ from "lodash";
// import { CommonUtils } from ".utils";

const ModalFood = (props) => {
    const defaultFoodData = {
        nameFood: '',
        thumbnail: '',
        price: '',
        pricedown: '',
        quantity: '',
    };

    const validInputsDefault = {
        nameFood: true,
        price: true,
        pricedown: true,
        quantity: true,
    };

    const [foodData, setFoodData] = useState(defaultFoodData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [previewImgURL, setPreviewImgURL] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        // getGroups();
    }, []);

    // const getGroups = async () => {
    //     let res = await fetchGroup();
    //     if (res && res.EC === 0) {
    //         setUserGroups(res.DT);
    //         if (res.DT && res.DT.length > 0) {
    //             let groups = res.DT;
    //             setUserData({ ...userData, group: groups[0].id });
    //         }
    //     } else {
    //         toast.error(res.EM);
    //     }
    // };

    const handleOnChangeInput = (value, name) => {
        let _foodData = _.cloneDeep(foodData);
        _foodData[name] = value;
        setFoodData(_foodData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameFood', 'pricedown', 'price', 'quantity'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!foodData[arr[i]]) {
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

    const handleConfirmFood = async () => {
        let check = checkValidateInputs();
        if (check) {
            let res = await createNewFood({
                ...foodData,
                avatar: avatar // Include avatar in the request body
            });
            if (res && res.EC === 0) {
                props.onHide();
                setFoodData({ ...defaultFoodData });
                toast.success("Food created successfully!");
            } else {
                toast.error(res.EM);
            }
        }
    };

    // const handleChangeImage = async (event) => {
    //     let data = event.target.files;
    //     console.log(">> check data files: ", data)
    //     let file = data[0];
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file);
    //         console.log(">> check getBase64: ", base64)
    //         let objectUrl = URL.createObjectURL(file);
    //         this.useState({
    //             previewImgURL: objectUrl,
    //             avatar: avatar
    //         })
    //     }
    // }

    const handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        // console.log(">> check data files: ", file);
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log(">> check getBase64: ", base64);
            let objectUrl = URL.createObjectURL(file);
            setPreviewImgURL(objectUrl);
            setAvatar(base64);
        }
    };

    return (
        <Modal size="lg" show={props.show} className='modal-food' onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{props.title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <form method='POST' action="/upload-profile-picRe" enctype="multipart/form-data">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Add your image</label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type="file" hidden
                                    onChange={(event) => handleChangeImage(event)}
                                />
                                <label htmlFor='previewImg'>Tải ảnh</label>
                            </div>
                            <label>Name food (<span className='red'>*</span>) :</label>
                            <input className={validInputs.nameFood ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={foodData.nameFood}
                                onChange={(event) => handleOnChangeInput(event.target.value, "nameFood")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Price down(<span className='red'>*</span>) :</label>
                            <input className={validInputs.pricedown ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={foodData.pricedown}
                                onChange={(event) => handleOnChangeInput(event.target.value, "pricedown")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Price (<span className='red'>*</span>) :</label>
                            <input className='form-control'
                                type='text'
                                value={foodData.price}
                                onChange={(event) => handleOnChangeInput(event.target.value, "price")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Quantity (<span className='red'>*</span>) :</label>
                            <input className={validInputs.quantity ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={foodData.quantity}
                                onChange={(event) => handleOnChangeInput(event.target.value, "quantity")}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={() => handleConfirmFood()}>Save</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalFood;

{/* <Modal size="lg" show className='modal-user'>

<Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
        Modal heading
    </Modal.Title>
</Modal.Header>
<Modal.Body>
    <h4>Centered Modal</h4>
    <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
    </p>
</Modal.Body>
<Modal.Footer>
    <Button onClick={props.onHide}>Close</Button>
</Modal.Footer>
</Modal> */}