import React, { useContext, useEffect, useState } from 'react';
import './NavAdmin.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const NavAdmin = (props) => {
    const { user } = useContext(UserContext)
    const location = useLocation();

    const [isShow, setIsShow] = useState(false);

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
        if (location.pathname === '/feedback') {
            setIsShow(true);
        }
        if (location.pathname === '/type') {
            setIsShow(true);
        }
        if (location.pathname === '/order') {
            setIsShow(true);
        }

    }, [location]);

    if (user && user.isAuthenticated === true || location.pathname === '/user') {
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
                    </div>
                )}
            </>
        );
    }
    else {
        return <></>
    }
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