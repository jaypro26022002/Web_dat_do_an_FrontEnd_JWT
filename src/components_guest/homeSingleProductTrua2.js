import { Button, Card } from "react-bootstrap";
import { CartState } from '../context_home/Context Trua';
import Rating from "../components_cart/Rating";

const SingleProduct2 = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log(cart)
  return (<div className="products">
    <Card style={{ border: 'none' }}>
      <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail}
        style={{ width: '260px', height: '250px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        alt={prod.nameProduct}
        className="product-image"
      />
      <Card.Body>
        <Card.Title className="fonts-3 text-center">{prod.nameProduct}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span className="fonts-2" style={{ textAlign: 'center', display: 'block' }}>{prod.price}₫</span>
          {prod.fastDelivery ? (
            <div className="fonts-2 text-center">Giao hàng nhanh</div>
          ) : (
            <div className="fonts-2 text-center">Giao trong 30 phút</div>
          )}
          <div className="rating" style={{ textAlign: 'center', display: 'block' }}>
            <Rating rating={prod.ratings} />
          </div>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  </div >
  )
}

export default SingleProduct2;