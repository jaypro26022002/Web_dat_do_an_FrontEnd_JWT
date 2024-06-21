import Login from '../components/Login/Login';
import User from '../components/ManagerUser/user';
import Register from '../components/Register/Register';
import HomePage from '../components/home/HomePage';
import Product from '../components/pagesAdmin/Product';
import Cart from '../components_cart/Cart';
import Home from '../components_cart/Home';
import Header from '../components_cart/Header';
import Shop from '../components/pagesAdmin/shop';
import Homekfc from '../components_guest/Homekfc';
import HomeCom from '../components_guest/HomeCom';
import HomeSushi from '../components_guest/homeSushi';
import HomeBun from '../components_guest/HomeBun';
import HomeSang from '../components_guest/HomeBuaSang';
import HomeTrua from '../components_guest/HomeBuaTRua';
import HomeToi from '../components_guest/HomeBuaToi';
import HomeLogin from '../components_login/home/HomeLogin';
import CartSang from '../components_login/CartSang';
import HeaderSang from '../components_login/HeaderSang';
import HomeSangLogin from '../components_login/HomeBuaSang';
import CartTrua from '../components_login/CartTrua';
import HeaderTrua from '../components_login/HeaderTrua';
import HomeTruaLogin from '../components_login/HomeBuaTRua';
import CartToi from '../components_login/CartToi';
import HeaderToi from '../components_login/HeaderToi';
import HomeToiLogin from '../components_login/HomeBuaToi';
import CartCom from '../components_login/Cartcom';
import HeaderCom from '../components_login/Headercom';
import HomeComLogin from '../components_login/HomeCom';
import Cartkfc from '../components_login/Cartkfc';
import Headerkfc from '../components_login/Headerkfc'
import HomekfcLogin from '../components_login/Homekfc';
import CartSushi from '../components_login/Cartsushi';
import HeaderSushi from '../components_login/Headersushi';
import HomeSushiLogin from '../components_login/homeSushi';
import CartBun from '../components_login/Cartbun';
import HeaderBun from '../components_login/Headerbun';
import HomeBunLogin from '../components_login/HomeBun';
import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
import Order from '../components_cart/Order';

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


            <Route path='/com'>
                <HomeCom />
            </Route>
            <Route path='/kfc'>
                <Homekfc />
            </Route>
            <Route path='/sushi'>
                <HomeSushi />
            </Route>
            <Route path='/bun'>
                <HomeBun />
            </Route>
            <Route path='/sang'>
                <HomeSang />
            </Route>
            <Route path='/trua'>
                <HomeTrua />
            </Route>
            <Route path='/toi'>
                <HomeToi />
            </Route>

            {/* /////////////////////////////////////// */}
            <Route path='/home' >
                <Header />
                <HomeLogin />
            </Route>
            <Route path='/cart' >
                <Header />
                <Home />
            </Route>
            <Route path='/carts'>
                <Header />
                <Cart />
            </Route>
            <Route path='/order'>
                <Order />
            </Route>
            <Route path='/log/com'>
                <HeaderCom />
                <HomeComLogin />
            </Route>
            <Route path='/log/kfc'>
                <Headerkfc />
                <HomekfcLogin />
            </Route>
            <Route path='/log/sushi'>
                <HeaderSushi />
                <HomeSushiLogin />
            </Route>
            <Route path='/log/bun'>
                <HeaderBun />
                <HomeBunLogin />
            </Route>
            <Route path='/log/sang'>
                <HeaderSang />
                <HomeSangLogin />
            </Route>
            <Route path='/log/trua'>
                <HeaderTrua />
                <HomeTruaLogin />
            </Route>
            <Route path='/log/toi'>
                <HeaderToi />
                <HomeToiLogin />
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

