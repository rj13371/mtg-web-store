import React,{useState,Fragment,useContext} from 'react'
import axiosClient from '../../utils/axios';
import { AuthContext } from "../../context/AuthContext";
import ModalAlert from '../../components/ModalAlert';

export default function EditMtgCard(props) {
  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

  const {authState} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    stock: "",
    price: ""
  })

  console.log(formData)

  const {
    stock,
    price,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      stock: stock,
      price: price,
      id: props.id || ''
    };

    await axiosClient({
      method: "put",
      url: `/mtgcards/${props.id}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      if(response.data.message.errors){
        setHeader('Error')
        setMessage(JSON.stringify (response.data.message))
        setMessageCount(messageCount+1)
      }

      else{
        setHeader('Success')
        setMessage(JSON.stringify (response.data.message))
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
            type="number"
            placeholder="Stock"
            name="stock"
            value={stock}
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={onChange}
          />
        </div>
         <input type="submit" value="EditMtgCard" /> 
      </form>
    </Fragment>

    )
}
