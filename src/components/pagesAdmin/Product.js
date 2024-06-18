import React, { useEffect, useState } from 'react';
import '../pagesAdmin/Product.scss';
import { fetchAllProduct, deleteProduct } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalProduct from '../Modal/ModalProduct';

const Product = () => {
    const [listProduct, setListProduct] = useState([]);

    const [currentPage, setCurrentPage] = useState(2);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});
    //modal create/edit product
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
                        <h3>Table Product</h3>
                    </div>
                    <div className="action pb-3">
                        <button className="btn btn-success refresh" onClick={handleRefresh}>
                            <i className="fa fa-refresh"></i> Refresh
                        </button>
                        <button className="btn btn-primary" onClick={() => { setIsShowModalProduct(true); setActionModalProduct("CREATE"); }}>
                            <i className="fa fa-plus-circle"></i> Add new Product
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
                                    <th scope="col">thumbnail</th>
                                    <th scope="col">name</th>
                                    <th scope="col">price</th>
                                    <th scope="col">price down</th>
                                    <th scope="col">quantity</th>
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
                                                        <img src={`http://localhost:8081/image/` + item.thumbnail} alt="" style={{ width: '100px', hegiht: '100px' }} />

                                                    </td>
                                                    <td>{item.nameProduct}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.pricedown}</td>
                                                    <td>{item.quantity}</td>
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
                                        <tr><td colSpan="8">Not Found</td></tr></>
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