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

    // modal create/edit
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({});

    const [isShowModalFood, setIsShowModalFood] = useState(false);


    // hàm useEffect để gọi API
    useEffect(() => {
        fetchUser();
        fetchFood();
    }, [currentPage])

    // tạo biến fetchUser hứng data từ backend bằng API
    const fetchUser = async () => {
        let respone = await fetchAllUser(currentPage, currentLimit);
        console.log(">> check respone fetchUser", respone)
        if (respone && respone.EC === 0) {
            setTottalPages(respone.DT.totalPages);
            setListUsers(respone.DT.users);
        }
    }

    const fetchFood = async () => {
        let respone1 = await fetchAllFood(currentPage, currentLimit);
        if (respone1 && respone1.EC === 0) {
            setTottalPages(respone1.DT.totalPages)
            setListFood(respone1.DT.food);

            console.log(">> check food: ", respone1.DT)
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
    const onHideModalFood = () => {
        setIsShowModalFood(false);
        setDataModalUser({})
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user);
        setIsShowModalUser(true);
    }

    const handleRefesh = async () => {
        await fetchUser();
    }
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
                                handleRefesh()
                            }}
                        >
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
                            {/* if dạng js */}
                            {/* { 'if'
                            <>Đúng thì ra kq ở đây</>
                            :
                            <>Sai thì ra kq ở đây</>
                        } */}
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                {/* công thức NO tăng lên khi qua trang típ theo */}
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
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
            {/* --------------------------------------------------------------------------------------


*/}
            {/* table dishes */}
            <div className="manager-user-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table food</h3>
                    </div>
                    <div className="action">
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary" onClick={() => { setIsShowModalFood(true) }}>Add new Dishes</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">id</th>
                                <th scope="col">Thumbnail</th>
                                <th scope="col">Name Food</th>
                                <th scope="col">price</th>
                                <th scope="col">pricedown</th>
                                <th scope="col">quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* if dạng js */}
                            {/* { 'if'
                            <>Đúng thì ra kq ở đây</>
                            :
                            <>Sai thì ra kq ở đây</>
                        } */}
                            {listFood && listFood.length > 0 ?
                                <>
                                    {listFood.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.thumbnail}</td>
                                                <td>{item.nameFood}</td>
                                                <td>{item.pricedown}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td><button className="btn btn-primary mx-3">Edit</button>
                                                    <button className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >Deleted</button>

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

            {/* ModalDelete để sử lý ModalDelete biến bên trái(file ModalDelete.js) = phải(file user.js) */}
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
                title={"Add new food "}
                onHide={onHideModalFood}
                show={isShowModalFood}
            />
            <div className="image-upload">
                <h3>Upload Image</h3>
                <input type="file" />
                <button>Upload</button>
            </div>

        </>
    );
}
export default User;
