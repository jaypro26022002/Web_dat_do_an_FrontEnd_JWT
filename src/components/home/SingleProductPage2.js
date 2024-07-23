import React from 'react';
import { Card } from 'react-bootstrap';
import { CartState } from '../../context_cart/Context';
import Rating from '../../components_cart/Rating';
import './SingleProductPage2.scss'; // Import your SCSS file

const SingleProductPage2 = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="mainsingle">
      <div className="products">
        <Card style={{ border: 'none', width: "100%" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:8081/image/${prod.thumbnail}`} // Adjusted src attribute
            style={{ width: '280px', height: '300px' }} // Ensure image fills its container
            alt={prod.nameProduct}
            className="product-image"
          />
        </Card>

      </div>
      <div className="detail">
        <Card.Title className="font-3">{prod.nameProduct}</Card.Title>
        <Card.Subtitle>
          <span className="fonts-2">Giá: {prod.price}₫</span>
          {prod.fastDelivery ? (
            <div className="fonts-2">Giao hàng nhanh</div>
          ) : (
            <div className="fonts-2">Giao trong 30 phút</div>
          )}
        </Card.Subtitle>
        <div className="rating">
          <Rating rating={prod.ratings} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage2;


// import { Card } from "react-bootstrap";
// import { CartState } from '../../context_cart/Context';
// import Rating from "../../components_cart/Rating";

// const SingleProductPage2 = ({ prod }) => {
//   const {
//     state: { cart },
//     dispatch,
//   } = CartState();

//   // console.log(cart)
//   return (<div className="products">
//     <Card style={{ border: 'none' }}>
//       <Card.Img variant="top" src={`http://localhost:8081/image/` + prod.thumbnail} style={{ width: '435px', height: '375px' }}
//         alt={prod.nameProduct}
//         className="product-image"
//       />
//       <Card.Body>
//         <Card.Title className="font-3">{prod.nameProduct}</Card.Title>
//         <Card.Subtitle style={{ paddingBottom: 10 }}>
//           <span className="fonts-2">{prod.price}₫</span>
//           {prod.fastDelivery ? (
//             <div className="fonts-2">Giao hàng nhanh</div>
//           ) : (
//             <div className="fonts-2">Giao trong 30 phút</div>
//           )}
//           <Rating rating={prod.ratings} />
//         </Card.Subtitle>
//       </Card.Body>
//     </Card>
//   </div >
//   )
// }

// export default SingleProductPage2;