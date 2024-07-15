import './Login.scss';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

//use reactrouter useHistory(chuyen trang bang hook)
const Login = (props) => {
    const { loginContext } = useContext(UserContext);

    // dữ liệu user nhập vào sử dụng state(tình trạng) để handle
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPass: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    let history = useHistory();
    // tạo nút chuyển trang qua register 
    const handerCreateNewUser = () => {
        history.push('/register');
    }

    const handlerLogin = async () => {
        setObjCheckInput(defaultValidInput)
        //b1: check valueLogin la email or phone
        if (!valueLogin) {
            setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
            // toast.error("Please enter email address or phone");
            toast.error("Làm ơn điền email vào");
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPass: false });
            toast.error("please enter your password");
            toast.error("Làm ơn điền mật khẩu vào");
            return;
        }
        let response = await loginUser(valueLogin, password);

        // response.data để khi axios trả data sẽ ko thừa(các data ngày,giờ,nơi)chỉ trả valueLogin,password
        // +response.data.EC dấu '+' để chuyển dữ liệu từ string sang int 
        if (response && +response.EC === 0) {
            // success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let groupId = groupWithRoles.id;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username }
            }
            loginContext(data);
            if (groupId === 4) {
                history.push('/user');
            } else if (groupId === 2) {
                history.push('/home');
            } else {
                history.push('/');
            }

        }
        if (response && +response.EC !== 0) {
            // error
            toast.error(response.EM)
        }
    }

    const handlePressEnter = (event) => {
        //tạo điều kiện event để 'Enter' (kiểm tra bên console)
        if (event.charCode === 13 && event.code === "Enter") {
            handlerLogin();
        }
    }

    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Trang đăng nhập
                        </h1>
                        <span className='detail'>Hãy tham gia cùng chúng tôi và đặt nhiều món ngon mỗi ngày.</span>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Đăng nhập
                            </h1>
                        </div>
                        <input type='text'
                            className={objCheckInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email'
                            value={valueLogin} onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input type='password'
                            className={objCheckInput.isValidPass ? 'form-control' : 'form-control is-invalid'}
                            placeholder='mật khẩu'
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            // onKeyPress cho phép bắt sự kiện kiểu ký tự từ bàn phím('Enter: charCode:13)
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={handlerLogin}
                        >Đăng nhập</button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Bạn quên mật khẩu?</a>
                        </span>
                        <hr />
                        <div className='text-center '>
                            <button className='btn btn-info' onClick={handerCreateNewUser}>
                                Bạn chưa có tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;