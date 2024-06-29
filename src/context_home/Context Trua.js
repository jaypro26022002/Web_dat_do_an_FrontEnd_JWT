import React, { useContext, useReducer, useEffect, useState } from "react";
import { fetchAllProductTrua } from "../services/cartService";
import { cartReduce } from "../context_cart/Reducers";
import { productReducer } from "../context_cart/Reducers";


const CartContext = React.createContext(null);

const Context6 = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchAllProductTrua();
      if (response.EC === 0) {
        setProducts(response.DT);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [state, dispatch] = useReducer(cartReduce, {
    products: products, // Update the initial state with the fetched products
    cart: []
  });

  console.log("data product", products)


  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  // Update the state with the fetched products
  useEffect(() => {
    dispatch({ type: 'UPDATE_PRODUCTS', products: products });
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default Context6;

export const CartState = () => {
  return useContext(CartContext);
}