import React, { useEffect, useState } from 'react';
import './NavWeb.scss';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../home/img/icon.gif';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const NavWeb = (props) => {
    const location = useLocation();
    const history = useHistory();

    // Check if the user is authenticated and has the correct groupId
    if (location.pathname === '/' || location.pathname === 'new' || location.pathname === '/shop' || location.pathname === '/cart' || location.pathname === '/shop') {
        return (
            <>
                <div className="topnav">
                    <div className='title'>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width='100'
                                height='100'
                                className='d-inline-block align-top'
                            />
                            <span href='/' className='brand-name'></span>
                        </Navbar.Brand>
                    </div>
                    <div className='navlink'>
                        <NavLink exact to="/">Trang chủ</NavLink>
                        <NavLink exact to="/about">Giới thiệu</NavLink>
                        <NavLink exact to="/cart">Đặt hàng</NavLink>
                        <NavLink exact to="/contact">Tương tác</NavLink>
                        <NavLink exact to="/login">Đăng nhập</NavLink>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}
export default NavWeb;

// import React, { useEffect, useState } from 'react';
// import './NavWeb.scss';
// import { NavLink, useLocation } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';
// import logo from '../home/img/icon.gif'

// const NavWeb = (props) => {
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
//                     <div className='title'>
//                         <Navbar.Brand href="/">
//                             <img
//                                 src={logo}
//                                 width='100'
//                                 height='100'
//                                 className='d-inline-block align-top'
//                             />
//                             <span href='/' className='brand-name'></span>
//                         </Navbar.Brand>
//                     </div>
//                     <div className='navlink'>
//                         <NavLink to="/">Trang chủ</NavLink>
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

// export default NavWeb;