import { useEffect, useState } from "react";
import './user.scss';
import { fetchAllUser, deleteUser, fetchAllFood } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import ModalFood from "./ModalFood";

const User = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [listFood, setListFood] = useState([]);

    const [currentPage, setCurrentPage] = useState(2);
    // muốn thay đổi bao nhiêu kết quả trên 1 trang thì thay đổi n của currentLimit useState(n)
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTottalPages] = useState(0);

    //modal delete
    const [isShowModalDelete, setIUsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    // modal create/edit user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({});

    // modal create/edit food
    const [isShowModalFood, setIsShowModalFood] = useState(false);
    const [actionModalFood, setActionModalFood] = useState("CREATE")
    const [dataModalFood, setDataModalFood] = useState({});

    const [imgSrc, setImgSrc] = useState('')

    // hàm useEffect để gọi API
    useEffect(() => {
        fetchUser();
        fetchFood();
    }, [currentPage])

    // tạo biến fetchUser hứng data từ backend bằng API
    const fetchUser = async () => {
        let respone = await fetchAllUser(currentPage, currentLimit);
        // console.log(">> check respone fetchUser", respone)
        if (respone && respone.EC === 0) {
            setTottalPages(respone.DT.totalPages);
            setListUsers(respone.DT.users);
        }
    }

    const fetchFood = async () => {
        let respone1 = await fetchAllFood(currentPage, currentLimit);
        // console.log(">> check respone fetchUser", respone1)
        if (respone1 && respone1.EC === 0) {
            setTottalPages(respone1.DT.totalPages)
            setListFood(respone1.DT.food);
        }
    }

    // sự kiện khi nhắn nút sẽ refesh biến fetchUser 
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchUser();
    };
    // sự kiện khi nhắn nút sẽ refesh biến fetchUser 
    const handlePageClick1 = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchFood();
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIUsShowModalDelete(true);
    }

    const handleClose = () => {
        setIUsShowModalDelete(false);
        setDataModal({});
    }

    const ConfirmDeleteUser = async () => {
        let respone = await deleteUser(dataModal);
        if (respone && respone.EC === 0) {
            toast.success(respone.EM);
            await fetchUser();
            setIUsShowModalDelete(false);
        } else {
            toast.error(respone.EM);
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        // set data rỗng khi tắt bảng
        setDataModalUser({})
        await fetchUser();

    }
    const onHideModalFood = async () => {
        setIsShowModalFood(false);
        setDataModalFood({})
        await fetchFood();
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user);
        setIsShowModalUser(true);
    }

    const handleRefesh = async () => {
        await fetchUser();
    }
    const handleRefesh1 = async () => {
        await fetchFood();
    }


    const handleEditFood = (food) => {
        let imageBase64 = '';
        if (typeof food.thumbnail === 'string') {
            imageBase64 = food.thumbnail.startsWith('data:image/') ? food.thumbnail : `data:image/jpeg;base64,${food.thumbnail}`;
        }
        setDataModalFood({
            ...food,
            previewImgURL: imageBase64,
            avatar: imageBase64
        });
        setActionModalFood("UPDATE");
        setIsShowModalFood(true);
    };


    return (
        <>
            <div className="manager-user-container pt-3 px-5">
                <div className="user-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>
                    <div className="action pb-3">
                        <button className="btn btn-success refesh"
                            onClick={() => {
                                handleRefesh1()
                            }}>
                            <i className="fa fa-refresh "></i>Refesh
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => {
                                setIsShowModalUser(true)
                                setActionModalUser("CREATE")
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
                                <th scope="col">email</th>
                                <th scope="col">username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                {/* công thức NO tăng lên khi qua trang típ theo */}
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id_user}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <span className="mx-3"
                                                        onClick={() => handleEditUser(item)}
                                                    >       <i className="fa fa-pencil edit" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="mx-3"
                                                        onClick={() => handleDeleteUser(item)}
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
            {/* --------------------------------------------------------*/}
            {/* table dishes */}
            <div className="manage-food-container mt-3">
                <div className="food-header">
                    <div className="title">
                        <h3>Table Food</h3>
                    </div>
                    <div className="action pb-3">
                        <button className="btn btn-success refresh" onClick={handleRefesh1}>
                            <i className="fa fa-refresh"></i> Refresh
                        </button>
                        <button className="btn btn-primary" onClick={() => { setIsShowModalFood(true); setActionModalFood("CREATE"); }}>
                            <i className="fa fa-plus-circle"></i> Add new food
                        </button>
                    </div>
                </div>
                <div className="food-body">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>thumbnail</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>price down</th>
                                    <th>quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listFood && listFood.length > 0 &&
                                    listFood.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{item.id}</td>
                                                <td>
                                                    {typeof item.thumbnail === 'string' && (
                                                        <img src={item.thumbnail.startsWith('data:image/') ? item.thumbnail : `data:image/jpeg;base64,${item.thumbnail}`} className="food-thumbnail" alt="food" />
                                                    )}
                                                </td>
                                                <td>{item.nameFood}</td>
                                                <td>{item.price}</td>
                                                <td>{item.pricedown}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => handleEditFood(item)}>Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {listFood && listFood.length === 0 &&
                                    <tr>
                                        <td colSpan="7">No data found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick1}
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
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                ConfirmDeleteUser={ConfirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
            <ModalFood
                onHide={onHideModalFood}
                show={isShowModalFood}
                action={actionModalFood}
                dataModalFood={dataModalFood}
            />
        </>
    );
};

export default User;
