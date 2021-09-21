import React, {useEffect, useState} from 'react'

import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

export default function CloudinaryWidget(props) {
    
     const [images, setImages] = useState();

    useEffect(()=>{
      setImages(props.images)
    },[])

    const addImage = (res) => {
      const newImage = {name: res.info.original_filename, url: res.info.secure_url}

      props.onChange(newImage);

      
      console.log(newImage)
    }

    return (
<>
      <WidgetLoader/>
    <Widget
      sources={['local', 'camera']}
      cloudName={'dwxcp0a8j'} 
      uploadPreset={'pgqdbzeq'} 
      buttonText={'Upload images'}
      style={{
        color: 'white',
        border: 'none',
        width: '120px',
        backgroundColor: 'green',
        borderRadius: '4px',
        height: '25px'
      }}
//[{name: res.info.original_filename, url: res.info.secure_url}]
      onSuccess={(res) => addImage(res)}
      onFailure={(res) => console.log(res)}
      logging={true}
      apiKey={''}
      accepts={'application/json'}
      contentType={'application/json'}
      withCredentials={true}
      unique_filename={true}
      resourceType={'image'}
    />
  </>
    )
}
