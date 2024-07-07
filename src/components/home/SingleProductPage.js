import { Card } from "react-bootstrap";
import { CartState } from '../../context_cart/Context';
import Rating from "../../components_cart/Rating";

const SingleProductPage = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log(cart)
  return (<div className="products">
    <Card>
      <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail} style={{ width: '265px', height: '250px' }}
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
      </Card.Body>
    </Card>
  </div >
  )
}

export default SingleProductPage;