import React,{useContext, useState} from "react";
import { ShoppingCartContext } from "../../../../context/ShoppingCartContext";
import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "react-bootstrap";
import axiosClient from "../../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAlert from "../../../../components/ModalAlert";

export default function CheckoutOrder() {

  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

    const {cart, total, clearCart} = useContext(ShoppingCartContext)
    const {authState} = useContext(AuthContext)



  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
     productArray: cart,
      userId: authState._id,
      total: total
    };

    console.log(body)
     
    try {
    await axiosClient({
      method: "post",
      url: "/orders/createorder/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {

  
      if (response.status == 200) {
        setHeader('Success')
        setMessage('Order Submited! Please check your email for confirmation')
        setMessageCount(messageCount+1)
        clearCart()
      }

         })
        }catch(e){
          setHeader('Error')
          setMessage('Order not submitted, something went wrong :(')
          setMessageCount(messageCount+1)
        }


  };

    return (
<Button variant="success" onClick={onSubmit}>
<ModalAlert header={header} message={message} messageCount={messageCount}/>
    Checkout 
      <FontAwesomeIcon icon='shopping-cart' size="sm" />
     </Button>
    )
}
