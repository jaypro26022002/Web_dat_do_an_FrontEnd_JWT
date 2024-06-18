import { CartState } from "../context_cart/Context";
import { Button, ListGroup, Col, Row, Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Rating from './Rating';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
        )
        // Log the quantities of all items in the cart
        // console.log("", cart);
    }, [cart]);

    return (
        <div className="home">
            <div className="productContainer">
                <ListGroup>
                    {cart.map((prod) => (
                        <ListGroup.Item key={prod.id_product}>
                            <Row>
                                <Col>
                                    <Image src={`http://localhost:8081/image/` + prod.thumbnail} alt={prod.nameProduct} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span> {prod.nameProduct}</span>
                                </Col>
                                <Col md={2}>$ {prod.price}</Col>
                                <Col md={2}>
                                    <Rating rating={prod.ratings} />
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        className="form-select"
                                        as="select"
                                        value={prod.qty}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "CHANGE_CART_QTY",
                                                payload: {
                                                    id_product: prod.id_product,
                                                    qty: e.target.value,
                                                },
                                            })
                                        }
                                    >
                                        {[...Array(prod.quantity).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                        {console.log("prod.quantity", prod.quantity)}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: prod,
                                            })
                                        }
                                    >
                                        <AiFillDelete fontSize="20px" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="filters summary">
                <span className="title">Subtotal ({cart.length}) items</span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
                <Button type="button" disabled={cart.length === 0}>
                    Proceed to Checkout
                </Button>
            </div>
        </div >
    );
};

export default Cart;


// import { CartState } from "../context_cart/Context";
// import { ListGroup } from "react-bootstrap";
// import { useEffect } from "react";

// const Cart = () => {
//     const {
//         state: { cart },
//         dispatch,
//     } = CartState();

//     useEffect(() => {
//         console.log("Cart Data:", cart);
//     }, [cart]);

//     return (
//         <div className="home">
//             <h1>Cart</h1>
//             <div className="productContainer">
//                 <ListGroup>
//                     {cart.map((prod) => (
//                         <span>{prod.nameProduct}</span>
//                     ))}
//                 </ListGroup>
//             </div>
//         </div >
//     );
// };
// export default Cart;

// // import { useEffect, useState } from "react";
// // import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
// // import { AiFillDelete } from "react-icons/ai";
// // import { CartState } from "../context_cart/Context";
// // import Rating from "./Rating";

// // const Cart = () => {
// //   const {
// //     state: { cart },
// //     dispatch,
// //   } = CartState();
// //   const [total, setTotal] = useState();

// //   useEffect(() => {
// //     setTotal(
// //       cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
// //     );
// //   }, [cart]);

// //   return (
// //     <div className="home">
// //       <div className="productContainer">
// //         <ListGroup>
// //           {cart.map((prod) => (
// //             <ListGroup.Item key={prod.id}>
// //               <Row>
// //                 <Col md={2}>
// //                   <Image src={prod.image} alt={prod.name} fluid rounded />
// //                 </Col>
// //                 <Col md={2}>
// //                   <span>{prod.name}</span>
// //                 </Col>
// //                 <Col md={2}>₹ {prod.price}</Col>
// //                 <Col md={2}>
// //                   <Rating rating={prod.ratings} />
// //                 </Col>
// //                 <Col md={2}>
// //                   <Form.Control
// //                     as="select"
// //                     value={prod.qty}
// //                     onChange={(e) =>
// //                       dispatch({
// //                         type: "CHANGE_CART_QTY",
// //                         payload: {
// //                           id: prod.id,
// //                           qty: e.target.value,
// //                         },
// //                       })
// //                     }
// //                   >
// //                     {[...Array(prod.inStock).keys()].map((x) => (
// //                       <option key={x + 1}>{x + 1}</option>
// //                     ))}
// //                   </Form.Control>
// //                 </Col>
// //                 <Col md={2}>
// //                   <Button
// //                     type="button"
// //                     variant="light"
// //                     onClick={() =>
// //                       dispatch({
// //                         type: "REMOVE_FROM_CART",
// //                         payload: prod,
// //                       })
// //                     }
// //                   >
// //                     <AiFillDelete fontSize="20px" />
// //                   </Button>
// //                 </Col>
// //               </Row>
// //             </ListGroup.Item>
// //           ))}
// //         </ListGroup>
// //       </div>
// //       <div className="filters summary">
// //         <span className="title">Subtotal ({cart.length}) items</span>
// //         <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
// //         <Button type="button" disabled={cart.length === 0}>
// //           Proceed to Checkout
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

