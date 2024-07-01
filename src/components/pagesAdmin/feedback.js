import React, { useEffect, useState } from "react";
// import './user.scss';
import { fetchFeedback } from "../../services/userService";
import { toast } from "react-toastify";

const Feedback = (props) => {
    const [listFeedback, setListFeedback] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchFeedback();
            // console.log("API Response:", response); // Log the API response for debugging
            if (response && response.EC === 0) {
                // console.log("Fetched Data:", response.DT); // Log the fetched data for debugging
                setListFeedback(response.DT); // Update state with fetched data
            } else {
                toast.error("Failed to fetch feedback data");
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
            toast.error("Failed to fetch feedback data");
        }
    }


    const handleRefresh = async () => {
        await fetchData();
    }

    return (
        <div className="manager-user-container pt-3 px-5">
            <div className="user-header">
                <div className="title">
                    <h3>Bảng lấy lời khai khách hàng</h3>
                </div>
                <div className="action pb-3">
                    <button className="btn btn-success refresh"
                        onClick={handleRefresh}>
                        <i className="fa fa-refresh"></i> Refresh
                    </button>
                </div>
            </div>
            <div className="user-body">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Tên người phản hồi</th>
                            <th scope="col">Nội dung phản hồi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listFeedback && listFeedback.length > 0 ?
                            listFeedback.map((item, index) => (
                                <tr key={`row-${index}`}>
                                    <td>{item.id_contact}</td>
                                    <td>{item.nameUser}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))
                            :
                            <tr><td colSpan="4">Not Found</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedback;
