// Inside Product.js

import React, { useEffect, useState } from 'react';
import '../pagesAdmin/Product.scss';
import { fetchAllProduct, deleteProduct } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalProduct from '../Modal/ModalProduct';
import ModalDeleteProduct from "../Modal/ModalDeleteProduct";

const Product = () => {
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDeleteProduct, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isShowModalProduct, setIsShowModalProduct] = useState(false);
    const [actionModalProduct, setActionModalProduct] = useState("CREATE");
    const [dataModalProduct, setDataModalProduct] = useState({});

    useEffect(() => {
        fetchProduct();
    }, [currentPage]);

    const fetchProduct = async () => {
        let response = await fetchAllProduct(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListProduct(response.DT.product);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
        await fetchProduct();
    };

    const handleDeleteProduct = (product) => {
        setDataModal(product);
        setIsShowModalDelete(true);
    };

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };

    const ConfirmDeleteProduct = async () => {
        let response = await deleteProduct(dataModal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchProduct();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHideModalProduct = async () => {
        setIsShowModalProduct(false);
        setDataModalProduct({});
        await fetchProduct();
    };

    const handleRefresh = async () => {
        await fetchProduct();
    };

    const handleEditProduct = (product) => {
        setActionModalProduct("UPDATE");
        setDataModalProduct(product);
        setIsShowModalProduct(true);
    };

    return (
        <>
            <div className="manage-food-container mt-3">
                <div className="food-header">
                    <div className="title">
                        <h3>Bảng sản phẩm</h3>
                    </div>
                    <div className="action pb-3">
                        <button className="btn btn-success refresh"
                            onClick={handleRefresh}>
                            <i className="fa fa-refresh"></i> Refresh
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => {
                                setIsShowModalProduct(true);
                                setActionModalProduct("CREATE");
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
                                    <th scope="col">id</th>
                                    <th scope="col">Ảnh đại diện</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">giá</th>
                                    <th scope="col">giá giảm</th>
                                    <th scope="col">số lượng</th>
                                    <th scope="col">Bữa ăn</th>
                                    <th scope="col">Nhà hàng</th>
                                    <th scope="col">Dịch vụ ưu tiên</th>
                                    <th scope="col">Đánh giá</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct && listProduct.length > 0 ?
                                    <>
                                        {listProduct.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id_product}</td>
                                                    <td>
                                                        <img src={`http://localhost:8081/image/` + item.thumbnail} alt="" style={{ width: '100px', height: '100px' }} />
                                                    </td>
                                                    <td>{item.nameProduct}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.pricedown}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.id_type_product}</td>
                                                    <td>{item.collection}</td>
                                                    <td>{item.fastDelivery ? "Yes" : "No"}</td>
                                                    <td>{item.ratings}</td>
                                                    <td>
                                                        <span className="mx-3"
                                                            onClick={() => handleEditProduct(item)}>
                                                            <i className="fa fa-pencil edit" aria-hidden="true"></i>
                                                        </span>
                                                        <span className="mx-3"
                                                            onClick={() => handleDeleteProduct(item)}>
                                                            <i className="fa fa-trash delete" aria-hidden="true"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td colSpan="12">Not Found</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 0 &&
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
                    }
                </div>
            </div >

            <ModalDeleteProduct
                show={isShowModalDeleteProduct}
                handleClose={handleClose}
                ConfirmDeleteProduct={ConfirmDeleteProduct}
                dataModal={dataModal}
            />
            <ModalProduct
                onHide={onHideModalProduct}
                show={isShowModalProduct}
                action={actionModalProduct}
                dataModalProduct={dataModalProduct}
            />
        </>
    );
};

export default Product;
