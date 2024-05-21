import { useEffect, useState } from "react";
import './user.scss';
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const User = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // muốn thay đổi bao nhiêu kết quả trên 1 trang thì thay đổi n của currentLimit useState(n)
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTottalPages] = useState(0);

    const [isShowModalDelete, setIUsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [currentPage])

    // tạo biến fetchUser hứng data từ backend bằng API
    const fetchUser = async () => {
        let respone = await fetchAllUser(currentPage, currentLimit);
        if (respone && respone.data && respone.data.EC === 0) {
            setTottalPages(respone.data.DT.totalPages)
            setListUsers(respone.data.DT.users);
        }
    }

    // sự kiện khi nhắn nút sẽ refesh biến fetchUser 
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchUser();
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
        if (respone && respone.data.EC === 0) {
            toast.success(respone.data.EM);
            await fetchUser();
            setIUsShowModalDelete(false);
        } else {
            toast.error(respone.data.EM);
        }
    }

    const onHideModalUser = () => {
        setIsShowModalUser(false);
    }

    return (
        <>
            <div className="manager-user-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>
                    <div className="action">
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary" onClick={() => { setIsShowModalUser(true) }}>Add new user</button>
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
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
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

            {/* ModalDelete để sử lý ModalDelete biến bên trái(file ModalDelete.js) = phải(file user.js) */}
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                ConfirmDeleteUser={ConfirmDeleteUser}
                dataModal={dataModal}

            />
            <ModalUser
                title={"Create new user"}
                onHide={onHideModalUser}
                show={isShowModalUser}
            />
        </>
    );
}
export default User;
