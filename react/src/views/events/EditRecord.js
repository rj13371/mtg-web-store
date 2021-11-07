import React,{useState,Fragment,useContext} from 'react'
import axiosClient from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';
import ModalAlert from '../../components/ModalAlert';
import useInputState from '../../hooks/useInputState';

export default function EditRecord(props) {
  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

  const [record, handleRecordChange] = useInputState('')

  const {authState} = useContext(AuthContext)





  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      record: record,
      id: props.id || ''
    };

    await axiosClient({
      method: "put",
      url: `/decklist/editRecord/${props.id}`,
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
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Record"
            name="record"
            value={record}
            onChange={handleRecordChange}
          />
        </div>
         <input type="submit" value="Edit Record" /> 
      </form>
    </Fragment>

    )
}
