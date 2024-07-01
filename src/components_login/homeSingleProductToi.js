import { Button, Card } from "react-bootstrap";
import { CartState } from '../context_home/Context Toi';
import Rating from "../components_cart/Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  console.log(cart)
  return (<div className="products">
    <Card>
      <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail} style={{ width: '260px', height: '250px' }}
        alt={prod.nameProduct}
        className="product-image"
      />
      <Card.Body>
        <Card.Title>{prod.nameProduct}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span>{prod.price}₫</span>
          {prod.fastDelivery ? (
            <div>Giao hàng nhanh</div>
          ) : (
            <div>giao trong 30 phút</div>
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
              Xóa khỏi giỏ
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
              {!prod.quantity ? "hết hàng" : "Thêm vào giỏ"}
            </Button>
          )
        }

      </Card.Body>
    </Card>
  </div >
  )
}

export default SingleProduct;