import { contactNew } from "../../services/userService";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import _ from "lodash";


const Contact = (props) => {
    //biến mặc định cho các giá trị rỗng
    const defaultData = {
        nameUser: '',
        description: '',
    };
    //biến check input đỏ nếu nameUser: false
    const validInputsDefault = {
        nameUser: true,
        description: true,
    };

    const [contactData, setContactData] = useState(defaultData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);


    const handleOnChangeInput = (value, name) => {
        let _contactData = _.cloneDeep(contactData);
        _contactData[name] = value;
        setContactData(_contactData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['nameUser', 'description'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!contactData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Không được để trống ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handlerConfirm = async () => {
        let check = checkValidateInputs();
        if (check) {
            let res = await contactNew({ ...contactData })
            if (res && res.EC === 0) {
                setContactData(defaultData);
                toast.success("check succes", res.EM);
            } else if (res && res.EC !== 0) {
                toast.error("check error", res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Liên hệ
                        </h1>
                        <span className='detail'>Shop nhận mọi thông tin từ khiếu nại đến đánh giá từ khách và xin quý khách không được nhắn từ không phù hợp.</span>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Liên hệ
                            </h1>
                        </div>
                        <input className={validInputs.nameUser ? 'form-control' : 'form-control is-invalid'}
                            type='text' placeholder="Tên khách hàng"
                            value={contactData.nameUser || ''}
                            onChange={(event) => handleOnChangeInput(event.target.value, "nameUser")}
                        />
                        <textarea name="message" rows="10" cols="30" className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                            type='text' placeholder="Viết lời phản hồi"
                            value={contactData.description || ''}
                            onChange={(event) => handleOnChangeInput(event.target.value, "description")}
                        />
                        <button className='btn btn-primary' onClick={handlerConfirm}
                        >Confirm</button>
                        <hr />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;