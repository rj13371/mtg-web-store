import React, { useState, Fragment, useContext } from "react";
import { Button } from "react-bootstrap";
import axiosClient from "../../../../utils/axios";
import ModalAlert from "../../../../components/ModalAlert";
import { AuthContext } from "../../../../context/AuthContext";


export default function ApproveOrder(props) {

    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0)
    const [header, setHeader] = useState('Success')

    const {authState} = useContext(AuthContext)

  const approveOrderSubmit = async (e) => {
    e.preventDefault()
    const body = {
        orderId: props.orderId,
      authorizationLevel: authState. authorization_level
    };

    try {

    await axiosClient({
      method: "post",
      url: "/orders/approveOrder/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {

  
        if (response.status == 200) {
          setHeader('Success')
          setMessage('Order approved, please prepare for customer pickup')
          setMessageCount(messageCount+1)
        }
  
           })
          }catch(e){
            setHeader('Error')
            setMessage('Order not approved')
            setMessageCount(messageCount+1)
          }
    
  };

  return (
    <Fragment>
              <ModalAlert header={header} message={message} messageCount={messageCount}/>
          <Button variant='danger' onClick={(e) => { approveOrderSubmit(e) }}>
              Approve Order
            </Button>

    </Fragment>
  );
}
