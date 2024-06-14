import './HomePage.scss'
import { CartState } from '../../context_cart/Context';
import SingleProduct from '../home/SingleProductPage';

const HomePage = ({ prod }) => {
    const { state: { products } } = CartState();

    return (
        <>
            <div className="home-container">
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
                <div className="main">
                    <div className="band">
                        <div className="band1">
                            <div className="band_icon col-3">
                                <img src="./img/icon-1.webp" alt="" /><p>This is the heading 2016</p>
                            </div>
                        </div>
                        <div className='band2'>
                            <div className="band_icon col-3">
                                <img src="./img/icon-2.webp" alt="" /><p>This is the heading 2016</p>
                            </div>
                        </div>
                        <div className="band3">
                            <div className="band_icon col-3">
                                <img src="./img/icon-3.webp" alt="" /><p>This is the heading 2016</p>
                            </div>
                        </div>
                        <div className='band4'>
                            <div className="band_icon col-3">
                                <img src="./img/icon-4.webp" alt="" /><p>This is the heading 2016</p>
                            </div>
                        </div>
                    </div>
                    <div className="section_main">
                        <div className="section1 col-3">
                            <a href="">Bữa sáng</a>
                        </div>
                        <div className="section2 col-3">
                            <a href="">Bữa trưa</a>
                        </div>
                        <div className="section3 col-3">
                            <a href="">Bữa tối</a>
                        </div>
                    </div>
                    <div className='shop'>
                        <h1>Cửa hàng phổ biến: </h1>
                        <div className="section_main">
                            <div className="section1 col-3">
                                <a href=""></a>
                            </div>
                            <div className="section2 col-3">
                                <a href="">Bữa trưa</a>
                            </div>
                            <div className="section3 col-3">
                                <a href="">Bữa tối</a>
                            </div>
                            <div className="section3 col-3">
                                <a href="">Bữa tối</a>
                            </div>
                        </div>
                    </div>
                    <div className="home">
                        <div className="productContainer">
                            {products.map((prod) => {
                                return <SingleProduct prod={prod} key={prod.id_product} />
                            })}
                        </div>
                    </div>
                </div >


                <div className="footer"></div>
            </div >
        </>
    );
}
export default HomePage;