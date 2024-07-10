import './HomePage.scss'
import { CartState } from '../../context_cart/Context';
import SingleProductPage from '../home/SingleProductPage';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../home/img/icon.gif';
import React, { useState, useEffect } from 'react';

const HomePage = ({ prod }) => {
    const { state: { products } } = CartState();
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
        <>
            <div className="home-container">
                <div className="header-container">
                    <div className="header_banner col-12">
                    </div>
                </div>
                <div className='container'>
                    <div className="main">
                        <div className="band-home pt-4">
                            <div className="band1 font-2">
                                <img src={require('./img/icon-1.jpg').default} alt="icon-1" style={{ width: '150px', height: '150px' }} />
                                <p>2015</p>
                            </div>
                            <div className='band2 font-2'>
                                <img src={require('./img/icon-2.webp').default} alt="icon-1" style={{ width: '150px', height: '150px' }} />
                                <p>2016</p>
                            </div>
                            <div className="band3 font-2">
                                <img src={require('./img/icon-3.webp').default} alt="icon-1" style={{ width: '150px', height: '150px' }} />
                                <p>2017</p>
                            </div>
                            <div className='band4 font-2'>
                                <img src={require('./img/icon-4.webp').default} alt="icon-1" style={{ width: '150px', height: '150px' }} />
                                <p>2018</p>
                            </div>
                        </div>
                    </div>

                    <div className='title-dishe pt-4 font-1'>
                        <h1>Hãy chọn thời điểm bạn muốn ăn !</h1>
                    </div>
                    <div className="bua-an pt-4">
                        <Link to="/sang">
                            <div className="section1 col-lg-4 fl bx" />
                        </Link>
                        <Link to="/trua">
                            <div className="section2 col-lg-4 fl bx" />
                        </Link>
                        <Link to="/toi">
                            <div className="section3 col-lg-4 fl bx" />
                        </Link>
                    </div>

                    <div className='title-shop pt-4 clear font-1'>
                        <h1>Cửa hàng phổ biến: </h1>
                    </div>
                    <div className='shop pb-4 pt-4'>
                        <div className="section_shop">
                            <div className="shop1 col-3">
                                <Link to="/com">
                                    <span>Cô Ba</span>
                                </Link>
                            </div>
                            <div className="shop2 col-3">
                                <Link to="/kfc">
                                    <span>KFC</span>
                                </Link>
                            </div>
                            <div className="shop3 col-3">
                                <Link to="/sushi">
                                    <span>Góc Phố</span>
                                </Link>
                            </div>
                            <div className="shop4 col-3">
                                <Link to="/bun">
                                    <span>Nhớ</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='title-product pt-4 font-1'>
                        <h1>Menu:</h1>
                    </div>
                    <div className="home-product mt-4 ">
                        <div className="productContainer">
                            {products.map((prod) => {
                                return <SingleProductPage prod={prod} key={prod.id_product} />
                            })}
                        </div>
                    </div>

                    <div className='infor'>
                        <h1 className='title-1 pt-4 pb-4 font-1'>Một số thông tin về quán Uncle V !</h1>
                        <span className='font-2'>"Uncle V" là một chuỗi quán đặt thức ăn nhanh tại Việt Nam, nổi tiếng với các món ăn nhanh như bánh mì, phở, gỏi cuốn và nhiều món khác. Quán thường có không gian thoải mái, phục vụ nhanh và giá cả hợp lý, thu hút nhiều khách hàng đến từ các lứa tuổi khác nhau. Uncle V còn nổi tiếng với sự sáng tạo trong cách phục vụ và chất lượng đồ ăn, là một lựa chọn phổ biến cho những bữa ăn nhanh trong thời gian giãn cách xã hội.
                        </span>
                        <h1 className='title-2 pt-4 pb-4 font-1'>Các lợi ích khi đặt hàng tại đây</h1>
                        <ul className='font-2'>
                            <li><b>Nhanh chóng và tiện lợi:</b> Uncle V chuyên về thực phẩm nhanh, giúp khách hàng tiết kiệm thời gian khi cần một bữa ăn nhanh trong bối cảnh bận rộn.</li>
                            <li><b>Đa dạng lựa chọn:</b> Quán cung cấp nhiều loại món ăn từ bánh mì, phở, gỏi cuốn đến các món ăn vặt khác, đảm bảo sự đa dạng và phong phú trong thực đơn để khách hàng có thể lựa chọn.</li>
                            <li><b>Giá cả hợp lý:</b> Uncle V thường có mức giá phù hợp với đa số khách hàng, phù hợp với túi tiền và không gây áp lực tài chính lớn khi đến ăn.</li>
                            <li><b>Chất lượng đồ ăn:</b> Quán chú trọng đến chất lượng nguyên liệu và quá trình chế biến, mang đến cho khách hàng món ăn ngon và an toàn vệ sinh thực phẩm.</li>
                        </ul>
                    </div>
                </div >
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
                            <ul class="nav-links">
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="/">Giới thiệu về chúng tôi</a></li>
                                <li><a href="login">Trở thành khách hàng của chúng tôi</a></li>
                                <li><a href="/new">Tin tức</a></li>
                            </ul>
                            <ul class="nav-links">
                                <li><i class="fa fa-phone-square" aria-hidden="true"></i><span> Số điện thoại: 0901234567</span></li>
                                <li><i class="fa fa-map-marker" aria-hidden="true"></i><span> Địa chỉ : 67/8 Nguyễn Thái hà phường 5 quận 9, Hồ Chí Minh</span></li>
                                <li><i class="fa fa-envelope-o" aria-hidden="true"></i><span> Email: uncleV@gmal.com</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2024 Uncle V:
                        <span className='text-white'>
                            Your Welcome
                        </span>
                    </div>
                    <div className={`scroll-to-top ${showScroll ? 'show' : ''}`} onClick={scrollTop}>
                        <i className="fa fa-arrow-up"></i>
                    </div>
                </footer>
            </div>

        </>
    );
}
export default HomePage;