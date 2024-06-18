import { CartState } from "../context_home/Context Sang";
import SingleProduct from './homeSingleProductSang';
import Filters from "../components_cart/Filters";
import './style.scss';

const HomeSangLogin = () => {
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

export default HomeSangLogin;
