// import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../../context_home/Context Sang";
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