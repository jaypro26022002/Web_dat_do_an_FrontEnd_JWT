import { useEffect, } from "react";
import {
    Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = (props) => {
    let history = useHistory();

    // hàm kiểm tra nếu vào trang bất kì mà chưa có đăng nhập bên login sẽ bị đẩy ra login
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
            window.location.reload();
        }
        if (session) {
            //check role
        }
    }, []);

    return (
        <>
            {/* Khi người dùng truy cập đường dẫn "/user", thì components user sẽ được render. */}
            <Route path={props.path} component={props.component}></Route>
        </>
    )
}


export default PrivateRoutes;