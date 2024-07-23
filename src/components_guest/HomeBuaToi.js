import { CartState } from "../context_home/Context Toi";
import SingleProduct from '../components_guest/homeSingleProductToi';
import SingleProduct2 from '../components_guest/homeSingleProductToi2';
import Filters from "../components_login/filter/FiltersToi";
import Filters2 from "../components_login/filter/FiltersToi2";
import './style.scss';
import { Navbar } from 'react-bootstrap';
import logo from '../components/home/img/icon.gif';
import React, { useEffect, useState } from 'react';


const HomeToiLogin = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
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
      <div className='home2 d-sm-none d-block'>
        <div className='fill '>
          <Filters2 />
        </div>
        <div className="productContainer col-10">
          {transformProducts().map((prod) => (
            <SingleProduct2 prod={prod} key={prod.id_product} />
          ))}
        </div>
      </div>
      <div className='home d-none d-sm-block'>
        <div className='row'>
          <div className='col-2'>
            <Filters />
          </div>
          <div className="productContainer col-10">
            {transformProducts().map((prod) => (
              <SingleProduct prod={prod} key={prod.id_product} />
            ))}
          </div>
        </div>
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

export default HomeToiLogin;