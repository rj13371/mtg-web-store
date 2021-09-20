import React, {useEffect, useState} from 'react'
import axiosClient from '../../../utils/axios';

export default function CloudinaryWidget() {
    
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    useEffect(()=>{
        const myWidget = window.cloudinary.createUploadWidget(
            {
              cloudName: "dwxcp0a8j",
              uploadPreset: "pgqdbzeq"
            },
            (error, result) => {
              if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);

                // const body = {
                //     images: {url: url}
                //   };

                // await axiosClient({
                //     method: "post",
                //     url: "/products/addproduct/",
                //     data: body,
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   }).then(response => {
                //       console.log(response)
                //        })

              }
            }
          );
          document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
              myWidget.open();
            },
            false
          );
    },[])

    return (
        <div>
<button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
        </div>
    )
}
