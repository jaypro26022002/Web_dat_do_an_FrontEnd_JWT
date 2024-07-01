import { useEffect, useState } from "react";
import { fetchAllShop, deleteShop } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "../Modal/ModalDeleteShop";
import ModalShop from "../Modal/ModalShop";

const Shop = (props) => {
    const [listShop, setListShop] = useState([]);

    const [currentPage, setCurrentPage] = useState(2);
    // muốn thay đổi bao nhiêu kết quả trên 1 trang thì thay đổi n của currentLimit useState(n)
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPages, setTottalPages] = useState(0);

    //modal delete
    const [isShowModalDelete, setIUsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    // modal create/edit user
    const [isShowModalShop, setIsShowModalShop] = useState(false);
    const [actionModalShop, setActionModalShop] = useState("CREATE")
    const [dataModalShop, setDataModalShop] = useState({});

    // hàm useEffect để gọi API
    useEffect(() => {
        fetchShop();
    }, [currentPage])

    // tạo biến fetchUser hứng data từ backend bằng API
    const fetchShop = async () => {
        let respone = await fetchAllShop(currentPage, currentLimit);
        if (respone && respone.EC === 0) {
            setTottalPages(respone.DT.totalPages);
            setListShop(respone.DT.shop);
        }
    }
    // sự kiện khi nhắn nút sẽ refesh biến fetchUser 
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchShop();
    };
    const handleDeleteShop = async (shop) => {
        setDataModal(shop);
        setIUsShowModalDelete(true);
    }
    const handleClose = () => {
        setIUsShowModalDelete(false);
        setDataModal({});
    }
    const ConfirmDeleteShop = async () => {
        let respone = await deleteShop(dataModal);
        if (respone && respone.EC === 0) {
            toast.success(respone.EM);
            await fetchShop();
            setIUsShowModalDelete(false);
        } else {
            toast.error(respone.EM);
        }
    }

    const onHideModalShop = async () => {
        setIsShowModalShop(false);
        // set data rỗng khi tắt bảng
        setDataModalShop({})
        await fetchShop();
    }

    const handleRefesh = async () => {
        await fetchShop();
    }

    const handleEditShop = (shop) => {
        setActionModalShop("UPDATE")
        setDataModalShop(shop);
        setIsShowModalShop(true);
    }


    return (
        <>
            <div className="manager-user-container pt-3 px-5">
                <div className="user-header">
                    <div className="title">
                        <h3>Bảng Cửa hàng</h3>
                    </div>
                    <div className="action pb-3">
                        <button className="btn btn-success refesh"
                            onClick={() => {
                                handleRefesh()
                            }}>
                            <i className="fa fa-refresh "></i>Refesh
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => {
                                setIsShowModalShop(true)
                                setActionModalShop("CREATE")
                            }}>
                            <i className="fa fa-plus-circle"></i>Thêm mới cửa hàng
                        </button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">id</th>
                                <th scope="col">Ảnh nền của hàng</th>
                                <th scope="col">Tên cửa hàng</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Thời gian hoạt động</th>
                                <th scope="col">Hạn tiền nhà hàng chi tiêu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listShop && listShop.length > 0 ?
                                <>
                                    {listShop.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                {/* công thức NO tăng lên khi qua trang típ theo */}
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id_shop}</td>
                                                <td>
                                                    <img src={`http://localhost:8081/image/` + item.thumbnail} alt="" style={{ width: '100px', hegiht: '100px' }} />

                                                </td>
                                                <td>{item.nameShop}</td>
                                                <td>{item.address}</td>
                                                <td>{item.timeWork}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <span className="mx-3"
                                                        onClick={() => handleEditShop(item)}
                                                    >       <i className="fa fa-pencil edit" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="mx-3"
                                                        onClick={() => handleDeleteShop(item)}
                                                    ><i className="fa fa-trash delete" aria-hidden="true"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {/* {console.log('>> check listUser', setListUsers)} */}
                                    <tr><td>Not Found</td></tr></>
                            }
                        </tbody>
                    </table>
                </div>
                {/* thanh pagination */}
                {totalPages > 0 &&
                    <div className="user-footer">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
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

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                ConfirmDeleteUser={ConfirmDeleteShop}
                dataModal={dataModal}
            />
            <ModalShop
                onHide={onHideModalShop}
                show={isShowModalShop}
                action={actionModalShop}
                dataModalShop={dataModalShop}
            />
        </>
    );
};

export default Shop;
