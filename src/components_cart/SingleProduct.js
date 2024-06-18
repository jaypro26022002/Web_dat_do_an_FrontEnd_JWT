import { Button, Card } from "react-bootstrap";
import { CartState } from '../context_cart/Context';
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (<div className="products">
    <Card>
      <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail} alt={prod.nameProduct} style={{ width: '300px', height: '250px' }} />
      <Card.Body>
        <Card.Title>{prod.nameProduct}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span>₹ {prod.price.split(".")[0]}</span>
          {prod.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 days delivery</div>
          )}
          <Rating rating={prod.ratings} />
        </Card.Subtitle>
        {
          cart.some((p) => p.id_product === prod.id_product) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.quantity}
            >
              {!prod.quantity ? "Out of Stock" : "Add to Cart"}
            </Button>
          )
        }

      </Card.Body>
    </Card>
  </div >
  )
}

export default SingleProduct;