import React, { useEffect, useState } from 'react';
import './NavWeb.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../home/img/icon.gif'

import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavWeb = (props) => {
    const [isShow, setIsShow] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/')) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
        if (location.pathname.startsWith('/user')) {
            setIsShow(false);
        }
        if (location.pathname.startsWith('/product')) {
            setIsShow(false);
        }
        if (location.pathname.startsWith('/login')) {
            setIsShow(false);
        }
        if (location.pathname.startsWith('/register')) {
            setIsShow(false);
        }

    }, [location]);

    return (
        <>
            {isShow && (
                <div className="topnav">
                    <div className='contact '>
                        <div className='d-none d-sm-block '>
                            <div className='contact1 d-flex justify-content-between '>
                                <span className='c1 '><FaLocationDot />&nbsp;6087 Richmond hwy, Alexandria, VA </span>
                                <span className='c2 '> < FaPhone />&nbsp; 0123456789</span>
                                <span className='c3 '><FaClock />&nbsp;Mo-Fr 11:00-00:00, Sa-Su 15:00-00:00</span>

                            </div>
                        </div>
                        <div className='contact2  '>
                            <i className='i1  px-4' ><FaFacebook /></i>
                            <i className='i1  px-4'><FaYoutube /></i>
                            <i className='i1  px-4'><FaTwitter /></i>
                            <i className='i1  px-4'><FaTwitch /></i>
                        </div>
                    </div>
                    <div className='title'>
                        <Navbar.Brand href="#home">
                            <img
                                src={logo}
                                width='100'
                                height='100'
                                className='d-inline-block align-top'
                            />
                            <span href='/home' className='brand-name'>Uncle V</span>
                        </Navbar.Brand>
                    </div>
                    <div className='navlink'>
                        <NavLink to="/">Trang chủ</NavLink>
                        <NavLink to="/about">Giới thiệu</NavLink>
                        <NavLink to="/cart">Đặt hàng</NavLink>
                        <NavLink to="/contact">Tương tác</NavLink>
                        <NavLink to="/login">Đăng nhập</NavLink>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavWeb;