// import { createContext, useContext, useReducer, useEffect, useState } from "react";
// import { cartReducer, productReducer } from "./Reducers";
// import { fetchAllProduct1 } from '../services/userService';

// const Cart = createContext();

// const Context = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetchAllProduct1();
//       if (response.EC === 0) {
//         setProducts(response.DT);
//       }
//       setLoading(false);
//     };
//     fetchProducts();
//   }, []);

//   const [state, dispatch] = useReducer(cartReducer, {
//     products: products,
//     cart: [],
//   });

//   const [productState, productDispatch] = useReducer(productReducer, {
//     byStock: false,
//     byFastDelivery: false,
//     byRating: 0,
//     searchQuery: "",
//   });

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
//       {children}
//     </Cart.Provider>
//   );
// };

// export const CartState = () => {
//   return useContext(Cart);
// };
// export default Context;


import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { fetchAllProduct1 } from "../services/userService";
import { cartReduce } from "./Reducers";


const CartContext = React.createContext(null);


// const Cart = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchAllProduct1();
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

export default Context;

export const CartState = () => {
  return useContext(CartContext);
}


// import { createContext, useContext, useReducer } from "react";
// import { fetchAllProduct1 } from "../services/userService";
// import { cartReduce } from "./Reducers";

// const Cart = createContext();

// const Context = ({ children }) => {
//   const products = async () => {
//     const response = await fetchAllProduct1();
//     return products
//   }

//   console.log(products);

//   const [state, dispatch] = useReducer(cartReduce, {
//     products: products,
//     cart: []
//   });
//   return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
// };

// export default Context;

// export const CartSate = () => {
//   return useContext(Cart);
// }