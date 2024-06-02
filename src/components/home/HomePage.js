import './HomePage.scss'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Img, Icon, Food } from '../../img/Img';

const HomePage = (props) => {
    let history = useHistory();

    useEffect(() => {
        // Clear session storage when navigating to the homepage
        sessionStorage.removeItem('account');
    }, []);
    return (
        <div className='homepage-container'>
            <div className='banner-top'>
                <Img alt="imgttop" />
                <div className='banner-content'>
                    <h2>Chào mừng đến với</h2>
                    <h1>UNCLE V</h1>
                    <span>The best Japanese cuisine restaurant in Washington, DC
                        Book online or call (555) 123-4567</span>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='center col-12'>
                        <div className='brand-1'><Icon alt2='iconBrand' />This is the heading</div>
                        <div className='brand-2'><Icon alt2='iconBrand' />This is the heading</div>
                        <div className='brand-3'><Icon alt2='iconBrand' />This is the heading</div>
                        <div className='brand-4'><Icon alt2='iconBrand' />This is the heading</div>
                    </div>

                    {/* <footer>
                        <div classname="container">
                            <div classname="row footer">
                                <div classname="col-3">
                                    <h3>Về chúng tôi</h3>
                                    <ul classname="menu_footer">
                                        <ul><a href="/gioithieu.ejs">Giới thiệu</a></ul>
                                        <ul><a href="/chuongtrinhhoc">Chương trình học</a></ul>
                                        <ul><a href="/tuyensinh.ejs">Tuyển sinh</a></ul>
                                        <ul><a href="/tintuc">Tin tức</a></ul>
                                        <ul><a href="/lienhe">Liên hệ</a></ul>
                                    </ul>
                                </div>
                                <div classname="col-3">
                                    <h3>Liên hệ với chúng tôi</h3>
                                    <ul classname="menu_footer">
                                        <ul><a href="#" classname="fa fa-map-marker"> Số 1 Hồ Thị Kỷ, P1, Q10, TPHCM</a></ul>
                                        <ul><a href="#" classname="fa fa-address-book"> 1800 0000</a></ul>
                                        <ul><a href="#" classname="fa fa-envelope"> littlestar@gmail.com</a></ul>
                                        <ul><a href="#" classname="fa fa-clock-o"> 8:00 - 17:00</a></ul>
                                    </ul >
                                </div >
                            </div >
                        </div >
                    </footer > */}
                </div >
            </div >
            <div className='meal col-12'>
                <div className='meal-1 col-3'><Food alt3='food' /><span>DINNER</span></div>
                <div className='meal-3 col-3'><Food alt3='food' /><span>DESSERT</span></div>
                <div className='meal-2 col-3'><Food alt3='food' /><span>LUNCHES</span></div>
                <div className='meal-4 col-3'><Food alt3='food' /><span>DRINK</span></div>
            </div>
            <div className='feedback'>
                <div className='title-feedback'>
                    <h1>What people are saying about our restaurant</h1>
                    <span>Anyone, who visits our place leaves us well fed and in a great mood!</span>
                </div>
                <div className='member-feedback'>
                    <div className='feed1'>
                        <h2>Phản hồi tích cực:</h2>
                        <span>"Tôi rất hài lòng với dịch vụ đặt đồ ăn của nhà hàng. Quá trình đặt hàng thông qua ứng dụng di động rất thuận tiện và nhanh chóng. Đồ ăn được giao đúng hẹn và vẫn nóng hổi khi nhận. Đặc biệt, tôi rất ấn tượng với chất lượng của món ăn. Sẽ tiếp tục ủng hộ nhà hàng trong tương lai."
                        </span>
                    </div>
                    <div className='feed2'>
                        <h2>Phản hồi trung tính:</h2>
                        <span>"Quá trình đặt đồ ăn của nhà hàng khá thuận tiện, nhưng thời gian giao hàng có thể cải thiện hơn. Một số lần đồ ăn được giao đến trễ hơn so với thời gian dự kiến. Tuy nhiên, chất lượng của món ăn vẫn rất tốt và đáng giá với số tiền bạn bỏ ra."

                        </span>
                    </div>
                    <div className='feed3'>
                        <h2>Phản hồi tiêu cực:</h2>
                        <span>"Tôi không hài lòng với dịch vụ đặt đồ ăn của nhà hàng. Mặc dù quá trình đặt hàng qua ứng dụng di động khá dễ dàng, nhưng đồ ăn thường đến muộn và đôi khi không đúng đơn đặt hàng. Ngoài ra, chất lượng của món ăn cũng không đạt được sự mong đợi. Hy vọng nhà hàng sẽ cải thiện dịch vụ của mình trong tương lai."</span>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container">
                    <div className="row footer">
                        <div className="col-3">
                            <h3>Về chúng tôi</h3>
                            <ul className="menu_footer">
                                <li><a href="/gioithieu.ejs">Giới thiệu</a></li>
                                <li><a href="/chuongtrinhhoc">Chương trình học</a></li>
                                <li><a href="/tuyensinh.ejs">Tuyển sinh</a></li>
                                <li><a href="/tintuc">Tin tức</a></li>
                                <li><a href="/lienhe">Liên hệ</a></li>
                            </ul>
                        </div>
                        <div className="col-3">
                            <h3>Liên hệ với chúng tôi</h3>
                            <ul className="menu_footer">
                                <li><a href="#" className=""> 6087 Richmond hwy, Alexandria, VA</a></li>
                                <li><a href="#" className=""> 123456789</a></li>
                                <li><a href="#" className=""> Uncle V@gmail.com</a></li>
                                <li><a href="#" className=""> 8:00 - 17:00</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </div >
    )
}



export default HomePage;