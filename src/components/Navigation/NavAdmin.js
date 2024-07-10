import React, { useContext, useEffect, useState } from 'react';
import './NavAdmin.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../home/img/icon.gif';
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavAdmin = (props) => {
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
    if ((user && user.isAuthenticated === true && (user.account.groupId === 1 || user.account.groupId === 4)) ||
        location.pathname === '/user' || location.pathname === '/product' || location.pathname === '/shop' ||
        location.pathname === '/feedback' || location.pathname === '/checkorder' || location.pathname === '/doanhthu'
        ||
        location.pathname === ' /userorder') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width='30'
                                    height='30'
                                    className='d-inline-block align-top'
                                />
                                <span href='/home' className='brand-name'></span> Uncle V
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/user" className="nav-link ">Thành viên</NavLink>
                                    <NavLink to="/product" className="nav-link">Sản phẩm</NavLink>
                                    <NavLink to="/feedback" className="nav-link">Phản hồi</NavLink>
                                    <NavLink to="/shop" className="nav-link">Nhà hàng</NavLink>
                                    <NavLink to="/doanhthu" className="nav-link">Doanh thu</NavLink>
                                    <NavLink to="/checkorder" className="nav-link">Kiểm tra đơn hàng</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true
                                        ?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Xin chào {user.account.username} !
                                            </Nav.Item>

                                            <NavDropdown title="Chức năng" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Thay đổi mật khẩu</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogout()}>Đăng xuất</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to='/login'>
                                            Login
                                        </Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div >
            </>
        );
    } else {
        return null;
    }
}

export default NavAdmin;


// import React, { useContext, useEffect, useState } from 'react';
// import './NavAdmin.scss';
// import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import logo from '../home/img/icon.gif';
// import { logoutUser } from '../../services/userService';
// import { toast } from 'react-toastify';


// const NavAdmin = (props) => {
//     const { user, logoutContext } = useContext(UserContext)
//     const location = useLocation();
//     const history = useHistory();

//     const handleLogout = async () => {
//         let data = await logoutUser(); //clear cookie
//         logoutContext(); // clear user in context

//         if (data && +data.EC === 0) {
//             toast.success('Log out success..');
//             history.push('/login');
//         } else {
//             toast.error(data.EM);
//         }
//     }

//     if (user && user.isAuthenticated === true || location.pathname === '/user') {
//         return (
//             <>
//                 <div className='nav-header'>
//                     <Navbar bg="header" expand="lg" >
//                         <Container>
//                             <Navbar.Brand href="#home">
//                                 <img
//                                     src={logo}
//                                     width='30'
//                                     height='30'
//                                     className='d-inline-block align-top'
//                                 />
//                                 <span href='/home' className='brand-name'></span> Uncle V
//                             </Navbar.Brand>
//                             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                             <Navbar.Collapse id="basic-navbar-nav">
//                                 <Nav className="me-auto">
//                                     <NavLink to="/user" exact className="nav-link active">Thành viên</NavLink>
//                                     <NavLink to="/product" className="nav-link">Sản phẩm</NavLink>
//                                     <NavLink to="/feedback" className="nav-link">Đánh giá</NavLink>
//                                     <NavLink to="/type" className="nav-link">Thể loại</NavLink>
//                                     <NavLink to="/shop" className="nav-link">Nhà hàng</NavLink>
//                                     <NavLink to="/order" className="nav-link">Đơn đặt hàng</NavLink>
//                                 </Nav>
//                                 <Nav>
//                                     {user && user.isAuthenticated === true
//                                         ?
//                                         <>
//                                             <Nav.Item className='nav-link'>
//                                                 Welcome {user.account.username} !
//                                             </Nav.Item>

//                                             <NavDropdown title="Setting" id="basic-nav-dropdown">
//                                                 <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
//                                                 <NavDropdown.Divider />
//                                                 <NavDropdown.Item>
//                                                     <span onClick={() => handleLogout()}>Log out</span>
//                                                 </NavDropdown.Item>
//                                             </NavDropdown>
//                                         </>
//                                         :
//                                         <Link className='nav-link' to='/login'>
//                                             Login
//                                         </Link>
//                                     }


//                                 </Nav>
//                             </Navbar.Collapse>
//                         </Container>
//                     </Navbar>
//                 </div >
//             </>
//         );
//     }
//     else {
//         return <></>
//     }
// }

// export default NavAdmin;
