import React,{useContext} from "react";
import { ShoppingCartContext } from "../../../../context/ShoppingCartContext";
import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "react-bootstrap";
import axiosClient from "../../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CheckoutOrder() {

    const {cart} = useContext(ShoppingCartContext)
    const {authState} = useContext(AuthContext)



  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
     productArray: cart,
      userId: authState._id
    };

    console.log(body)
     

    await axiosClient({
      method: "post",
      url: "/orders/createorder/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
        console.log(response)
         })


  };

    return (
<Button variant="success" onClick={onSubmit}>
    Checkout 
      <FontAwesomeIcon icon='shopping-cart' size="sm" />
     </Button>
    )
}
