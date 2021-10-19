import React,{Component, useContext, useState,useRef, useEffect} from "react";
import { Button, Modal, Image, Container, Col, Row } from "react-bootstrap";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from "react-bootstrap";

//CHANGE CHECKOUT TO CHECKOUT ROUTE

export default function ShoppingCartContainer(props) {

    const {cart, addToCart, clearCart, removeItem, total} = useContext(ShoppingCartContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


 

    return (
<Container fluid>
<Button variant="primary" onClick={handleShow}>
<FontAwesomeIcon icon="shopping-cart" size="lg" />
</Button>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Shopping Cart</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    
<Container>
    {cart.length !== 0 ? cart.map((item, index) => (
<Row>
<Col >{item.name || item.productName}{` x${item.quantity}`} ${parseFloat(item.prices ? item.prices.usd: item.price) * parseFloat(item.quantity)} </Col>
<Col>
<Button variant="danger" onClick={()=>removeItem(index)}>
  <FontAwesomeIcon icon='trash' size="sm" />
 </Button>
 </Col>
</Row>
)) : 'Shopping Cart is Empty'}

{`Your Pre Total is: ${total}`}
</Container>
</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
    <FontAwesomeIcon icon='window-close' size="2x" />
    </Button>
    <Button variant="danger" onClick={clearCart}>
    <FontAwesomeIcon icon='trash' size="2x" />
    </Button>
    <Nav.Link href="/checkout">
    <Button variant="success"> 
    <FontAwesomeIcon icon='shopping-cart' size="2x" />
    </Button>
    </Nav.Link>
  </Modal.Footer>
</Modal>
</Container>

    )
}

