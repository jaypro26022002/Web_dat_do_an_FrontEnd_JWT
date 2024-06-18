import { CartState } from "../context_home/Context Com";
import SingleProduct from './homeSingleProductCom';
import Filters from "../components_cart/Filters";
import './style.scss';

const HomeComLogin = () => {
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

export default HomeComLogin;