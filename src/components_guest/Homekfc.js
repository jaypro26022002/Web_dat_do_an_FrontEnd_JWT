import React, { useEffect, useState } from 'react';
import { fetchShop2 } from "../services/cartService";
import { CartState } from "../context_home/Context KFC";
import SingleProduct from './homeSingleProductKFC';
import Filters from "../components_cart/Filters";
import './style.scss';

const Homekfc = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const [shop, setShop] = useState({});

  useEffect(() => {
    const fetchShopDetails = async () => {
      const data = await fetchShop2();
      setShop(data.DT[0]);  // Assuming data.DT is an array of shop details
    };
    fetchShopDetails();
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
      <div className='container'>
        <div className="container_shop ">
          <div className="image">
            <img src={`http://localhost:8081/image/${shop.thumbnail}`} style={{ width: '350px', height: '250px' }} alt="Shop Thumbnail" />
          </div>
          <div className="details">
            <h1>{shop.nameShop}</h1>
            <div>{shop.address}</div>
            <div className="rating">⭐⭐⭐⭐⭐ 100+ đánh giá trên Uncle V</div>
            <div className="status">Mở cửa {shop.timeWork}</div>
            <div className="price">Có giá: {shop.price}</div>
            <div className="service-fee">PHÍ DỊCH VỤ 0.0%</div>
            <div>DỊCH VỤ BỞI Uncle V</div>
          </div>
        </div>
      </div>
      <div className='home color'>
        <Filters />
        <div className="productContainer">
          {transformProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod.id_product} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Homekfc;
