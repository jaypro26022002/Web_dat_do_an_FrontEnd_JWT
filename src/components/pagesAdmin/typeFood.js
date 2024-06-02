import { useEffect, useState } from "react";
// import './user.scss';
import { fetchAllType } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
// import ModalDelete from "./ModalDelete";
import ModalType from "../Modal/ModalType";

const Type = (props) => {
    const [listType, setListType] = useState([]);

    const [currentPage, setCurrentPage] = useState(2);
    // muốn thay đổi bao nhiêu kết quả trên 1 trang thì thay đổi n của currentLimit useState(n)
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTottalPages] = useState(0);

    //modal delete
    const [isShowModalDelete, setIUsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    // modal create/edit type
    const [isShowModalType, setIsShowModalType] = useState(false);
    const [actionModalType, setActionModalType] = useState("CREATE")
    const [dataModalType, setDataModalType] = useState({});

    const [imgSrc, setImgSrc] = useState('')

    // hàm useEffect để gọi API
    useEffect(() => {
        fetchType();
    }, [currentPage])

    // tạo biến fetchUser hứng data từ backend bằng API
    const fetchType = async () => {
        let respone = await fetchAllType(currentPage, currentLimit);
        // console.log(">> check respone fetchUser", respone)
        if (respone && respone.EC === 0) {
            setTottalPages(respone.DT.totalPages);
            setListType(respone.DT.type);
        }
    }
    // sự kiện khi nhắn nút sẽ refesh biến fetchUser 
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchType();
    };

    const handleDeleteType = async (type) => {
        setDataModal(type);
        setIUsShowModalDelete(true);
    }

    const handleClose = () => {
        setIUsShowModalDelete(false);
        setDataModal({});
    }

    // const ConfirmDeleteType = async () => {
    //     let respone = await deleteType(dataModal);
    //     if (respone && respone.EC === 0) {
    //         toast.success(respone.EM);
    //         await fetchType();
    //         setIUsShowModalDelete(false);
    //     } else {
    //         toast.error(respone.EM);
    //     }
    // }

    const onHideModalType = async () => {
        setIsShowModalType(false);
        // set data rỗng khi tắt bảng
        setDataModalType({})
        await fetchType();

    }

    const handleEditType = (type) => {
        setActionModalType("UPDATE")
        setDataModalType(type);
        setIsShowModalType(true);
    }

    const handleRefesh = async () => {
        await fetchType();
    }

    return (
        <>
            <div className="manager-user-container pt-3 px-5">
                <div className="user-header">
                    <div className="title">
                        <h3>Bảng thể loại món ăn</h3>
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
                                setIsShowModalType(true)
                                setActionModalType("CREATE")
                            }}>
                            <i className="fa fa-plus-circle"></i>Add new user
                        </button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">id</th>
                                <th scope="col">Thể loại</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listType && listType.length > 0 ?
                                <>
                                    {listType.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                {/* công thức NO tăng lên khi qua trang típ theo */}
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id_type_product}</td>
                                                <td>{item.nameType}</td>
                                                <td>
                                                    <span className="mx-3"
                                                        onClick={() => handleEditType(item)}
                                                    >       <i className="fa fa-pencil edit" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="mx-3"
                                                        onClick={() => handleDeleteType(item)}
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

            {/* <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                ConfirmDeleteUser={ConfirmDeleteUser}
                dataModal={dataModal}
            /> */}
            <ModalType
                onHide={onHideModalType}
                show={isShowModalType}
                action={actionModalType}
                dataModalUser={dataModalType}
            />
        </>
    );
};

export default Type;
