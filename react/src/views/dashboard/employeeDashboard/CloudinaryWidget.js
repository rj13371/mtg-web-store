import React, {useEffect, useState} from 'react'
import ModalAlert from '../../../components/ModalAlert';

import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

export default function CloudinaryWidget(props) {

  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')
    
     const [images, setImages] = useState();

    useEffect(()=>{
      setImages(props.images)
    },[])

    const errorMsg = (res) => {
      setHeader('Image upload vailed')
      setMessage(`error ${res}`)
      setMessageCount(messageCount+1)
    }

    const addImage = (res) => {
      const newImage = {name: res.info.original_filename, url: res.info.secure_url}

      props.onChange(newImage);

      
      console.log(newImage)
    }

    return (
<>
<ModalAlert header={header} message={message} messageCount={messageCount}/>
      <WidgetLoader/>
    <Widget
      sources={['local', 'camera', 'url', 'facebook', 'image_search', 'google_drive']}
      cloudName={'dwxcp0a8j'} 
      uploadPreset={'pgqdbzeq'} 
      buttonText={'Upload image'}
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
      onFailure={(res) => errorMsg(res)}
      logging={true}
      cropping={true}
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
