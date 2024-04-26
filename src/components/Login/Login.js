import React from 'react';
import './Login.scss';
import { useHistory } from "react-router-dom";

//use reactrouter useHistory(chuyen trang bang hook)
const Login = (props) => {
    let history = useHistory();
    const handerCreateNewUser = () => {
        history.push('/register');
    }
    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Form login
                        </h1>
                        <span className='detail'>Facebook helps you connect and share with the people in your life.</span>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Form login
                            </h1>
                        </div>
                        <input type='text' className='form-control' placeholder='User name or phone number' />
                        <input type='password' className='form-control' placeholder='password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Forgot password?</a>
                        </span>
                        <hr />
                        <div className='text-center '>
                            <button className='btn btn-info' onClick={handerCreateNewUser}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;