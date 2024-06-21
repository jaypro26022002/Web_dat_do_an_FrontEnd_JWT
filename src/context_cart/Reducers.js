export const cartReduce = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.products };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c) => c.id_product !== action.payload.id_product),
      };
    case 'CHANGE_CART_QTY':
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id_product === action.payload.id_product ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    default:
      return state;
    //...
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byFastDelivery: false, byRating: 0 };
    default:
      return state;
  }
};

// export const cartReduce = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_PRODUCTS':
//       return { ...state, products: action.products };
//     case 'ADD_TO_CART':
//       return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cart: state.cart.filter((c) => c.id_product !== action.payload.id_product),
//       };
//     case 'CHANGE_CART_QTY':
//       return {
//         ...state,
//         cart: state.cart.filter((c) =>
//           c.id_product === action.payload.id_product ? (c.qty = action.payload.qty) : c.qty
//         ),
//       };

//     default:
//       return state;
//     //...
//   }
// };

// export const productReducer = (state, action) => {
//   switch (action.type) {
//     case "SORT_BY_PRICE":
//       return { ...state, sort: action.payload };
//     case "FILTER_BY_STOCK":
//       return { ...state, byStock: !state.byStock };
//     case "FILTER_BY_DELIVERY":
//       return { ...state, byFastDelivery: !state.byFastDelivery };
//     case "FILTER_BY_RATING":
//       return { ...state, byRating: action.payload };
//     case "FILTER_BY_SEARCH":
//       return { ...state, searchQuery: action.payload };
//     case "CLEAR_FILTERS":
//       return { byStock: false, byFastDelivery: false, byRating: 0 };
//     default:
//       return state;
//   }
// };