import './HomeLogin.scss'
import { CartState } from '../../context_cart/Context';
import SingleProductLogin from './SingleProductLogin';
import { Link } from 'react-router-dom';

const HomeLogin = ({ prod }) => {
    const { state: { products } } = CartState();

    return (
        <>
            <div className="homelogin-container">
                <div className="header-container">
                    <div className="header_banner col-12">
                        {/* <div className="title_banner">
                            <h1>Welcome to the</h1>
                            <h1>TANAKA RESTAURANT</h1>
                            <h1>The best Japanese cuisine restaurant in Washington, DC</h1>
                            <h1>Book online or call <a href="tel:+84931843274">(84+)0931-843274</a></h1>
                            <button className="button_banner">BOOK ONLINE</button>
                        </div> */}
                    </div>
                </div>
                <div className='container'>
                    <div className="main">
                        <div className="band pt-4">
                            <div className="band1">
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-1.jpg').default} alt="icon-1" /><p>This is the heading 2015</p>
                                </div>
                            </div>
                            <div className='band2'>
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-2.webp').default} alt="icon-1" /><p>This is the heading 2016</p>
                                </div>
                            </div>
                            <div className="band3">
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-3.webp').default} alt="icon-1" /><p>This is the heading 2017</p>
                                </div>
                            </div>
                            <div className='band4'>
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-4.webp').default} alt="icon-1" /><p>This is the heading 2018</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='title-dishes pt-4'>
                    <h1>Hãy chọn thời điểm bạn muốn ăn !</h1>
                </div>
                <div className="section_main pt-4">
                    <div className="section1 col-3">
                        <Link to="/log/sang">Bữa sáng</Link>
                    </div>
                    <div className="section2 col-3">
                        <Link to="/log/trua">Bữa trưa</Link>
                    </div>
                    <div className="section3 col-3">
                        <Link to="/log/toi">Bữa tối</Link>
                    </div>
                </div>
                <div className='container'>

                    <div className='title-shop pt-4'>
                        <h1>Cửa hàng phổ biến: </h1>
                    </div>
                    {/* <div className='container'>
                        <div className='shop pb-4 pt-4'>
                            <div className="section_shop">
                                <div className="shop1 col-3">
                                    <Link to="/com">Cô Ba</Link>
                                </div>
                                <div className="shop2 col-3">
                                    <Link to="/kfc">KFC</Link>
                                </div>
                                <div className="shop3 col-3">
                                    <Link to="/sushi">Góc Phố</Link>
                                </div>
                                <div className="shop4 col-3">
                                    <Link to="/bun">Nhớ</Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='container'>
                        <div className='shop pb-4 pt-4'>
                            <div className="section_shop">
                                <div className="shop1 col-3">
                                    <Link to="/log/com">
                                        <span>Cô Ba</span>
                                    </Link>
                                </div>
                                <div className="shop2 col-3">
                                    <Link to="/log/kfc">
                                        <span>KFC</span>
                                    </Link>
                                </div>
                                <div className="shop3 col-3">
                                    <Link to="/log/sushi">
                                        <span>Góc Phố</span>
                                    </Link>
                                </div>
                                <div className="shop4 col-3">
                                    <Link to="/log/bun">
                                        <span>Nhớ</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='title-product'>
                    <h1>Mục lục đồ ăn:</h1>
                </div>
                <div className="home mt-4">
                    <div className="productContainer">
                        {products.map((prod) => {
                            return <SingleProductLogin prod={prod} key={prod.id_product} />
                        })}
                    </div>
                </div>
            </div >
            <div className="footer"></div>
        </>
    );
}
export default HomeLogin;