import { CartState } from "../context_cart/Context";
import { Button, ListGroup, Col, Row, Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Rating from './Rating';
import { AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { createOrder, createMoMoPayment } from "../services/cartService";

const Order = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [district, setDistrict] = useState("Quận 1");
    const history = useHistory();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0).toFixed(3)
        );
    }, [cart]);

    console.log("Cart:", cart);

    const handleCheckout = async () => {
        const orderData = {
            items: cart.map(item => ({
                ...item,
                quantity: item.qty // Ensure quantity is passed to backend
            })),
            total,
            paymentMethod,
            district, // Include the selected district in the order data
        };

        try {
            let response = await createOrder(orderData);
            if (paymentMethod === "MoMo") {
                response = await createMoMoPayment(orderData);
                if (response.paymentUrl) {
                    window.location.href = response.paymentUrl;
                } else {
                    alert("Failed to get MoMo payment URL.");
                }
            } else {
                if (response.data.EC === 0) {
                    alert("Order placed successfully!");
                    cart.forEach((prod) => {
                        dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                        });
                    });
                    history.push('/'); // Redirect to home page or order summary page
                } else {
                    alert(`Failed to place order. Error: ${response.data.EM}`);
                }
            }
        } catch (error) {
            console.error("Error placing order", error);
            alert(`Failed to place order. Error: ${error.message}`);
        }
    };

    const districts = ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10"];


    const changeQty = (id_product, qty) => {
        dispatch({
            type: "CHANGE_CART_QTY",
            payload: {
                id_product,
                qty,
            },
        });
    };

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
                                <Col md={2}>{prod.price}₫</Col>
                                <Col md={2}>
                                    <Rating rating={prod.ratings} />
                                </Col>
                                <Col md={2}>
                                    <Button
                                        variant="light"
                                        onClick={() => changeQty(prod.id_product, prod.qty - 1)}
                                        disabled={prod.qty <= 1}
                                    >
                                        -
                                    </Button>
                                    <span style={{ padding: '0 10px' }}>{prod.qty}</span>
                                    <Button
                                        variant="light"
                                        onClick={() => changeQty(prod.id_product, prod.qty + 1)}
                                        disabled={prod.qty >= prod.quantity}
                                    >
                                        +
                                    </Button>
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
                <span className="title">Tổng ({cart.length}) sản phẩm</span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Tổng tiền: {Number(total).toFixed(3)}₫</span> {/* Đảm bảo hiển thị đúng phần thập phân */}
                <Form.Group controlId="paymentMethod">
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="MoMo">MoMo</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="district">
                    <Form.Label>Quận</Form.Label>
                    <Form.Control
                        as="select"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    >
                        {districts.map((d, index) => (
                            <option key={index} value={d}>{d}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button type="button" disabled={cart.length === 0} onClick={handleCheckout}>
                    Tiến hành thanh toán
                </Button>
            </div>
        </div>
    );
};

export default Order;


// import { CartState } from "../context_cart/Context";
// import { Button, ListGroup, Col, Row, Form, Image } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import Rating from './Rating';
// import { AiFillDelete } from "react-icons/ai";
// import { useHistory } from "react-router-dom";
// import { createOrder, createMoMoPayment } from "../services/cartService";

// const Order = () => {
//     const {
//         state: { cart },
//         dispatch,
//     } = CartState();

//     const [total, setTotal] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState("Credit Card");
//     const history = useHistory();

//     useEffect(() => {
//         setTotal(
//             cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0).toFixed(3)
//         );
//     }, [cart]);

//     console.log("Cart:", cart);

//     const handleCheckout = async () => {
//         const orderData = {
//             items: cart.map(item => ({
//                 ...item,
//                 quantity: item.qty // Ensure quantity is passed to backend
//             })),
//             total,
//             paymentMethod,
//         };

//         try {
//             let response = await createOrder(orderData);
//             if (paymentMethod === "MoMo") {
//                 // Instead of directly redirecting here, get the payUrl from backend response
//                 response = await createMoMoPayment(orderData);
//                 if (response.paymentUrl) {
//                     // Redirect to MoMo payment page using window.location.href
//                     window.location.href = response.paymentUrl;
//                 } else {
//                     alert("Failed to get MoMo payment URL.");
//                 }
//             } else {
//                 if (response.data.EC === 0) {
//                     alert("Order placed successfully!");
//                     // Clear the cart after a successful order
//                     cart.forEach((prod) => {
//                         dispatch({
//                             type: "REMOVE_FROM_CART",
//                             payload: prod,
//                         });
//                     });
//                     history.push('/'); // Redirect to home page or order summary page
//                 } else {
//                     alert(`Failed to place order. Error: ${response.data.EM}`);
//                 }
//             }
//         } catch (error) {
//             console.error("Error placing order", error);
//             alert(`Failed to place order. Error: ${error.message}`);
//         }
//     };



//     return (
//         <div className="home">
//             <div className="productContainer">
//                 <ListGroup>
//                     {cart.map((prod) => (
//                         <ListGroup.Item key={prod.id_product}>
//                             <Row>
//                                 <Col>
//                                     <Image src={`http://localhost:8081/image/` + prod.thumbnail} alt={prod.nameProduct} fluid rounded />
//                                 </Col>
//                                 <Col md={2}>
//                                     <span> {prod.nameProduct}</span>
//                                 </Col>
//                                 <Col md={2}>$ {prod.price}</Col>
//                                 <Col md={2}>
//                                     <Rating rating={prod.ratings} />
//                                 </Col>
//                                 <Col md={2}>
//                                     <Form.Control
//                                         className="form-select"
//                                         as="select"
//                                         value={prod.qty}
//                                         onChange={(e) =>
//                                             dispatch({
//                                                 type: "CHANGE_CART_QTY",
//                                                 payload: {
//                                                     id_product: prod.id_product,
//                                                     qty: e.target.value,
//                                                 },
//                                             })
//                                         }
//                                     >
//                                         {[...Array(prod.quantity).keys()].map((x) => (
//                                             <option key={x + 1}>{x + 1}</option>
//                                         ))}
//                                     </Form.Control>
//                                 </Col>
//                                 <Col md={2}>
//                                     <Button
//                                         type="button"
//                                         variant="light"
//                                         onClick={() =>
//                                             dispatch({
//                                                 type: "REMOVE_FROM_CART",
//                                                 payload: prod,
//                                             })
//                                         }
//                                     >
//                                         <AiFillDelete fontSize="20px" />
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             </div>
//             <div className="filters summary">
//                 <span className="title">Subtotal ({cart.length}) items</span>
//                 <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
//                 <Form.Group controlId="paymentMethod">
//                     <Form.Label>Payment Method</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                     >
//                         <option value="Credit Card">Credit Card</option>
//                         <option value="PayPal">PayPal</option>
//                         <option value="Bank Transfer">Bank Transfer</option>
//                         <option value="MoMo">MoMo</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Button type="button" disabled={cart.length === 0} onClick={handleCheckout}>
//                     Proceed to Checkout
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default Order;
