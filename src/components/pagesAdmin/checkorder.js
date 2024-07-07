import React, { useEffect, useState } from 'react';
import { fetchAllOrder, fetchAllOrderDetail } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalCheckorder from '../Modal/ModalCheckOrder';

const Chekorder = () => {
  const [listCheckOrder, setListCheckOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalCheckorder, setIsShowModalCheckorder] = useState(false);
  const [actionModalCheckorder, setActionModalCheckorder] = useState("CREATE");
  const [dataModalCheckorder, setDataModalCheckorder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchCheckOrder();
  }, [currentPage]);

  const fetchCheckOrder = async () => {
    let response = await fetchAllOrder(currentPage, currentLimit);
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListCheckOrder(response.DT.checkorder);
    }
  };



  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
    await fetchCheckOrder();
  };

  const handleEditCheckorder = (Checkorder) => {
    setActionModalCheckorder("UPDATE");
    setDataModalCheckorder(Checkorder);
    setIsShowModalCheckorder(true);
  };

  const onHideModalCheckorder = async () => {
    setIsShowModalCheckorder(false);
    setDataModalCheckorder({});
    setOrderDetails([]);
    await fetchCheckOrder();
  };

  const handleRefresh = async () => {
    await fetchCheckOrder();
  };

  return (
    <>
      <div className="manage-food-container mt-3">
        <div className="food-header">
          <div className="title">
            <h3>Bảng kiểm tra đơn hàng</h3>
          </div>
          <div className="action pb-3">
            <button className="btn btn-success refresh" onClick={handleRefresh}>
              <i className="fa fa-refresh"></i> Refresh
            </button>
            <button className="btn btn-primary" onClick={() => {
              setIsShowModalCheckorder(true);
              setActionModalCheckorder("CREATE");
            }}>
              <i className="fa fa-plus-circle"></i> Thêm sản phẩm
            </button>
          </div>
        </div>
        <div className="food-body">
          <div className="table-wrapper">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Phương thức thanh toán</th>
                  <th scope="col">Tên người dùng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Trạng thái đơn hàng</th>
                  <th scope="col">Thời gian đặt hàng</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listCheckOrder && listCheckOrder.length > 0 ? (
                  listCheckOrder.map((item, index) => (
                    <tr key={`row-${index}`}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{item.orderId}</td>
                      <td>{item.total}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.status}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <span className="mx-3" onClick={() => handleEditCheckorder(item)}>
                          <i className="fa fa-pencil edit" aria-hidden="true"></i>
                        </span>
                        <span className="mx-3">
                          <i className="fa fa-trash delete" aria-hidden="true"></i>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Not Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModalCheckorder
        onHide={onHideModalCheckorder}
        show={isShowModalCheckorder}
        action={actionModalCheckorder}
        dataModalCheckorder={dataModalCheckorder}
      />
    </>
  );
};

export default Chekorder;


// import React, { useEffect, useState } from 'react';
// import { fetchAllOrder, deleteProduct } from '../../services/userService';
// import ReactPaginate from 'react-paginate';
// import { toast } from 'react-toastify';
// import ModalCheckorder from '../Modal/ModalCheckOrder';

// const Chekorder = () => {
//   const [listCheckOrder, setListCheckOrder] = useState([]);

//   const [currentPage, setCurrentPage] = useState(2);
//   const [currentLimit, setCurrentLimit] = useState(3);
//   const [totalPages, setTotalPages] = useState(0);
//   //modal delete
//   const [isShowModalDelete, setIsShowModalDelete] = useState(false);
//   const [dataModal, setDataModal] = useState({});
//   //modal create/edit product
//   const [isShowModalProduct, setIsShowModalProduct] = useState(false);
//   const [actionModalProduct, setActionModalProduct] = useState("CREATE");
//   const [dataModalProduct, setDataModalProduct] = useState({});

//   useEffect(() => {
//     fetchCheckOrder();
//   }, [currentPage]);

//   const fetchCheckOrder = async () => {
//     let response = await fetchAllOrder(currentPage, currentLimit);
//     if (response && response.EC === 0) {
//       setTotalPages(response.DT.totalPages);
//       setListCheckOrder(response.DT.checkorder);
//     }
//   };

//   const handlePageClick = async (event) => {
//     setCurrentPage(event.selected + 1);
//     await fetchCheckOrder();
//   };

//   const handleDeleteProduct = (product) => {
//     setDataModal(product);
//     setIsShowModalDelete(true);
//   };

//   const handleClose = () => {
//     setIsShowModalDelete(false);
//     setDataModal({});
//   };

//   const ConfirmDeleteProduct = async () => {
//     let response = await deleteProduct(dataModal);
//     if (response && response.EC === 0) {
//       toast.success(response.EM);
//       await fetchCheckOrder();
//       setIsShowModalDelete(false);
//     } else {
//       toast.error(response.EM);
//     }
//   };

//   const onHideModalProduct = async () => {
//     setIsShowModalProduct(false);
//     setDataModalProduct({});
//     await fetchCheckOrder();
//   };

//   const handleRefresh = async () => {
//     await fetchCheckOrder();
//   };

//   const handleEditProduct = (product) => {
//     setActionModalProduct("UPDATE");
//     setDataModalProduct(product);
//     setIsShowModalProduct(true);
//   };

//   return (
//     <>
//       <div className="manage-food-container mt-3">
//         <div className="food-header">
//           <div className="title">
//             <h3>Bảng kiểm tra đơn hàng</h3>
//           </div>
//           <div className="action pb-3">
//             <button className="btn btn-success refresh"
//               onClick={handleRefresh}>
//               <i className="fa fa-refresh"></i> Refresh
//             </button>
//             <button className="btn btn-primary"
//               onClick={() => {
//                 setIsShowModalProduct(true);
//                 setActionModalProduct("CREATE");
//               }}>
//               <i className="fa fa-plus-circle"></i> Thêm sản phẩm
//             </button>
//           </div>
//         </div>
//         <div className="food-body">
//           <div className="table-wrapper">
//             <table className="table table-striped table-hover table-bordered">
//               <thead>
//                 <tr>
//                   <th scope="col">Mã đơn hàng</th>
//                   <th scope="col">Tổng tiền</th>
//                   <th scope="col">Phương thức thanht toán</th>
//                   <th scope="col">tên người dùng</th>
//                   <th scope="col">email</th>
//                   <th scope="col">Số điện thoại</th>
//                   <th scope="col">Trạng thái đơn hàng</th>
//                   <th scope="col">Thời gian đặt hàng</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listCheckOrder && listCheckOrder.length > 0 ?
//                   <>
//                     {listCheckOrder.map((item, index) => {
//                       return (
//                         <tr key={`row-${index}`}>
//                           <td>{item.orderId}</td>
//                           <td>{item.total}</td>
//                           <td>{item.paymentMethod}</td>
//                           <td>{item.username}</td>
//                           <td>{item.email}</td>
//                           <td>{item.phone}</td>
//                           <td>{item.status}</td>
//                           <td>{item.createdAt}</td>
//                           <td>
//                             <span className="mx-3"
//                               onClick={() => handleEditProduct(item)}>
//                               <i className="fa fa-pencil edit" aria-hidden="true"></i>
//                             </span>
//                             <span className="mx-3"
//                               onClick={() => handleDeleteProduct(item)}>
//                               <i className="fa fa-trash delete" aria-hidden="true"></i>
//                             </span>
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </>
//                   :
//                   <>
//                     <tr><td colSpan="8">Not Found</td></tr></>
//                 }
//               </tbody>
//             </table>
//           </div>

//           {totalPages > 0 &&
//             <div className="user-footer">
//               <ReactPaginate
//                 nextLabel="next >"
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={3}
//                 marginPagesDisplayed={2}
//                 pageCount={totalPages}
//                 previousLabel="< previous"
//                 pageClassName="page-item"
//                 pageLinkClassName="page-link"
//                 previousClassName="page-item"
//                 previousLinkClassName="page-link"
//                 nextClassName="page-item"
//                 nextLinkClassName="page-link"
//                 breakLabel="..."
//                 breakClassName="page-item"
//                 breakLinkClassName="page-link"
//                 containerClassName="pagination"
//                 activeClassName="active"
//                 renderOnZeroPageCount={null}
//               />
//             </div>
//           }
//         </div>
//       </div >

//       {/* <ModalCheckorder
//         onHide={onHideModalCheckOrder}
//         show={isShowModalCheckOrder}
//         action={actionModalCheckOrder}
//         dataModalProduct={dataModalCheckOrder}
//       /> */}
//     </>
//   );
// };

// export default Chekorder;