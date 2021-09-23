import React,{useContext, useState} from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//CHANGE CHECKOUT TO CHECKOUT ROUTE

export default function ShoppingCartContainer() {

    const {cart, addToCart, clearCart} = useContext(ShoppingCartContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
<>
<Button variant="primary" onClick={handleShow}>
<FontAwesomeIcon icon="shopping-cart" size="lg" />
</Button>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Shopping Cart</Modal.Title>
  </Modal.Header>
  <Modal.Body>{cart.length !== 0 ? cart.map(item => (
<div>
<p>{item.name}{` x${item.quantity}`} ${parseFloat(item.prices.usd) * parseFloat(item.quantity)} </p>
</div>
)) : 'Shopping Cart is Empty'}</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
    <FontAwesomeIcon icon='window-close' size="2x" />
    </Button>
    <Button variant="danger" onClick={clearCart}>
    <FontAwesomeIcon icon='trash' size="2x" />
    </Button>
    <Button variant="success" onClick={clearCart}>
    <FontAwesomeIcon icon='shopping-cart' size="2x" />
    </Button>
  </Modal.Footer>
</Modal>
</>

    )
}

