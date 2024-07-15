import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { contactNew } from "../../services/userService";
import { fetchAllComments } from '../../services/cartService';

const Contact = () => {
    const defaultData = {
        nameUser: '',
        description: '',
    };

    const validInputsDefault = {
        nameUser: true,
        description: true,
    };

    const formatResponseTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const [contactData, setContactData] = useState(defaultData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [items, setItems] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetchAllComments();
            if (response.EC === 0) {
                setItems(response.DT);
            } else {
                toast.error(`Error fetching comments: ${response.EM}`);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            toast.error('Failed to fetch comments');
        }
    };

    const handleOnChangeInput = (value, name) => {
        setContactData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        const requiredFields = ['nameUser', 'description'];
        let isValid = true;

        requiredFields.forEach(field => {
            if (!contactData[field]) {
                setValidInputs(prevValid => ({
                    ...prevValid,
                    [field]: false
                }));
                toast.error(`Field '${field}' cannot be empty`);
                isValid = false;
            }
        });

        return isValid;
    };

    const handlerConfirm = async () => {
        if (checkValidateInputs()) {
            try {
                const res = await contactNew({ ...contactData });
                if (res.EC === 0) {
                    toast.success("Successfully submitted feedback");
                    setContactData(defaultData);
                    fetchComments();
                } else {
                    toast.error(`Error: ${res.EM}`);
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                toast.error('Failed to submit feedback');
            }
        }
    };

    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Phần phản hồi
                        </h1>
                        <span className='detail'>Shop nhận mọi thông tin từ khiếu nại đến đánh giá từ khách và xin quý khách không được nhắn từ không phù hợp.</span>
                    </div>
                    <hr />
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h2 className='title'>
                            Thông tin Liên hệ
                        </h2>
                        <span className='detail'>Thông tin cửa hàng Uncle V.</span>
                        <p>Địa chỉ : 67/8 Nguyễn Thái hà phường 5 quận 9, Hồ Chí Minh </p>
                        <p>Số điện thoại: 0901234567</p>
                        <p>Số điện thoại khác: 0702234567</p>
                        <p>Email: uncleV@gmal.com</p>

                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Phản hồi
                            </h1>
                        </div>
                        <input className={validInputs.nameUser ? 'form-control' : 'form-control is-invalid'}
                            type='text' placeholder="Tên khách hàng"
                            value={contactData.nameUser}
                            onChange={(event) => handleOnChangeInput(event.target.value, "nameUser")}
                        />
                        <textarea name="message" rows="10" cols="30" className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                            placeholder="Viết lời phản hồi"
                            value={contactData.description}
                            onChange={(event) => handleOnChangeInput(event.target.value, "description")}
                        />
                        <button className='btn btn-primary' onClick={handlerConfirm}>Confirm</button>
                        <hr />

                        <h3>Bảng Phản hồi</h3>
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tên</th>
                                    <th>Nội dung</th>
                                    <th>Thời gian Phản hồi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <tr key={`row-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.nameUser}</td>
                                            <td>{item.description}</td>
                                            <td>{formatResponseTime(item.createdAt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="3">No feedbacks found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

// import { contactNew } from "../../services/userService";
// import { fetchAllComments } from '../../services/cartService';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useHistory } from "react-router-dom";
// import _ from "lodash";


// const Contact = (props) => {
//     //biến mặc định cho các giá trị rỗng
//     const defaultData = {
//         nameUser: '',
//         description: '',
//     };
//     //biến check input đỏ nếu nameUser: false
//     const validInputsDefault = {
//         nameUser: true,
//         description: true,
//     };
//     const formatResponseTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const year = date.getFullYear();
//         const month = ("0" + (date.getMonth() + 1)).slice(-2);
//         const day = ("0" + date.getDate()).slice(-2);
//         const hours = ("0" + date.getHours()).slice(-2);
//         const minutes = ("0" + date.getMinutes()).slice(-2);
//         const seconds = ("0" + date.getSeconds()).slice(-2);
//         return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
//     };


//     const [contactData, setContactData] = useState(defaultData);
//     const [validInputs, setValidInputs] = useState(validInputsDefault);
//     const [comment, setComment] = useState({});
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const fetchComments = async () => {
//             const response = await fetchAllComments();
//             if (response.DT && response.EC === 0) {
//                 setComment(response.DT);
//                 setItems(response.DT);
//             } else {
//                 setComment(response.EC);
//             }
//         };
//         fetchComments();
//     }, [])

//     const handleOnChangeInput = (value, name) => {
//         let _contactData = _.cloneDeep(contactData);
//         _contactData[name] = value;
//         setContactData(_contactData);
//     };

//     const checkValidateInputs = () => {
//         setValidInputs(validInputsDefault);
//         let arr = ['nameUser', 'description'];
//         let check = true;
//         for (let i = 0; i < arr.length; i++) {
//             if (!contactData[arr[i]]) {
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[arr[i]] = false;
//                 setValidInputs(_validInputs);
//                 toast.error(`Không được để trống ${arr[i]}`);
//                 check = false;
//                 break;
//             }
//         }
//         return check;
//     };

//     const handlerConfirm = async () => {
//         let check = checkValidateInputs();
//         if (check) {
//             let res = await contactNew({ ...contactData })
//             if (res && res.EC === 0) {
//                 setContactData(defaultData);
//                 toast.success("check succes", res.EM);
//             } else if (res && res.EC !== 0) {
//                 toast.error("check error", res.EM);
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[res.DT] = false;
//                 setValidInputs(_validInputs);
//             }
//         }
//     };

//     return (
//         <div className='login-container'>
//             <div className='container'>
//                 <div className='row px-3'>
//                     <div className='content-left col-7 d-none d-sm-block '>
//                         <h1 className='title'>
//                             Liên hệ
//                         </h1>
//                         <span className='detail'>Shop nhận mọi thông tin từ khiếu nại đến đánh giá từ khách và xin quý khách không được nhắn từ không phù hợp.</span>
//                     </div>
//                     <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
//                         <div className=''>
//                             <h1 className='title d-block d-sm-none'>
//                                 Liên hệ
//                             </h1>
//                         </div>
//                         <input className={validInputs.nameUser ? 'form-control' : 'form-control is-invalid'}
//                             type='text' placeholder="Tên khách hàng"
//                             value={contactData.nameUser || ''}
//                             onChange={(event) => handleOnChangeInput(event.target.value, "nameUser")}
//                         />
//                         <textarea name="message" rows="10" cols="30" className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
//                             type='text' placeholder="Viết lời phản hồi"
//                             value={contactData.description || ''}
//                             onChange={(event) => handleOnChangeInput(event.target.value, "description")}
//                         />
//                         <button className='btn btn-primary' onClick={handlerConfirm}
//                         >Confirm</button>
//                         <div className='col-12 col-sm-6 form-group pt-2'>
//                             <label>Cửa hàng :</label>
//                             <select
//                                 className='form-select'
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
//                             // value={event.target.value}
//                             >
//                                 <option value="male">Cơm</option>
//                                 <option value="female">KFC</option>
//                                 <option value="other">Sushi</option>
//                                 <option value="other">Bún</option>
//                             </select>
//                         </div>
//                         <hr />

//                         <h3>Bảng Phản hồi</h3>
//                         <table className="order-table">
//                             <thead>
//                                 <tr>
//                                     <th>No</th>
//                                     <th>Tên</th>
//                                     <th>Thời gian Phản hồi</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {items.length > 0 ? (
//                                     items.map((item, index) => (
//                                         <tr key={`row-${index}`}>
//                                             <td>{item.nameUser}</td>
//                                             <td>{item.description}</td>
//                                             <td>{formatResponseTime(item.createdAt)}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr><td colSpan="4">No orders found</td></tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Contact;

// import { contactNew } from "../../services/userService";
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useHistory } from "react-router-dom";
// import _ from "lodash";


// const Contact = (props) => {
//     //biến mặc định cho các giá trị rỗng
//     const defaultData = {
//         nameUser: '',
//         description: '',
//     };
//     //biến check input đỏ nếu nameUser: false
//     const validInputsDefault = {
//         nameUser: true,
//         description: true,
//     };

//     const [contactData, setContactData] = useState(defaultData);
//     const [validInputs, setValidInputs] = useState(validInputsDefault);


//     const handleOnChangeInput = (value, name) => {
//         let _contactData = _.cloneDeep(contactData);
//         _contactData[name] = value;
//         setContactData(_contactData);
//     };

//     const checkValidateInputs = () => {
//         setValidInputs(validInputsDefault);
//         let arr = ['nameUser', 'description'];
//         let check = true;
//         for (let i = 0; i < arr.length; i++) {
//             if (!contactData[arr[i]]) {
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[arr[i]] = false;
//                 setValidInputs(_validInputs);
//                 toast.error(`Không được để trống ${arr[i]}`);
//                 check = false;
//                 break;
//             }
//         }
//         return check;
//     };

//     const handlerConfirm = async () => {
//         let check = checkValidateInputs();
//         if (check) {
//             let res = await contactNew({ ...contactData })
//             if (res && res.EC === 0) {
//                 setContactData(defaultData);
//                 toast.success("check succes", res.EM);
//             } else if (res && res.EC !== 0) {
//                 toast.error("check error", res.EM);
//                 let _validInputs = _.cloneDeep(validInputsDefault);
//                 _validInputs[res.DT] = false;
//                 setValidInputs(_validInputs);
//             }
//         }
//     };

//     return (
//         <div className='login-container'>
//             <div className='container'>
//                 <div className='row px-3'>
//                     {/* <div className="container">
//                         <p></p>
//                         <p></p>
//                         <p></p>
//                         <p></p>

//                     </div> */}
//                     <div className='content-left col-7 d-none d-sm-block '>
//                         <h1 className='title'>
//                             Liên hệ
//                         </h1>
//                         <span className='detail'>Shop nhận mọi thông tin từ khiếu nại đến đánh giá từ khách và xin quý khách không được nhắn từ không phù hợp.</span>
//                     </div>
//                     <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
//                         <div className=''>
//                             <h1 className='title d-block d-sm-none'>
//                                 Liên hệ
//                             </h1>
//                         </div>
//                         <input className={validInputs.nameUser ? 'form-control' : 'form-control is-invalid'}
//                             type='text' placeholder="Tên khách hàng"
//                             value={contactData.nameUser || ''}
//                             onChange={(event) => handleOnChangeInput(event.target.value, "nameUser")}
//                         />
//                         <textarea name="message" rows="10" cols="30" className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
//                             type='text' placeholder="Viết lời phản hồi"
//                             value={contactData.description || ''}
//                             onChange={(event) => handleOnChangeInput(event.target.value, "description")}
//                         />
//                         <button className='btn btn-primary' onClick={handlerConfirm}
//                         >Confirm</button>
//                         <div className='col-12 col-sm-6 form-group pt-2'>
//                             <label>Cửa hàng :</label>
//                             <select
//                                 className='form-select'
//                                 onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
//                             // value={event.target.value}
//                             >
//                                 <option value="male">Cơm</option>
//                                 <option value="female">KFC</option>
//                                 <option value="other">Sushi</option>
//                                 <option value="other">Bún</option>
//                             </select>
//                         </div>
//                         <hr />

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Contact;