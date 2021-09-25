import React,{useContext, useState} from "react";
import { Button, Modal, Image, Container } from "react-bootstrap";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//CHANGE CHECKOUT TO CHECKOUT ROUTE

export default function ShoppingCartContainer() {

    const {cart, addToCart, clearCart, removeItem, total} = useContext(ShoppingCartContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
<Container fluid="md">
<Button variant="primary" onClick={handleShow}>
<FontAwesomeIcon icon="shopping-cart" size="lg" />
</Button>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Shopping Cart</Modal.Title>
  </Modal.Header>
  <Modal.Body>{cart.length !== 0 ? cart.map((item, index) => (
<div>
<p>{item.name}{` x${item.quantity}`} ${parseFloat(item.prices.usd) * parseFloat(item.quantity)} </p>
<Button variant="danger" onClick={()=>removeItem(index)}>
    <FontAwesomeIcon icon='trash' size="sm" />
    </Button>

</div>
)) : 'Shopping Cart is Empty'}
{`Your Pre Total is: ${total}`}

</Modal.Body>
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
</Container>

    )
}

