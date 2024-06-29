import './HomePage.scss'
import { CartState } from '../../context_cart/Context';
import SingleProductPage from '../home/SingleProductPage';
import { Link } from 'react-router-dom';


const HomePage = ({ prod }) => {
    const { state: { products } } = CartState();

    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <div className="header_banner col-12">
                    </div>
                </div>
                <div className='container'>
                    <div className="main">
                        <div className="band pt-4">
                            <div className="band1">
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-1.jpg').default} alt="icon-1" /><p>2015</p>
                                </div>
                            </div>
                            <div className='band2'>
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-2.webp').default} alt="icon-1" /><p>2016</p>
                                </div>
                            </div>
                            <div className="band3">
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-3.webp').default} alt="icon-1" /><p>2017</p>
                                </div>
                            </div>
                            <div className='band4'>
                                <div className="band_icon col-3">
                                    <img src={require('./img/icon-4.webp').default} alt="icon-1" /><p>2018</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='title-dishes pt-4'>
                    <h1>Hãy chọn thời điểm bạn muốn ăn !</h1>
                </div>
                <div className="container pt-4">
                    <div className="section1 col-lg-4 fl bx">
                        <Link to="/sang">Bữa sáng</Link>
                        <img src={require('./img/buasang.jpg')} />
                    </div>
                    <div className="section2 col-lg-4 fl bx">
                        <Link to="/trua">Bữa trưa</Link>
                        <img src={require('./img/buasang.jpg')} />
                    </div>
                    <div className="section3 col-lg-4 fl bx">
                        <Link to="/toi">Bữa tối</Link>
                        <img src={require('./img/buasang.jpg')} />
                    </div>
                </div>

                <div className='container'>

                    <div className='title-shop pt-4'>
                        <h1>Cửa hàng phổ biến: </h1>
                    </div>
                    <div className='container'>
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
                    </div>
                </div>
                <div className='title-product'>
                    <h1>Menu:</h1>
                </div>
                <div className="home mt-4">
                    <div className="productContainer">
                        {products.map((prod) => {
                            return <SingleProductPage prod={prod} key={prod.id_product} />
                        })}
                    </div>
                </div>
            </div >
            <div className="footer">
                <footer className='footer bg-dark text-center text-white'>
                    <div className='container p-4 pb-0'>
                        <section className='mb-4'>
                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-facebook'></i>
                            </a>

                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-twitter'></i>
                            </a>

                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-google'></i>
                            </a>

                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-instagram'></i>
                            </a>

                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-paypal'></i>
                            </a>

                            <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                                <i className='fa fa-github'></i>
                            </a>
                        </section>
                    </div>

                    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2024 Uncle V:
                        <span className='text-white'>
                            Your Welcome
                        </span>
                    </div>
                </footer>

            </div>
        </>
    );
}
export default HomePage;