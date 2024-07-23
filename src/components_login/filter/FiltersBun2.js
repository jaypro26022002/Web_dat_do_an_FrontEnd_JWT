// import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../../context_home/Context Bun";
import Rating from "../../components_cart/Rating";

const Filters2 = () => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  // console.log(byStock, byFastDelivery, sort, byRating)
  return (
    <div className="filters2">
      <span className="title">Lọc sản phẩm</span>
      <div className="row">
        <span className="col-6">
          <Form.Check
            inline
            label="Giá tăng dần"
            name="group1"
            type="checkbox"
            id={`inline-1`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
        </span>
        <span className="col-6">
          <Form.Check
            inline
            label="Giá giảm dần"
            name="group1"
            type="checkbox"
            id={`inline-2`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </span>
        <span className="col-6">
          <Form.Check
            inline
            label="Bao gồm sản phẩm không tồn kho"
            name="group1"
            type="checkbox"
            id={`inline-3`}
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_STOCK",
              })
            }
            checked={byStock}
          />
        </span>
        <span className="col-6">
          <Form.Check
            inline
            label="Chỉ sản phẩm có thể giao nhanh"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
        </span>
      </div>

      <span>
        <label style={{ paddingRight: 10 }}>Đánh giá: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Bỏ tất cả lựa chọn
      </Button>
    </div >
  );
};

export default Filters2;


// import { Button, Form } from "react-bootstrap";
// import { useState } from "react";
// import Rating from "./Rating";

// const Filters = () => {

//   const [rate, setRate] = useState(3)

//   const { productState, productDispatch } = useState();

//   console.log(productState);

//   return (
//     <div className="filters">
//       <span className="title">FILTER products</span>
//       <span>
//         <Form.Check
//           inline
//           label="Ascending"
//           name="group1"
//           type="radio"
//           id={`inline-1`}
//         />
//       </span>
//       <span>
//         <Form.Check
//           inline
//           label="Descending"
//           name="group1"
//           type="radio"
//           id={`inline-1`}
//         />
//       </span>
//       <span>
//         <Form.Check
//           inline
//           label="Include Out of Stock"
//           name="group1"
//           type="checkbox"
//           id={`inline-2`}
//         />
//       </span>
//       <span>
//         <Form.Check
//           inline
//           label="Fast Delivery Only"
//           name="group1"
//           type="checkbox"
//           id={`inline-3`}
//         />
//       </span>
//       <span>
//         <label style={{ paddingRight: 10 }}>Rating: </label>
//         <Rating
//           rating={rate}
//           onClick={(i) => setRate(i + 1)}
//           style={{ cursor: "pointer" }} />
//       </span>
//       <Button variant="light">Clear Filter</Button>
//     </div>
//   )
// }

// export default Filters;



{/* <span>
<Form.Check
  inline
  label="Ascending"
  name="group1"
  type="radio"
  id={`inline-1`}
  onChange={() =>
    productDispatch({
      type: "SORT_BY_PRICE",
      payload: "lowToHigh",
    })
  }
  checked={sort === "lowToHigh" ? true : false}
/>
</span>
<span>
<Form.Check
  inline
  label="Descending"
  name="group1"
  type="radio"
  id={`inline-2`}
  onChange={() =>
    productDispatch({
      type: "SORT_BY_PRICE",
      payload: "highToLow",
    })
  }
  checked={sort === "highToLow" ? true : false}
/>
</span>
<span>
<Form.Check
  inline
  label="Include Out of Stock"
  name="group1"
  type="checkbox"
  id={`inline-3`}
  onChange={() =>
    productDispatch({
      type: "FILTER_BY_STOCK",
    })
  }
  checked={byStock}
/>
</span>
<span>
<Form.Check
  inline
  label="Fast Delivery Only"
  name="group1"
  type="checkbox"
  id={`inline-4`}
  onChange={() =>
    productDispatch({
      type: "FILTER_BY_DELIVERY",
    })
  }
  checked={byFastDelivery}
/>
</span>
<span>
<label style={{ paddingRight: 10 }}>Rating: </label>
<Rating
  rating={byRating}
  onClick={(i) =>
    productDispatch({
      type: "FILTER_BY_RATING",
      payload: i + 1,
    })
  }
  style={{ cursor: "pointer" }}
/>
</span> */}