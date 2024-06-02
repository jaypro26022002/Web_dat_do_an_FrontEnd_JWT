import axios from "axios";
import { useEffect, useState } from "react";
import { UploadFile } from "../../services/userService";

const FileUpload = (props) => {
    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.taget.files[0])
    }
    useEffect(() => {
        handleUpload();
    }, [])

    const handleUpload = async () => {
        const formdata = new FormData();
        formdata.append('image', file);
        let res = await UploadFile(formdata)
        {
            if (res.Status === "Succes") {
                console.log('succes')
            } else {
                console.log('failed')
            }
        }
    }
    // const handleUpload = () => {
    //     const formdata = new FormData();
    //     formdata.append('image', file);
    //     axios.post('', formdata).then(res => {
    //         if (res.data.Status === "Succes") {
    //             console.log('succes')
    //         } else {
    //             console.log('failed')
    //         }
    //     })
    //         .catch(err => console.log(err));
    // }
    return (
        <div className="container">
            <input type='file' onChange={handleFile} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <img src={`/images` + data.image} alt="" style={{}} />

        </div>
    );
};

export default
    FileUpload
