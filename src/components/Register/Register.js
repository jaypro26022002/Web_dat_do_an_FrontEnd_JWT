import './Register.scss';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


//use reactrouter history(chuyen trang bang hook)
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirpassword, setConfirPassword] = useState("")



    let history = useHistory();
    const handlerLogin = () => {
        history.push('/login');
    }

    // ham check API bo? link test vao
    useEffect(() => {
        // axios.get('http://localhost:8081/api/test-api').then(data => {
        //     console.log('>>> check api << ', data);
        // })
    }, []);

    const isValidate = () => {

        if (!email) {
            toast.error("email is empty ")
            return false;
        }
        if (!phone) {
            toast.error("phone is empty")
            return false;
        }
        if (!username) {
            toast.error("username is empty ")
            return false;
        }
        if (!password) {
            toast.error("password empty ")
            return false;
        }
        if (password != confirpassword) {
            toast.error("confirpassword is not same")
            return false;
        }
        // xác định ký tự email
        let emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
        if (!emailRegex.test(email)) {
            toast.error('email is valid');
            return false;
        }

        return true;
    }
    const handleRegister = () => {
        let check = isValidate()
        // cach 1: rut gon
        let userData = [email, phone, username, password]
        // cach2 : chi tiet
        // let userData = {
        // email trái : key nơi chứa - email phải giá trị từ nguồn khác 
        //     email: email,
        //     password: password,
        // }
        console.log(">> check user<< ", userData);

    }

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Form register
                        </h1>
                        <span className='detail'>Facebook helps you connect and share with the people in your life.</span>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Form register
                            </h1>
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className='form-control' placeholder='User name or phone number'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <label> Username:</label>
                            <input type='text' className='form-control' placeholder='Username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>  Password:</label>
                            <input type='password' className='form-control' placeholder='password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Re-enter-password:</label>
                            <input type='password' className='form-control' placeholder='password'
                                value={confirpassword} onChange={(event) => setConfirPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center '>
                            <button className='btn btn-info' onClick={handlerLogin}>
                                Already have any account. Here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;