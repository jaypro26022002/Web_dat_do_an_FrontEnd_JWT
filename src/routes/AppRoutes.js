import Login from '../components/Login/Login';
import User from '../components/ManagerUser/user';
import Register from '../components/Register/Register';
import HomePage from '../components/website/HomePage';

import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
    return (
        <Switch>
            {/* PrivateRoutes kiểm tra người dùng có đủ điều kiện để vào trang User  */}
            <PrivateRoutes path='/user' component={User} />
            {/* <PrivateRoutes path='/project' component={Project} /> */}

            <Route path="/login" >
                <Login />
            </Route>
            <Route path="/register" >
                <Register />
            </Route>
            <Route path="/user" >
                <User />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="*">
                Not found 404
            </Route>
        </Switch>
    )

}

export default AppRoutes;

// import Login from '../components/Login/Login';
// import User from '../components/ManagerUser/user';
// import Register from '../components/Register/Register';
// import {
//     Switch,
//     Route,
// } from "react-router-dom";
// import PrivateRoutes from './PrivateRoutes';

// const AppRoutes = (props) => {
//     const Project = () => {
//         return (
//             <span>Projects</span>
//         )
//     }
//     return (
//         <Switch>
//             <PrivateRoutes path='/user' component={User} />
//             <PrivateRoutes path='/project' component={Project} />

//             <Route path="/login" >
//                 <Login />
//             </Route>
//             <Route path="/register" >
//                 <Register />
//             </Route>
//             <Route path="/user" >
//                 <User />
//             </Route>

//             <Route path="/" exact >
//                 Home
//             </Route>
//             <Route path="*">
//                 Not found 404
//             </Route>
//         </Switch>
//     )

// }

// export default AppRoutes;