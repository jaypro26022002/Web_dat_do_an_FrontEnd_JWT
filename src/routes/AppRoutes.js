import Login from '../components/Login/Login';
import User from '../components/ManagerUser/user';
import Register from '../components/Register/Register';
import HomePage from '../components/home/HomePage';
import Product from '../components/pagesAdmin/Product';
import Cart from '../components_cart/Cart';
import Home from '../components_cart/Home';
import Header from '../components_cart/Header';
import Shop from '../components/pagesAdmin/shop';
import Contact from '../components/other/Contact';
import Chekorder from '../components/pagesAdmin/checkorder';
import New from '../components/other/New';
import UserOrder from '../components/other/Userorder';
import ContactLogin from '../components/other/ContactLogin';

import Homekfc from '../components_guest/Homekfc';
import HomeCom from '../components_guest/HomeCom';
import HomeSushi from '../components_guest/homeSushi';
import HomeBun from '../components_guest/HomeBun';
import HomeSang from '../components_guest/HomeBuaSang';
import HomeTrua from '../components_guest/HomeBuaTRua';
import HomeToi from '../components_guest/HomeBuaToi';
import HomeLogin from '../components_login/home/HomeLogin';

import CartSang from '../components_login/CartSang';
import OrderSang from '../components_login/OrderSang';
import HeaderSang from '../components_login/HeaderSang';
import HomeSangLogin from '../components_login/HomeBuaSang';

import CartTrua from '../components_login/CartTrua';
import OrderTrua from '../components_login/OrderTrua';
import HeaderTrua from '../components_login/HeaderTrua';
import HomeTruaLogin from '../components_login/HomeBuaTRua';

import CartToi from '../components_login/CartToi';
import OrderToi from '../components_login/OrderToi';
import HeaderToi from '../components_login/HeaderToi';
import HomeToiLogin from '../components_login/HomeBuaToi';

import CartCom from '../components_login/Cartcom';
import OrderCom from '../components_login/OrderCom';
import HeaderCom from '../components_login/Headercom';
import HomeComLogin from '../components_login/HomeCom';

import Cartkfc from '../components_login/Cartkfc';
import Orderkfc from '../components_login/Orderkfc';
import Headerkfc from '../components_login/Headerkfc'
import HomekfcLogin from '../components_login/Homekfc';

import CartSushi from '../components_login/Cartsushi';
import OrderSushi from '../components_login/OrderSushi';
import HeaderSushi from '../components_login/Headersushi';
import HomeSushiLogin from '../components_login/homeSushi';

import CartBun from '../components_login/Cartbun';
import OrderBun from '../components_login/OrderBun';
import HeaderBun from '../components_login/Headerbun';
import HomeBunLogin from '../components_login/HomeBun';

import NavWebLogin from '../components/Navigation/NavWebLogin';
import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
import Order from '../components_cart/Order';

import Checkorder from '../components/pagesAdmin/checkorder';
import MyBill from '../components/other/MyBill';
import Feedback from '../components/pagesAdmin/feedback';
import Doanhthu from '../components/pagesAdmin/doanhthu';

