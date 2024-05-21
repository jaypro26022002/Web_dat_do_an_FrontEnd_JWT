import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';


const Nav = (props) => {
    const [isShow, setIsShow] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user') {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    }, [location]);

    return (
        <>
            {isShow && (
                <div className="topnav">
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
}

export default Nav;

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