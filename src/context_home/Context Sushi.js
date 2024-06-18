import React, { useContext, useReducer, useEffect, useState } from "react";
import { fetchAllProductSushi } from "../services/cartService";
import { cartReduce } from "../context_cart/Reducers";

const CartContext = React.createContext(null);

const Context3 = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchAllProductSushi();
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

  // Update the state with the fetched products
  useEffect(() => {
    dispatch({ type: 'UPDATE_PRODUCTS', products: products });
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default Context3;

export const CartState = () => {
  return useContext(CartContext);
}