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
    const { user, logoutContext } = useContext(UserContext)
    const location = useLocation();
    const history = useHistory();

    const handleLogout = async () => {
        let data = await logoutUser(); //clear cookie
        logoutContext(); // clear user in context

        if (data && +data.EC === 0) {
            toast.success('Log out success..');
            history.push('/login');
        } else {
            toast.error(data.EM);
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/user') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg" >
                        <Container>
                            <Navbar.Brand href="#home">
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
                                    <NavLink to="/user" exact className="nav-link active">Thành viên</NavLink>
                                    <NavLink to="/product" className="nav-link">Sản phẩm</NavLink>
                                    <NavLink to="/feedback" className="nav-link">Đánh giá</NavLink>
                                    <NavLink to="/type" className="nav-link">Thể loại</NavLink>
                                    <NavLink to="/shop" className="nav-link">Nhà hàng</NavLink>
                                    <NavLink to="/order" className="nav-link">Đơn đặt hàng</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true
                                        ?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.account.username} !
                                            </Nav.Item>

                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogout()}>Log out</span>
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
    }
    else {
        return <></>
    }
}

export default NavAdmin;

// import React, { useContext, useEffect, useState } from 'react';
// import './NavAdmin.scss';
// import { NavLink, useLocation } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';

// const NavAdmin = (props) => {
//     const { user } = useContext(UserContext)
//     const location = useLocation();

//     const [isShow, setIsShow] = useState(false);

//     useEffect(() => {
//         if (location.pathname === '/user') {
//             setIsShow(true);
//         }
//         else {
//             setIsShow(false);
//         }
//         if (location.pathname === '/product') {
//             setIsShow(true);
//         }
//         if (location.pathname === '/type') {
//             setIsShow(true);
//         }
//         if (location.pathname === '/feedback') {
//             setIsShow(true);
//         }
//         if (location.pathname === '/type') {
//             setIsShow(true);
//         }
//         if (location.pathname === '/order') {
//             setIsShow(true);
//         }

//     }, [location]);

//     if (user && user.isAuthenticated === true || location.pathname === '/user') {
//         return (
//             <>
//                 {isShow && (
//                     <div className="topnav">
//                         <NavLink to="/user">Thành viên</NavLink>
//                         <NavLink to="/product">Sản phẩm</NavLink>
//                         <NavLink to="/feedback">Đánh giá</NavLink>
//                         <NavLink to="/type">Thể loại</NavLink>
//                         <NavLink to="/shop">Nhà hàng</NavLink>
//                         <NavLink to="/order">Đơn đặt hàng</NavLink>
//                     </div>
//                 )}
//             </>
//         );
//     }
//     else {
//         return <></>
//     }
// }

// export default NavAdmin;