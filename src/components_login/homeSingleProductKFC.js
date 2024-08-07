import { Button, Card } from "react-bootstrap";
import { CartState } from '../context_home/Context KFC';
import Rating from "../components_cart/Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log(cart)
  return (<div className="products">
    <Card style={{ border: 'none' }}>
      <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail} style={{ width: '260px', height: '250px' }}
        alt={prod.nameProduct}
        className="product-image"
      />
      <Card.Body>
        <Card.Title className="fonts-3">{prod.nameProduct}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span className="fonts-2">{prod.price}₫</span>
          {prod.fastDelivery ? (
            <div className="fonts-2">Giao hàng nhanh</div>
          ) : (
            <div className="fonts-2">Giao trong 30 phút</div>
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