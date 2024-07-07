import './Register.scss';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
// toast hiệu ứng thông báo 
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    // dữ liệu user nhập vào sử dụng state(tình trạng) để handle
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirpassword, setConfirmPassword] = useState("")

    const defaultValidInput = {
        // (kích hoạt hiển thị)hiện thị khung viền đỏ nếu false
        isValiEmail: true,
        isValiPhone: true,
        isValiUsername: true,
        isValiPassword: true,
        isValiConfirmPassword: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    //use reactrouter history(chuyen trang bang hook)
    let history = useHistory();
    const handlerLogin = () => {
        history.push('/login');
    }

    // ham check API bo? link test vao
    useEffect(() => {
        // axios.get('http://localhost:8081/api/v1/test-api').then(data => {
        //     console.log('>>> check api << ', data);
        // })
    }, []);

    const isValidateInput = () => {
        setObjCheckInput(defaultValidInput)

        if (!email) {
            toast.error("email is empty ")
            //check biến setObjCheckInput(copy dữ liệu từ biến defaultValidInput, isValiEmail thế dữ liệu vào defaultValidInput )
            setObjCheckInput({ ...defaultValidInput, isValiEmail: false });
            return false;
        }
        // xác định ký tự email
        let emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
        if (!emailRegex.test(email)) {
            toast.error('email is valid');
            setObjCheckInput({ ...defaultValidInput, isValiEmail: false });
            return false;
        }
        // xác định ký tự phone
        if (!phone) {
            toast.error("phone is empty")
            setObjCheckInput({ ...defaultValidInput, isValiPhone: false });
            return false;
        }
        // xác định ký tự usename
        if (!username) {
            toast.error("username is empty ")
            setObjCheckInput({ ...defaultValidInput, isValiUsername: false });
            return false;
        }
        // xác định ký tự password 
        if (!password) {
            toast.error("password empty ")
            setObjCheckInput({ ...defaultValidInput, isValiPassword: false });
            return false;
        }
        if (password != confirpassword) {
            toast.error("confirpassword is not same")
            setObjCheckInput({ ...defaultValidInput, isValiConfirmPassword: false });
            return false;
        }

        return true;
    }
    const handleRegister = async () => {
        // B1: validate input
        let check = isValidateInput()
        if (check == true) {
            // B2: gọi server tạo mới user     
            let response = await registerNewUser(email, phone, username, password);
            console.log(">> check respone Register: ", response);
            //B3: tạo biến serverData hứng dữ liệu user từ server để check response(phản hồi data )
            if (+response.EC === 0) {
                // hiện thông báo success và history.push('/login')ra trang login nếu +serverData.EC == 0
                toast.success(response.EM);
                history.push('/login');
            } else {
                toast.error(response.EM);
            }
        }

        // cach 1: rut gon
        // let userData = [email, phone, username, password]
        // cach2 : chi tiet
        // let userData = {
        // email trái : key nơi chứa - email phải giá trị từ nguồn khác 
        //     email: email,
        //     password: password,
        // }
        // console.log(">> check user<< ", userData);

    }

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3'>
                    <div className='content-left col-7 d-none d-sm-block '>
                        <h1 className='title'>
                            Trang đăng ký
                        </h1>
                        <span className='detail'>Tạo tài khoản mới để là thành viên.</span>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className=''>
                            <h1 className='title d-block d-sm-none'>
                                Trang đăng ký
                            </h1>
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text'
                                // className: tính năng bootstrap Validate input 
                                className={objCheckInput.isValiEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email '
                                // kiểm soát dữ liệu bằng biến React 'email' onChange:thay đổi ô input theo biến email
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Số điện thoại:</label>
                            <input type='text' className={objCheckInput.isValiPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <label> Username:</label>
                            <input type='text' className={objCheckInput.isValiUsername ? 'form-control' : 'form-control is-invalid'} placeholder='Username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>  Mật khẩu:</label>
                            <input type='password' className={objCheckInput.isValiPassword ? 'form-control' : 'form-control is-invalid'} placeholder='password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Nhập lại mật khẩu:</label>
                            <input type='password' className={objCheckInput.isValiConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='re-password'
                                value={confirpassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Đăng ký</button>
                        <hr />
                        <div className='text-center '>
                            <button className='btn btn-info' onClick={handlerLogin}>
                                Bạn đã có tài khoản. Ở đây
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;