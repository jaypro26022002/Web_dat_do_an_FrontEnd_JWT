import React, { useEffect, useState } from 'react';
import { CartState } from "../context_home/Context Com";
import SingleProduct from './homeSingleProductCom';
import Filters from "../components_login/filter/FiltersCom";
import { fetchShop1, fetchComments } from "../services/cartService";
import './style.scss';
import { Navbar } from 'react-bootstrap';
import logo from '../components/home/img/icon.gif';
import HeaderCom from '../components_login/Headercom';

const HomeComLogin = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [shop, setShop] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      const data = await fetchShop1();
      setShop(data.DT[0]);  // Assuming data.DT is an array of shop details
    };

    const fetchShopComments = async () => {
      const data = await fetchComments(1); // Assuming shop ID is 1
      setComments(data.DT);
    };

    fetchShopDetails();
    fetchShopComments();
  }, []);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.quantity);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.nameProduct.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home-main">
      <HeaderCom />
      <div className='container'>
        <div className="container_shop ">
          <div className="image">
            <img src={`http://localhost:8081/image/${shop.thumbnail}`} style={{ width: '350px', height: '250px' }} alt="Shop Thumbnail" />
          </div>
          <div className="details">
            <h1 className='fonts-1'>{shop.nameShop}</h1>
            <div className='fonts-2'>{shop.address}</div>
            <div className="rating">⭐⭐⭐⭐⭐ 100+ đánh giá trên Uncle V</div>
            <div className="status fonts-2">Mở cửa {shop.timeWork}</div>
            <div className="price fonts-2">Có giá: {shop.price}</div>
            <div className="service-fee fonts-2">PHÍ DỊCH VỤ 0.0%</div>
            <div>DỊCH VỤ BỞI Uncle V</div>
          </div>
        </div>
      </div>
      <div className='gachngang'></div>

      <div className='home '>
        <Filters />
        <div className="productContainer">
          {transformProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod.id_product} />
          ))}
        </div>
      </div>

      <hr />
      <div className='container'>
        <h2>Đánh giá sản phẩm</h2>
        {comments.map(comment => (
          <div key={comment.id_contact} className="form-group pb-4">
            <label className='comment-fa'><i className="fa fa-user-circle-o" aria-hidden="true"></i> {comment.nameUser}</label>
            <br />
            <p className="form-control comment-description">{comment.description}</p>
            <p className=''>{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

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
      </div>
    </div>
  );
};

export default HomeComLogin;