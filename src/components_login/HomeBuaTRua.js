import { CartState } from "../context_home/Context Trua";
import SingleProduct from './homeSingleProductTrua';
import Filters from "../components_cart/Filters";
import './style.scss';

const HomeTruaLogin = () => {
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

export default HomeTruaLogin;