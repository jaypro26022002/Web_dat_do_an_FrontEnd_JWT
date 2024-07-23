import { CartState } from "../context_home/Context Toi";
import { Button, ListGroup, Col, Row, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Rating from '../components_cart/Rating';
import { AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const CartToi = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [total, setTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0).toFixed(3)
        );
    }, [cart]);

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
        <div className="home-pro">
            <div className="cart2 d-sm-none d-block">
                <div className="row">
                    <div className="filters4 summary col-12">
                        <span className="title text-center">Tổng ({cart.length}) sản phẩm</span>
                        <span style={{ fontWeight: 700, fontSize: 20 }}>Tổng tiền: {total}₫ </span>
                        <Button type="button" disabled={cart.length === 0} onClick={() => history.push('/Toiorder')}>
                            Tiến hành kiểm tra
                        </Button>
                    </div>
                    <div className="productContainer col-12">
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
                </div>
            </div>


            <div className="cart1 d-none d-sm-block">
                <div className="productContainer3">
                    <div className="list-group">
                        <ListGroup>
                            {cart.map((prod) => (
                                <ListGroup.Item key={prod.id_product}>
                                    <Row>
                                        <Col>
                                            <Image src={`http://localhost:8081/image/` + prod.thumbnail} alt={prod.nameProduct} fluid rounded
                                            />
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
                    <div className="filters3 summary">
                        <span className="title">Tổng ({cart.length}) sản phẩm</span>
                        <span style={{ fontWeight: 700, fontSize: 20 }}>Tổng tiền: {total}₫ </span>
                        <Button type="button" disabled={cart.length === 0} onClick={() => history.push('/Toiorder')}>
                            Tiến hành kiểm tra
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartToi;