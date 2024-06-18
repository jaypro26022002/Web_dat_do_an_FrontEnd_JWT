import { CartState } from "../context_home/Context Com";
import SingleProduct from './homeSingleProductCom';
import Filters from "../components_cart/Filters";
import './style.scss';

const HomeCom = () => {
  const { state: { products } } = CartState();

  // console.log(products)
  return <div className="home">
    <Filters />
    <div className="productContainer">
      {products.map((prod) => {
        return <SingleProduct prod={prod} key={prod.id_product} />
      })}
    </div>
  </div>
};

export default HomeCom;

// import { CartState } from "../context_cart/Context";
// import Filters from "./Filters";
// import SingleProduct from "./SingleProduct";

// const Home = () => {
//   const {
//     state: { products },
//     productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
//   } = CartState();

//   const transformProducts = () => {
//     let sortedProducts = products;

//     if (sort) {
//       sortedProducts = sortedProducts.sort((a, b) =>
//         sort === "lowToHigh" ? a.price - b.price : b.price - a.price
//       );
//     }

//     if (!byStock) {
//       sortedProducts = sortedProducts.filter((prod) => prod.inStock);
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
//         prod.name.toLowerCase().includes(searchQuery)
//       );
//     }

//     return sortedProducts;
//   };

//   return (
//     <div className="home">
//       <Filters />
//       <div className="productContainer">
//         {transformProducts().map((prod) => (
//           <SingleProduct prod={prod} key={prod.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
