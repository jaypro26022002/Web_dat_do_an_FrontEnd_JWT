import React from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";

//use reactrouter history(chuyen trang bang hook)
const Register = (props) => {
    let history = useHistory();
    const handlerLogin = () => {
        history.push('/login');
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
                            <input type='text' className='form-control' placeholder='User name or phone number' />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder='Phone number' />
                        </div>
                        <div className='form-group'>
                            <label> Username:</label>
                            <input type='text' className='form-control' placeholder='Username' />
                        </div>
                        <div className='form-group'>
                            <label>  Password:</label>
                            <input type='password' className='form-control' placeholder='password' />
                        </div>
                        <div className='form-group'>
                            <label> Re-enter-password:</label>
                            <input type='password' className='form-control' placeholder='password' />
                        </div>
                        <button className='btn btn-primary'>Register</button>
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