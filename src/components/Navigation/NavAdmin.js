import React, { useEffect, useState } from 'react';
import './NavAdmin.scss';
import { NavLink, useLocation } from 'react-router-dom';


const NavAdmin = (props) => {
    const [isShow, setIsShow] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user') {
            setIsShow(true);
        }
        else {
            setIsShow(false);
        }
        if (location.pathname === '/product') {
            setIsShow(true);
        }
        if (location.pathname === '/type') {
            setIsShow(true);
        }

        // if (location.pathname === '/feedback') {
        //     setIsShow(true);
        // }
        // if (location.pathname === '/type') {
        //     setIsShow(true);
        // }
        // if (location.pathname === '/order') {
        //     setIsShow(true);
        // }
        // if (location.pathname === '/new') {
        //     setIsShow(true);
        // } 

    }, [location]);

    return (
        <>
            {isShow && (
                <div className="topnav">
                    <NavLink to="/user">Thành viên</NavLink>
                    <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/feedback">Đánh giá</NavLink>
                    <NavLink to="/type">Thể loại</NavLink>
                    <NavLink to="/shop">Nhà hàng</NavLink>
                    <NavLink to="/order">Đơn đặt hàng</NavLink>
                    <NavLink to="/new">Tin tức</NavLink>
                </div>
            )}
        </>
    );
}

export default NavAdmin;

// import React, { useEffect, useState } from 'react';
// import './Nav.scss';
// import { NavLink, useLocation } from 'react-router-dom';


// const Nav = (props) => {
//     const [isShow, setIsShow] = useState(true);
//     let location = useLocation();
//     useEffect(() => {
//         if (location.pathname === '/login') {
//             setIsShow(false)
//         }
//     }, []);

//     return (
//         <>
//             {isShow === true &&
//                 <div className="topnav">
//                     <NavLink to="/" exact>Home</NavLink>
//                     <NavLink to="/user">user</NavLink>
//                     <NavLink to="/project">Project</NavLink>
//                     <NavLink to="/about">About</NavLink>
//                 </div>
//             }
//         </>
//     );
// }

// export default Nav;