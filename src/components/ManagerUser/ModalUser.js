// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchGroup, createNewUser } from '../../services/userService';
// import _ from "lodash";

// const ModalUser = (props) => {
//     const defaultUserData = {
//         email: '',
//         phone: '',
//         username: '',
//         password: '',
//         address: '',
//         sex: '',
//         group: ''
//     }
//     const validInputsDefault = {
//         email: true,
//         phone: true,
//         username: true,
//         password: true,
//         address: true,
//         sex: true,
//         group: true,
//     }

//     const [userData, setUserData] = useState(defaultUserData);
//     const [validInputs, setValidInputs] = useState(validInputsDefault);

//     const [userGroups, setUserGroups] = useState([]);

//     useEffect(() => {
//         getGroups();
//     }, [])
//     // hàm getGroups: làm API lấy data từ backend
//     const getGroups = async () => {
//         let res = await fetchGroup();
//         if (res && res.data && res.data.EC === 0) {
//             setUserGroups(res.data.DT);
//             if (res.data.DT && res.data.DT.length > 0) {
//                 let groups = res.data.DT;
//                 setUserData({ ...userData, group: groups[0].id })
//             }
//         } else {
//             toast.error(res.data.EM);
//         }
//     }

//     const handleOnChangeInput = (value, name) => {
//         let _userData = _.cloneDeep(userData);
//         _userData[name] = value;
//         setUserData(_userData);
//     }

//     const checkValidateInputs = () => {
//         //create user
//         setValidInputs(validInputsDefault);
//         console.log(">> check valdi ", userData)
//         let arr = ['email', 'phone', 'password', 'group'];
//         let check = true;
//         for (let i = 0; i < arr.length; i++) {
//             console.log("nice")
//             if (!userData[arr[i]]) {
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[arr[i]] = false;
//                 setValidInputs(_validInputs);

//                 toast.error(`Empty input ${arr[i]}`);
//                 check = false;
//                 break;
//             }
//         }
//     }
//     const handleConfirmUser = async () => {
//         let check = checkValidateInputs();
//         if (check === true) {
//             let res = await createNewUser({ ...userData, groupId: userData['group'] });
//             if (res.data && res.data.EC === 0) {
//                 props.onHide();
//                 setUserData({ ...defaultUserData, group: userGroups[0].id })
//             } else {
//                 toast.error("Error create user...");
//             }
//             console.log(">> check res: ", check);
//         }
//     }
//     return (
//         <>
//             <Modal size="lg" show={props.show} className='modal-user' onHide={props.onHide}>
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         <span>{props.title}</span>
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className='content-body row'>
//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Email adress (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
//                                 type='email'
//                                 value={userData.email}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "email")}
//                             />
//                         </div>

//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Phone (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
//                                 type='text'
//                                 value={userData.phone}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
//                             />
//                         </div>

//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Username (<span className='red'>*</span>) :</label>
//                             <input className='form-control'
//                                 type='text'
//                                 value={userData.username}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "username")}
//                             />
//                         </div>

//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Password (<span className='red'>*</span>) :</label>
//                             <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
//                                 type='password'
//                                 value={userData.password}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "password")}
//                             />
//                         </div>

//                         <div className='col-12 col-sm-6 form-group'>
//                             <label>Address (<span className='red'>*</span>) :</label>
//                             <input className='form-control'
//                                 type='text'
//                                 value={userData.address}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "address")}
//                             />
//                         </div>

//                         <div className='col-12 col-sm-6 form-group pt-2'>
//                             <label>Gender :</label>
//                             <select
//                                 className='form-select'
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
//                             >
//                                 <option defaultValue>nam</option>
//                                 <option>nữ</option>
//                                 <option>lựa chọn khác</option>
//                             </select>
//                         </div>
//                         <div className='col-12 form group'>
//                             <label>Group (<span className='red'>*</span>) :</label>
//                             {/* form-select để có dấu mũi tên xuống khi dropdowwn */}
//                             <select
//                                 className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "group")}

//                             >
//                                 {userGroups.length > 0 &&
//                                     userGroups.map((item, index) => {
//                                         return (
//                                             <option key={`group-${index}`} value={item.id}>{item.name}</option>
//                                         )
//                                     })
//                                 }
//                             </select>
//                         </div>
//                     </div>

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={props.onHide}>Đóng</Button>
//                     <Button variant="primary" onClick={() => handleConfirmUser()}>
//                         Lưu
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default ModalUser

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchGroup, createNewUser, updateCurrentUser } from '../../services/userService';
import _ from "lodash";

const ModalUser = (props) => {

    const { action, dataModalUser } = props;
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();

    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, [dataModalUser]);

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action]);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(res.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        // hàm cloneDeep của thư viện lodash để tạo một bản sao sâu (deep clone) của đối tượng userData.
        // Điều này đảm bảo rằng chúng ta không thay đổi trực tiếp đối tượng userData ban đầu mà làm việc trên một bản sao.
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidateInputs = () => {
        if (action === 'UPDATE') return true;
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
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

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check) {
            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateCurrentUser({ ...userData, groupId: userData['group'] });

            if (res && res.EC === 0) {
                props.onHide();
                setUserData({
                    ...defaultUserData,
                    group: userGroups
                });
                toast.success("User created successfully!");
            } if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }
    return (
        <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalUser()}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Email address (<span className='red'>*</span>) :</label>
                        <input
                            disabled={action === 'CREATE' ? false : true}
                            className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                            type='email'
                            value={userData.email}
                            onChange={(event) => handleOnChangeInput(event.target.value, "email")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Phone (<span className='red'>*</span>) :</label>
                        <input
                            disabled={action === 'CREATE' ? false : true}
                            className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                            type='text'
                            value={userData.phone}
                            onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Username (<span className='red'>*</span>) :</label>
                        <input className='form-control'
                            type='text'
                            value={userData.username}
                            onChange={(event) => handleOnChangeInput(event.target.value, "username")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        {action === 'CREATE'
                            &&
                            <>
                                <label>Password (<span className='red'>*</span>) :</label>
                                <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                    type='password'
                                    value={userData.password}
                                    onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                                />
                            </>
                        }
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Address :</label>
                        <input className='form-control'
                            type='text'
                            value={userData.address}
                            onChange={(event) => handleOnChangeInput(event.target.value, "address")}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group pt-2'>
                        <label>Gender :</label>
                        <select
                            className='form-select'
                            onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
                            value={userData.sex}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Group (<span className='red'>*</span>) :</label>
                        <select
                            className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                            onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                            value={userData.group}
                        >
                            {userGroups.length > 0 && userGroups.map((item, index) => {
                                return (
                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                <Button variant="primary" onClick={() => handleConfirmUser()}>
                    {action === 'CREATE' ? 'Lưu' : 'Thay đổi'}
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalUser;