const AppRoutes = (props) => {
    return (
        <Switch>
            {/* PrivateRoutes sẽ check quyền nếu không có tài khoản sẽ đẩy về trang /login */}
            {/* page Admin */}
            <PrivateRoutes path='/user' component={User} />
            <PrivateRoutes path='/product' component={Product} />
            <PrivateRoutes path='/shop' component={Shop} />
            <PrivateRoutes path='/checkorder' component={Checkorder} />
            <PrivateRoutes path='/doanhthu' component={Doanhthu} />
            <PrivateRoutes path='/feedback' component={Feedback} />

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
            <Route path='/feedback'>
                <Feedback />
            </Route>
            <Route path='/checkorder'>
                <Checkorder />
            </Route>
            <Route path='/doanhthu'>
                <Doanhthu />
            </Route>
            {/* ================================================ */}
            {/* page main */}
            <Route path='/contact'>
                <Contact />
            </Route>
            <Route path='/new'>
                <New />
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



            {/* ============================================== */}
            {/* page LOgin */}
            <PrivateRoutes path='/userorder' component={UserOrder} />
            <PrivateRoutes path='/checkbill' component={MyBill} />
            <PrivateRoutes path='/log/new' component={New} />
            <PrivateRoutes path='/log/Contact' component={ContactLogin} />
            <PrivateRoutes path='/home' component={HomeLogin} />

            <PrivateRoutes path='/cart' component={Home} />
            <PrivateRoutes path='/carts' component={Cart} />
            <PrivateRoutes path='/order' component={Order} />

            <PrivateRoutes path='/log/com' component={HomeComLogin} />
            <PrivateRoutes path='/Comcarts' component={CartCom} />
            <PrivateRoutes path='/Comorder' component={OrderCom} />

            <PrivateRoutes path='/log/kfc' component={HomekfcLogin} />
            <PrivateRoutes path='Kfccarts' component={Cartkfc} />
            <PrivateRoutes path='Kfcorder' component={Orderkfc} />

            <PrivateRoutes path='/log/sushi' component={HomeSushiLogin} />
            <PrivateRoutes path='Sushicarts' component={CartSushi} />
            <PrivateRoutes path='/Sushiorder' component={OrderSushi} />

            <PrivateRoutes path='/log/bun' component={HomeBunLogin} />
            <PrivateRoutes path='/Buncarts' component={CartBun} />
            <PrivateRoutes path='/Bunorder' component={OrderBun} />

            <PrivateRoutes path='/log/sang' component={HomeSangLogin} />
            <PrivateRoutes path='/Sangcarts' component={CartSang} />
            <PrivateRoutes path='/Sangorder' component={OrderSang} />

            <PrivateRoutes path='/log/trua' component={HomeTruaLogin} />
            <PrivateRoutes path='/Truacarts' component={CartTrua} />
            <PrivateRoutes path='/Truaorder' component={OrderTrua} />

            <PrivateRoutes path='/log/toi' component={HomeToiLogin} />
            <PrivateRoutes path='/Toicarts' component={CartToi} />
            <PrivateRoutes path='/Toiorder' component={OrderToi} />

            {/* lich sử order */}
            <Route path='/userorder'>
                <UserOrder />
            </Route>
            {/* Bill thanh toán */}
            <Route path='/checkbill'>
                <NavWebLogin />
                <MyBill />
            </Route>
            {/* tin tức */}
            <Route path='/log/new'>
                <New />
            </Route>
            {/* Phản hồi */}
            <Route path='/log/Contact'>
                <ContactLogin />
            </Route>
            {/* trang chủ */}
            <Route path='/home' >
                <HomeLogin />
            </Route>
            {/* Trang sự kiện */}
            <Route path='/cart' >
                <Home />
            </Route>
            {/* Giỏ hàng */}
            <Route path='/carts'>
                <Cart />
            </Route>
            {/* thanh toán đơn hàng */}
            <Route path='/order'>
                <Order />
            </Route>
            {/* com */}
            <Route path='/log/com'>
                <HomeComLogin />
            </Route>
            <Route path='/Comcarts'>
                <CartCom />
            </Route>
            <Route path='/Comorder'>
                <OrderCom />
            </Route>
            {/*kfc  */}
            <Route path='/log/kfc'>
                <HomekfcLogin />
            </Route>
            <Route path='/Kfccarts'>
                <Cartkfc />
            </Route>
            <Route path='/Kfcorder'>
                <Orderkfc />
            </Route>
            {/* sushi */}
            <Route path='/log/sushi'>
                <HomeSushiLogin />
            </Route>
            <Route path='/Sushicarts'>
                <CartSushi />
            </Route>
            <Route path='/Sushiorder'>
                <OrderSushi />
            </Route>
            {/* bun */}
            <Route path='/log/bun'>
                <HomeBunLogin />
            </Route>
            <Route path='/Buncarts'>
                <CartBun />
            </Route>
            <Route path='/Bunorder'>
                <OrderBun />
            </Route>
            {/* sang */}
            <Route path='/log/sang'>
                <HomeSangLogin />
            </Route>
            <Route path='/Sangcarts'>
                <CartSang />
            </Route>
            <Route path='/Sangorder'>
                <OrderSang />
            </Route>
            {/* trua */}
            <Route path='/log/trua'>
                <HomeTruaLogin />
            </Route>
            <Route path='/Truacarts'>
                <CartTrua />
            </Route>
            <Route path='/Truaorder'>
                <OrderTrua />
            </Route>
            {/* toi */}
            <Route path='/log/toi'>
                <HomeToiLogin />
            </Route>
            <Route path='/Toicarts'>
                <CartToi />
            </Route>
            <Route path='/Toiorder'>
                <OrderToi />
            </Route>

            {/* end */}
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

