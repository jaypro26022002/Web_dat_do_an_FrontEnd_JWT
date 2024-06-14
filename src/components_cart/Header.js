import { Badge, Container, Dropdown, FormControl, Nav, Navbar, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { CartState } from "../context_cart/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();

  const history = useHistory();

  const handleGoToCart = () => {
    console.log('Navigating to /carts'); // Debugging log
    history.push('/carts');
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map(prod => (
                    <span className="cartitem" key={prod.id_product}>
                      <img
                        src={`http://localhost:8081/image/` + prod.thumbnail}
                        className="cartItemImg"
                        alt={prod.nameProduct}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.nameProduct}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Button
                    onClick={handleGoToCart}
                    style={{ width: "95%", margin: "0 10px" }}
                  >
                    Go To Cart
                  </Button>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;


// import { Badge, Container, Dropdown, FormControl, Nav, Navbar, Button } from "react-bootstrap"
// import { FaShoppingCart } from "react-icons/fa";
// import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { CartState } from "../context_cart/Context";
// import { AiFillDelete } from "react-icons/ai";

// const Header = () => {
//   const {
//     state: { cart },
//     dispatch
//   } = CartState()

//   const history = useHistory()

//   const handleGoToCart = () => {
//     history.push('/carts');
//     // window.location.reload();
//   }

//   return (
//     <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
//       <Container>
//         <Navbar.Brand>
//           <Link to="/cart" >Shopping Cart</Link>
//         </Navbar.Brand>
//         <Navbar.Text className="search">
//           <FormControl
//             style={{ width: 500 }}
//             placeholder="Search a product"
//             className="m-auto"
//           />
//         </Navbar.Text>
//         <Nav>
//           {/* <Dropdown alignRight> */}
//           <Dropdown >
//             <Dropdown.Toggle variant="success">
//               <FaShoppingCart color="white" fontSize="25px" />
//               <Badge>{cart.length}</Badge>
//             </Dropdown.Toggle>

//             <Dropdown.Menu style={{ minWidth: 370 }}>
//               {cart.length > 0 ? (
//                 <>
//                   {
//                     cart.map(prod => (
//                       <span className="cartitem" key={prod.id_product}>
//                         <img
//                           src={`http://localhost:8081/image/` + prod.thumbnail}
//                           className="cartItemImg"
//                           alt={prod.nameProduct}
//                         />
//                         <div className="cartItemDetail">
//                           <span>{prod.nameProduct}</span>
//                           <span>₹ {prod.price.split(".")[0]}</span>
//                         </div>
//                         <AiFillDelete
//                           fontSize="20px"
//                           style={{ cursor: "pointer" }}
//                           onClick={() =>
//                             dispatch({
//                               type: "REMOVE_FROM_CART",
//                               payload: prod,
//                             })
//                           }
//                         />
//                       </span>
//                     ))}
//                   <Link to="/carts">
//                     <Button
//                       onClick={handleGoToCart}
//                       style={{ width: "95%", margin: "0 10px" }}>
//                       Go To Cart
//                     </Button>
//                   </Link>
//                 </>
//               ) : (
//                 <span style={{ padding: 10 }}>Cart is Empty!</span>
//               )}
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </Navbar >
//   )

// }
// export default Header;

// import { FaShoppingCart } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import {
//   Badge,
//   Button,
//   Container,
//   Dropdown,
//   FormControl,
//   Nav,
//   Navbar,
// } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import { CartState } from "../context_cart/Context";
// import "./styles.css";

// const Header = () => {
//   const {
//     state: { cart },
//     dispatch,
//     productDispatch,
//   } = CartState();

//   return (
//     <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
//       <Container>
//         <Navbar.Brand>
//           <Link to="/">Shopping Cart</Link>
//         </Navbar.Brand>
//         {useLocation().pathname.split("/")[1] !== "cart" && (
//           <Navbar.Text className="search">
//             <FormControl
//               style={{ width: 500 }}
//               type="search"
//               placeholder="Search a product..."
//               className="m-auto"
//               aria-label="Search"
//               onChange={(e) => {
//                 productDispatch({
//                   type: "FILTER_BY_SEARCH",
//                   payload: e.target.value,
//                 });
//               }}
//             />
//           </Navbar.Text>
//         )}
//         <Nav>
//           <Dropdown alignRight>
//             <Dropdown.Toggle variant="success">
//               <FaShoppingCart color="white" fontSize="25px" />
//               <Badge>{cart.length}</Badge>
//             </Dropdown.Toggle>

//             <Dropdown.Menu style={{ minWidth: 370 }}>
//               {cart.length > 0 ? (
//                 <>
//                   {cart.map((prod) => (
//                     <span className="cartitem" key={prod.id}>
//                       <img
//                         src={prod.image}
//                         className="cartItemImg"
//                         alt={prod.name}
//                       />
//                       <div className="cartItemDetail">
//                         <span>{prod.name}</span>
//                         <span>₹ {prod.price.split(".")[0]}</span>
//                       </div>
//                       <AiFillDelete
//                         fontSize="20px"
//                         style={{ cursor: "pointer" }}
//                         onClick={() =>
//                           dispatch({
//                             type: "REMOVE_FROM_CART",
//                             payload: prod,
//                           })
//                         }
//                       />
//                     </span>
//                   ))}
//                   <Link to="/cart">
//                     <Button style={{ width: "95%", margin: "0 10px" }}>
//                       Go To Cart
//                     </Button>
//                   </Link>
//                 </>
//               ) : (
//                 <span style={{ padding: 10 }}>Cart is Empty!</span>
//               )}
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

