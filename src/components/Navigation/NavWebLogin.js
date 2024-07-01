import React, { useContext } from 'react';
import './NavWebLogin.scss';
import { NavLink, useLocation, useHistory, Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import logo from '../home/img/icon.gif';
import Container from 'react-bootstrap/Container';
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavWebLogin = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();

    const handleLogout = async () => {
        let data = await logoutUser(); // clear cookie
        logoutContext(); // clear user in context

        if (data && +data.EC === 0) {
            toast.success('Log out success..');
            history.push('/login');
        } else {
            toast.error(data.EM);
        }
    };

    // Check if the user is authenticated and has the correct groupId
    if ((user && user.isAuthenticated === true && (user.account.groupId === 2)) ||
        location.pathname === '/home' || location.pathname === '/cart' || location.pathname === '/carts' ||
        location.pathname === '/log/com' || location.pathname === '/log/kfc' || location.pathname === '/log/sushi' || location.pathname === '/log/bun' ||
        location.pathname === '/log/sang' || location.pathname === '/log/trua' || location.pathname === '/log/toi' ||
        location.pathname === '/Sangcarts' || location.pathname === '/Sangorder'
    ) {
        return (
            <div className="top-nav">
                <Navbar expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width='100'
                                height='100'
                                className='d-inline-block align-top'
                                alt='Logo'
                            />
                            <span className='brand-name'></span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className="mx-auto d-flex justify-content-center">
                                <Nav className="nav-center">
                                    <NavLink exact to="/home" className="nav-link">Trang chủ</NavLink>
                                    <NavLink exact to="/about" className="nav-link">Giới thiệu</NavLink>
                                    <NavLink exact to="/cart" className="nav-link">Đặt hàng</NavLink>
                                    <NavLink exact to="/contact" className="nav-link">Tương tác</NavLink>
                                    <NavLink exact to="/checkbill" className="nav-link">checkbill</NavLink>
                                </Nav>
                            </div>
                            <Nav className="ms-auto px-4" style={{ marginRight: '50px' }}>
                                {user && user.isAuthenticated === true ? (
                                    <>
                                        <Nav.Item className='nav-link'>
                                            Xin chào {user.account.username} !
                                        </Nav.Item>
                                        <NavDropdown title="Chức năng" id="basic-nav-dropdown" className="nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Thay đổi mật khẩu</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogout()}>Đăng xuất</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <Link className='nav-link' to='/login'>Đăng nhập</Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return null;
    }
}

export default NavWebLogin;



// import React, { useEffect, useState } from 'react';
// import './NavWeb.scss';
// import { NavLink, useLocation } from 'react-router-dom';

// import { FaFacebook } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaTwitch } from "react-icons/fa";
// import { FaPhone } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaClock } from "react-icons/fa";
// // import { faHome } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// const NavWebLogin = (props) => {
//     const [isShow, setIsShow] = useState(false);
//     let location = useLocation();

//     useEffect(() => {
//         if (location.pathname.startsWith('/')) {
//             setIsShow(true);
//         } else {
//             setIsShow(false);
//         }
//         if (location.pathname.startsWith('/user')) {
//             setIsShow(false);
//         }
//         if (location.pathname.startsWith('/product')) {
//             setIsShow(false);
//         }
//         if (location.pathname.startsWith('/login')) {
//             setIsShow(false);
//         }
//         if (location.pathname.startsWith('/register')) {
//             setIsShow(false);
//         }

//     }, [location]);

//     return (
//         <>
//             {isShow && (
//                 <div className="topnav">
//                     <div className='contact '>
//                         <div className='d-none d-sm-block '>
//                             <div className='contact1 d-flex justify-content-between '>
//                                 <span className='c1 '><FaLocationDot />&nbsp;6087 Richmond hwy, Alexandria, VA </span>
//                                 <span className='c2 '> < FaPhone />&nbsp; 0123456789</span>
//                                 <span className='c3 '><FaClock />&nbsp;Mo-Fr 11:00-00:00, Sa-Su 15:00-00:00</span>

//                             </div>
//                         </div>
//                         <div className='contact2  '>
//                             <i className='i1  px-4' ><FaFacebook /></i>
//                             <i className='i1  px-4'><FaYoutube /></i>
//                             <i className='i1  px-4'><FaTwitter /></i>
//                             <i className='i1  px-4'><FaTwitch /></i>
//                         </div>
//                     </div>
//                     <div className='title'>
//                         Uncle V
//                     </div>
//                     <div className='navlink'>
//                         <NavLink to="/home">Trang chủ</NavLink>
//                         <NavLink to="/about">Giới thiệu</NavLink>
//                         <NavLink to="/cart">Đặt hàng</NavLink>
//                         <NavLink to="/contact">Tương tác</NavLink>
//                         <NavLink to="/login">Đăng nhập</NavLink>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default NavWebLogin;