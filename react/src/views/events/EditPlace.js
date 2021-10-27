import React,{useState,Fragment,useContext} from 'react'
import axiosClient from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';
import ModalAlert from '../../components/ModalAlert';
import useInputState from '../../hooks/useInputState';

export default function EditPlace(props) {
  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

  const [place, handleplaceChange] = useInputState('')

  const {authState} = useContext(AuthContext)

console.log(place)



  const onSubmit = async (e) => {
    e.preventDefault();


    const body = {
      place: place,
      id: props.id || ''
    };

    await axiosClient({
      method: "put",
      url: `/decklist/editPlace/${props.id}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {


      try {
        setHeader('Success')
        setMessage(JSON.stringify (response.data))
        setMessageCount(messageCount+1)
      }catch(e){
        setHeader('Error')
        setMessage(JSON.stringify (e))
        setMessageCount(messageCount+1)
      }
         })



  };

  if(authState.authorization_level=='0' || !authState.authorization_level ){
    return <Fragment></Fragment>
  }


    return (           
            <Fragment>
              <ModalAlert header={header} message={message} messageCount={messageCount} />
      <form onSubmit={(e)=> onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="place"
            name="place"
            value={place}
            onChange={handleplaceChange}
          />
        </div>
         <input type="submit" value="Edit place" /> 
      </form>
    </Fragment>

    )
}
