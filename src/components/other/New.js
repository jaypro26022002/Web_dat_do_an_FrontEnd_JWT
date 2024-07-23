import './New.scss';
import { Navbar } from 'react-bootstrap';
import logo from '../home/img/icon.gif';
import React, { useState, useEffect } from 'react';


const New = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [showScroll]);

    return (
        <div className="new">
            <div className="header d-none d-sm-block">
                <div className='container'>
                    <div className='row'>
                        <h1 className="tin font-1 col">Tin</h1>
                        <div className="new-banner col">
                            <img src={require('../home/img/new.jpg').default} alt="icon-1" style={{ width: '800px', height: '350px' }} />
                        </div>
                        <h1 className="tuc font-1 col">Tức</h1>
                    </div>
                </div>
            </div>

            <div className="header d-sm-none d-block">
                <h1 className="tin font-1">Tin Tức</h1>
            </div>

            <div className="center">
                <main>
                    <section className="recipe">
                        <img src={require('../home/img/goi-xoai-tom-kho-.jpg').default} alt="" />
                        <h2 className='font-new-3'>Cách làm gỏi xoài tôm khô cho cả nhà ăn ngon miệng</h2>
                        <p className="font-2">Món gỏi xoài tôm khô chua ngọt, thanh mát là món ăn khoái khẩu của nhiều người. Xoài giòn ngọt, tôm khô dai dai quyện cùng nước sốt đậm đà tạo nên hương vị khó cưỡng.</p>
                    </section>
                    <section className="recipe">
                        <img src={require('../home/img/che-bach-qua.png').default} alt="icon-1" />
                        <h2>Cách làm chè bạch quả hạt sen thanh nhiệt, tốt cho sức khỏe</h2>
                        <p className="font-2">Món chè bạch quả hạt sen thanh nhiệt, tốt cho sức khỏe là món ăn được nhiều người yêu thích. Bạch quả giòn sần sật, hạt sen bùi bùi quyện cùng nước chè ngọt thanh tạo nên hương vị khó quên.</p>
                    </section>
                    <section className="recipe">
                        <img src={require('../home/img/cach-lam-trung-cuon-han-quoc.png').default} alt="" />
                        <h2>Cách làm trứng cuộn Hàn Quốc đẹp mắt như trong phim</h2>
                        <p className="font-2">Món trứng cuộn Hàn Quốc mềm mịn, thơm ngon là món ăn sáng hoặc bữa xế hoàn hảo cho cả gia đình. Trứng cuộn với nhiều nhân đa dạng như phô mai, thanh cua, rau củ... tạo nên hương vị phong phú.</p>
                    </section>
                </main>
            </div>

            <div className="center-2 d-none d-sm-block">
                <main>
                    <div className="container">
                        <section className="ads">
                            <div className='row'>
                                <div className="ad">
                                    <img className="img-ads col-2" src={require('../home/img/monhue.png').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khởi đầu mới cho các thánh ăn </b></h3>
                                    <p className="font-2 col">Bước qua tháng 8, Uncle V tiếp tục đồng hành và chiêu đãi các tín đồ ẩm thực không chỉ là những món ăn thơm ngon hợp với không khí mùa hè mà còn là những chương trình ưu đãi vô cùng hấp dẫn.</p>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads col" src={require('../home/img/banh-mi-mat-ong-1.png').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khuyến mãi tháng 7 cho người đam mê đồ ngọt!!</b></h3>
                                    <ul className="font-2 col-3">
                                        <li><p className="">COMBO 95K: Bánh mì nướng mật ong + Trà đào cam sả</p></li>
                                        <li><p>COMBO 139K: Bánh mì nướng mật ong + Trà sữa trân châu đường đen</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads col" src={require('../home/img/giovanggiamgiacaphe.jpg').default} alt="" style={{ width: "380px", height: '250px' }} />
                                    <h3><b className="title-ad px-4 font-1 col">Chương trình ưu đãi khuyến mãi lớn tại Coffee 88!!</b></h3>
                                    <ul className="font-2 col-3">
                                        <li><p className="">Mỗi Thứ Sáu, đúng khung giờ vàng "17h" sẽ khuyến mãi các loại cafe đồng giá 19k.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads col" src={require('../home/img/dacsanDongQue.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Đặc sản quê hương tại Quán Xưa:!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Giới thiệu đồ ăn mới: Bánh xèo thập cẩm với tôm, thịt heo và nấm linh chi, chấm sốt đặc biệt.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads col" src={require('../home/img/DoanChay.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Xu hướng ẩm thực thế giới đang phổ biến tại Việt Nam:</b></h3>
                                    <ul className="font-2 col-3">
                                        <li><p className="">Đồ ăn vegan và gluten-free đang ngày càng được ưa chuộng, với nhiều nhà hàng và quán ăn chuyên biệt mở ra để đáp ứng nhu cầu của khách hàng.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads col" src={require('../home/img/amthucNamBo.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khám phá văn hóa ẩm thực của miền Tây Nam Bộ!</b></h3>
                                    <ul className="font-2 col-3">
                                        <li><p className="">Miền Tây Nam Bộ đang thu hút sự chú ý của nhiều người yêu thích ẩm thực với các món nhậu đặc sản như lẩu cá kèo, cơm tấm Sài Gòn, và đặc sản trái cây tươi ngon.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                                <hr />
                                <div className="ad pt-4">
                                    <img className="img-ads" src={require('../home/img/5014-may-lam-soda.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1">Thị trường đồ ăn nhanh mùa hè năm nay!</b></h3>
                                    <ul className="font-2">
                                        <li><p className="">Mùa hè năm nay chứng kiến sự xuất hiện của nhiều món ăn vặt mới như:</p></li>
                                        <li><p className="">bánh mì que chiên giòn, kem bạc hà và nhiều loại nước ép trái cây tự nhiên.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            <div className="center-3 d-sm-none d-block">
                <main>
                    <div className="container">
                        <section className="ads">
                            <div className="ad">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/monhue.png').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khởi đầu mới cho các thánh ăn </b></h3>
                                    <p className="font-2 col">Bước qua tháng 8, Uncle V tiếp tục đồng hành và chiêu đãi các tín đồ ẩm thực không chỉ là những món ăn thơm ngon hợp với không khí mùa hè mà còn là những chương trình ưu đãi vô cùng hấp dẫn.</p>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/banh-mi-mat-ong-1.png').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khuyến mãi tháng 7 cho người đam mê đồ ngọt!!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">COMBO 95K: Bánh mì nướng mật ong + Trà đào cam sả</p></li>
                                        <li><p>COMBO 139K: Bánh mì nướng mật ong + Trà sữa trân châu đường đen</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/giovanggiamgiacaphe.jpg').default} alt="" style={{ width: "380px", height: '250px' }} />
                                    <h3><b className="title-ad px-4 font-1 col">Chương trình ưu đãi khuyến mãi lớn tại Coffee 88!!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Mỗi Thứ Sáu, đúng khung giờ vàng "17h" sẽ khuyến mãi các loại cafe đồng giá 19k.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/dacsanDongQue.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Đặc sản quê hương tại Quán Xưa:!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Giới thiệu đồ ăn mới: Bánh xèo thập cẩm với tôm, thịt heo và nấm linh chi, chấm sốt đặc biệt.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/DoanChay.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Xu hướng ẩm thực thế giới đang phổ biến tại Việt Nam:</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Đồ ăn vegan và gluten-free đang ngày càng được ưa chuộng, với nhiều nhà hàng và quán ăn chuyên biệt mở ra để đáp ứng nhu cầu của khách hàng.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/amthucNamBo.jpg').default} alt="" />
                                    <h3><b className="title-ad px-4 font-1 col">Khám phá văn hóa ẩm thực của miền Tây Nam Bộ!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Miền Tây Nam Bộ đang thu hút sự chú ý của nhiều người yêu thích ẩm thực với các món nhậu đặc sản như lẩu cá kèo, cơm tấm Sài Gòn, và đặc sản trái cây tươi ngon.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                            <hr />
                            <div className="ad pt-4">
                                <div className='row'>
                                    <img className="img-ads col" src={require('../home/img/5014-may-lam-soda.jpg').default} alt="" />
                                    <h3><b className="title-ad pt-4 font-1 col">Thị trường đồ ăn nhanh mùa hè năm nay!</b></h3>
                                    <ul className="font-2 col">
                                        <li><p className="">Mùa hè năm nay chứng kiến sự xuất hiện của nhiều món ăn vặt mới như:</p></li>
                                        <li><p className="">bánh mì que chiên giòn, kem bạc hà và nhiều loại nước ép trái cây tự nhiên.</p></li>
                                    </ul>
                                    <a className="ad-a fonts-2" href="/cart">Xem</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div >

            <div className="footer">
                <footer className='footer bg-dark text-white'>
                    <div className='container p-4 pb-0'>
                        <section className='mb-4 text-center'>
                            <a className='a1 btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-facebook'></i>
                            </a>

                            <a className='a2 btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-twitter'></i>
                            </a>

                            <a className='a3 btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-google'></i>
                            </a>

                            <a className='a4 btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-instagram'></i>
                            </a>

                            <a className='a5 btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-github'></i>
                            </a>
                        </section>

                        <div className='footer-infor font-2'>
                            <div className='title'>
                                <Navbar.Brand href="/">
                                    <img
                                        src={logo}
                                        width='100'
                                        height='100'
                                        className='d-inline-block align-top'
                                    />
                                    <span href='/' className='brand-name'></span>
                                </Navbar.Brand>
                            </div>
                            <ul className="nav-links">
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="/">Giới thiệu về chúng tôi</a></li>
                                <li><a href="login">Trở thành khách hàng của chúng tôi</a></li>
                                <li><a href="/new">Tin tức</a></li>
                            </ul>
                            <ul className="nav-links">
                                <li><i className="fa fa-phone-square" aria-hidden="true"></i><span> Số điện thoại: 0901234567</span></li>
                                <li><i className="fa fa-map-marker" aria-hidden="true"></i><span> Địa chỉ : 67/8 Nguyễn Thái hà phường 5 quận 9, Hồ Chí Minh</span></li>
                                <li><i className="fa fa-envelope-o" aria-hidden="true"></i><span> Email: uncleV@gmal.com</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2024 Uncle V:
                        <span className='text-white'>
                            Your Welcome
                        </span>
                    </div>
                </footer>
                <div className={`scroll-to-top ${showScroll ? 'show' : ''}`} onClick={scrollTop}>
                    <i className="fa fa-arrow-up"></i>
                </div>
            </div>
        </div >

    )
}

export default New;
