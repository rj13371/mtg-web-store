import React,{useContext, useState} from "react";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import { Nav, Navbar, Container } from "react-bootstrap";
import ShoppingCartContainer from "../../containers/ShoppingCartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavbarComponent(props) {

  const {cart} = useContext(ShoppingCartContext)

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  return (

    <>
    <Container >
  <Navbar sticky="top" className="p-1" bg="dark" variant="dark" expand='md' >
    
    <Navbar.Brand href="/"> <img className="rounded" width="100" height="100" src="logo.jpg" alt="store logo" /> </Navbar.Brand>
    <Navbar.Toggle> <FontAwesomeIcon icon="chevron-circle-down" size="2x" /> </Navbar.Toggle >
    <Navbar.Collapse className="justify-content-end">
    <Nav className="me-auto">
      <Nav.Link href="/events/">Events</Nav.Link>
      <Nav.Link href="#features">Buylist</Nav.Link>
      <Nav.Link href="/employeedashboard">Dashboard</Nav.Link>
      <Nav.Link href="/contact">Contact</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link><ShoppingCartContainer/></Nav.Link>
      
    </Nav>
    </Navbar.Collapse>
  </Navbar>

  </Container>
    </>

  );
}

