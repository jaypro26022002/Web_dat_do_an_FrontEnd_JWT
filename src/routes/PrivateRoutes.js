import { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";


const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext);

    // hàm kiểm tra nếu vào trang bất kì mà chưa có đăng nhập bên login sẽ bị đẩy ra login
    if (user && user.isAuthenticated === true) {

        return (
            <>
                {/* Khi người dùng truy cập đường dẫn "/user", thì components user sẽ được render. */}
                <Route path={props.path} component={props.component} />
            </>
        )
    } else {
        return <Redirect to='/login'></Redirect>
    }
}


export default PrivateRoutes;