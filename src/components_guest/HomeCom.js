import React, { useEffect, useState } from 'react';
import { CartState } from "../context_home/Context Com";
import SingleProduct from './homeSingleProductCom';
import { fetchShop1 } from "../services/cartService";
import Filters from "../components_login/filter/FiltersCom";
import './style.scss';

const HomeComLogin = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const [shop, setShop] = useState({});

  useEffect(() => {
    const fetchShopDetails = async () => {
      const data = await fetchShop1();
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

export default HomeComLogin;



{/* <div className="container">
        <div className="image">
          <img src={`http://localhost:8081/image/` + shop.thumbnail} style={{ width: '260px', height: '250px' }} />
        </div>
        <div className="details">
          <h1>Chân Gà Sốt Thái - Mr.Bon - Lê Bình</h1>
          <div>100 Lê Bình, P. 4, Tân Bình, TP. HCM</div>
          <div className="rating">⭐⭐⭐⭐⭐ 100+ đánh giá trên ShopeeFood</div>
          <div className="status">Mở cửa 06:00 - 23:00</div>
          <div className="price">₫10.000 - 100.000</div>
          <div className="service-fee">PHÍ DỊCH VỤ 0.0%</div>
          <div>DỊCH VỤ BỞI Uncle V</div>
        </div>
      </div> */}


// import { Button, Card } from "react-bootstrap";
// import { CartState } from "../context_home/Context Com";
// import SingleProduct from './homeSingleProductCom';
// import { fetchShop1 } from "../services/cartService";
// import Filters from "../components_login/filter/FiltersCom";
// import './style.scss';

// const HomeComLogin = () => {
//   const {
//     state: { products },
//     productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
//   } = CartState();

//   // useEffect(() => {
//   //   console.log("Initial products in Home component:", products);
//   // }, [products]);

//   const transformProducts = () => {
//     let sortedProducts = products;

//     if (sort) {
//       sortedProducts = sortedProducts.sort((a, b) =>
//         sort === "lowToHigh" ? a.price - b.price : b.price - a.price
//       );
//     }

//     if (!byStock) {
//       sortedProducts = sortedProducts.filter((prod) => prod.quantity);
//     }

//     if (byFastDelivery) {
//       sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
//     }

//     if (byRating) {
//       sortedProducts = sortedProducts.filter(
//         (prod) => prod.ratings >= byRating
//       );
//     }

//     if (searchQuery) {
//       sortedProducts = sortedProducts.filter((prod) =>
//         prod.nameProduct.toLowerCase().includes(searchQuery)
//       );
//     }

//     return sortedProducts;
//   };

//   return (
//     <div className="home">
//       <Filters />
//       <div className="form-control">
//         <Card.Img variant="top" src={`http://localhost:8081/image/` + shop.thumbnail} style={{ width: '260px', height: '250px' }}
//           className="shop-image"
//         />
//       </div>
//       <div className="form-control">
//         <input class="" type="text" value={shop.nameShop} />
//         <input class="" type="text" value={shop.address} />
//         <input class="" type="text" value={shop.timeWork} />
//         <input class="" type="text" value={shop.rating} />
//       </div>
//       <div className="productContainer">
//         {transformProducts().map((prod) => (
//           <SingleProduct prod={prod} key={prod.id_product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeComLogin;