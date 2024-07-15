import { contactNew } from "../../services/userService";
import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { UserContext } from '../../context/UserContext';
import { fetchAllComments } from '../../services/cartService';

const Contact = (props) => {
    const { user } = useContext(UserContext);

    const defaultData = {
        nameUser: user.account.username || '', // Use the username from the user context
        description: '',
        id_shop: '1' // Default to the first shop option
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
                                Liên hệ
                            </h1>
                        </div>
                        <input
                            className='form-control'
                            type='text'
                            placeholder="Tên khách hàng"
                            value={contactData.nameUser}
                            readOnly
                        />
                        <textarea
                            name="description"
                            rows="10"
                            cols="30"
                            className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                            placeholder="Viết lời phản hồi"
                            value={contactData.description || ''}
                            onChange={(event) => handleOnChangeInput(event.target.value, "description")}
                        />
                        <div className='col-12 col-sm-6 form-group pt-2'>
                            <label>Cửa hàng :</label>
                            <select
                                className='form-select'
                                value={contactData.id_shop}
                                onChange={(event) => handleOnChangeInput(event.target.value, "id_shop")}
                            >
                                <option value="1">Cơm</option>
                                <option value="2">KFC</option>
                                <option value="3">Sushi</option>
                                <option value="4">Bún</option>
                            </select>
                        </div>
                        <button className='btn btn-primary' onClick={handlerConfirm}>
                            Confirm
                        </button>
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
}
export default Contact;
