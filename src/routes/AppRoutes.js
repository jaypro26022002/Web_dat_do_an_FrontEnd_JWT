import Login from '../components/Login/Login';
import User from '../components/ManagerUser/user';
import Register from '../components/Register/Register';
import HomePage from '../components/home/HomePage';
import Product from '../components/pagesAdmin/Product';
import Cart from '../components_cart/Cart';
import Home from '../components_cart/Home';
import Header from '../components_cart/Header';
import Shop from '../components/pagesAdmin/shop';
import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
    return (
        <Switch>
            <PrivateRoutes path='/user' component={User} />
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/user">
                <User />
            </Route>
            <Route path='/product'>
                <Product />
            </Route>
            <Route path='/shop'>
                <Shop />
            </Route>
            <Route path='/cart' exact>
                <Header />
                <Home />
            </Route>
            <Route path='/carts'>
                <Header />
                <Cart />
            </Route>
            <Route path="/">
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
// import HomePage from '../components/home/HomePage';
// import Product from '../components/pagesAdmin/Product';
// import CartRouter from '../CartRouter';
// import Cart from '../components_cart/Cart';

// import {
//     Switch,
//     Route,
// } from "react-router-dom";
// import PrivateRoutes from './PrivateRoutes';
// import FileUpload from '../components/pagesAdmin/FileUpload'
// const AppRoutes = (props) => {
//     return (
//         <Switch>
//             {/* PrivateRoutes kiểm tra người dùng có đủ điều kiện để vào trang User  */}
//             <PrivateRoutes path='/user' component={User} />
//             {/* <PrivateRoutes path='/project' component={Project} /> */}

//             <Route path="/login" >
//                 <Login />
//             </Route>
//             <Route path="/register" >
//                 <Register />
//             </Route>
//             <Route path="/user" >
//                 <User />
//             </Route>
//             <Route path='/product'>
//                 <Product />
//             </Route>
//             <Route path='/cart' exact>
//                 <CartRouter />
//             </Route>
//             <Route path='/carts' >
//                 <Cart />
//             </Route>
//             <Route path="/" >
//                 <HomePage />
//             </Route>
//             <Route path="*">
//                 Not found 404
//             </Route>
//         </Switch>
//     )

// }
// export default AppRoutes;

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