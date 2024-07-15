import React, { useEffect, useState } from 'react';
import './NavWeb.scss';
import logo from '../home/img/icon.gif';
import { NavLink, useLocation, useHistory, Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const NavWeb = (props) => {
    const location = useLocation();
    const history = useHistory();

    // Check if the user is authenticated and has the correct groupId
    if (location.pathname === '/' || location.pathname === 'new' ||
        location.pathname === '/contact' || location.pathname === '/com' || location.pathname === '/kfc' ||
        location.pathname === '/sang' || location.pathname === '/bun' || location.pathname === '/sushi' ||
        location.pathname === '/trua' || location.pathname === '/toi' || location.pathname === '/login' ||
        location.pathname === '/register' || location.pathname === '/new') {
        return (
            <div className="top-nav">
                <Navbar expand="lg">
                    <Container >
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
                                <Nav className="navlink">
                                    <NavLink exact to="/">Trang chủ</NavLink>
                                    <NavLink exact to="/new">Tin tức</NavLink>
                                    {/* <NavLink exact to="/cart">Đặt hàng</NavLink> */}
                                    <NavLink exact to="/contact">Tương tác</NavLink>
                                    <NavLink exact to="/login">Đăng nhập</NavLink>
                                    {/* <NavLink exact to="/checkorder">checkorder</NavLink> */}
                                    {/* <NavLink exact to="/checkbill">checkbill</NavLink> */}
                                </Nav>
                            </div>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return null;
    }
}
export default NavWeb;

// import React, { useEffect, useState } from 'react';
// import './NavWeb.scss';
// import { NavLink, useLocation, useHistory } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';
// import logo from '../home/img/icon.gif';


// const NavWeb = (props) => {
//     const location = useLocation();
//     const history = useHistory();

//     // Check if the user is authenticated and has the correct groupId
//     if (location.pathname === '/' || location.pathname === 'new' ||
//         location.pathname === '/contact' || location.pathname === '/com' || location.pathname === '/kfc' ||
//         location.pathname === '/sang' || location.pathname === '/bun' || location.pathname === '/sushi' ||
//         location.pathname === '/trua' || location.pathname === '/toi' || location.pathname === '/login' ||
//         location.pathname === '/register' || location.pathname === '/new') {
//         return (
//             <>
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
//                         <NavLink exact to="/">Trang chủ</NavLink>
//                         <NavLink exact to="/new">Tin tức</NavLink>
//                         {/* <NavLink exact to="/cart">Đặt hàng</NavLink> */}
//                         <NavLink exact to="/contact">Tương tác</NavLink>
//                         <NavLink exact to="/login">Đăng nhập</NavLink>
//                         {/* <NavLink exact to="/checkorder">checkorder</NavLink> */}
//                         {/* <NavLink exact to="/checkbill">checkbill</NavLink> */}
//                     </div>
//                 </div>
//             </>
//         );
//     } else {
//         return null;
//     }
// }
// export default NavWeb;