// import axios from "axios";
// import { useEffect, useState } from "react";
// import { UploadFile, fetchImg } from "../../services/userService";

// const FileUpload = (props) => {
//     const [file, setFile] = useState();
//     const [data, setData] = useState([]);

//     const handleFile = (e) => {
//         setFile(e.target.files[0])
//     }
//     // lay du lieu tu userService va refesh trang se hien ra data
//     useEffect(() => {
//         handleDisplay();
//     }, [])

//     const handleDisplay = async () => {
//         let res = await fetchImg()
//         {
//             if (res.EC === 0) {
//                 setData(res.DT[5])
//                 console.log(">> check data image", res)
//             } else {
//                 console.log('failed')
//             }
//         }
//     }
//     const handleUpload = async () => {
//         const formdata = new FormData();
//         formdata.append('image', file);
//         let res = await UploadFile(formdata)
//         {
//             if (res.EC === 0) {
//                 console.log('succes')
//             } else {
//                 console.log('failed')
//             }
//         }
//     }
//     return (
//         <div className="container">
//             <input type='file' onChange={handleFile} />
//             <button onClick={handleUpload}>Upload</button>
//             <br />
//             <img src={`http://localhost:8081/image/` + data.image} alt="" />
//         </div>
//     );
// };

// export default
//     FileUpload
