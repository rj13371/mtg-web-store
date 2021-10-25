import React,{useContext, useEffect, useState} from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import ShoppingCartContainer from "../../containers/ShoppingCartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../logo.jpg'
import Loading from "../Loading";


export default function NavbarComponent() {

  const { authState, loadingAuth } = useContext(AuthContext)



    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



  return (

    <>
    <Container fluid >
  <Navbar sticky="top" className="p-1" bg="dark" variant="dark" expand='md' >
    
    <Navbar.Brand href="/"> <img className="rounded" width="100" height="100" src={logo} alt="store logo" /> </Navbar.Brand>

    <Navbar.Text >
    <ShoppingCartContainer /> 
    </Navbar.Text>

    {loadingAuth? <Navbar.Text> <Loading navbar={true}/> </Navbar.Text>  : null }

    {!loadingAuth && authState.email ? <Nav.Link href="/logout">
    <FontAwesomeIcon icon='sign-out-alt' size="lg" color='red' />
    </Nav.Link> : null }

    {!loadingAuth && !authState.email ? <Nav.Link href="/login">
    <FontAwesomeIcon icon="user" size="lg" color='green' />
    </Nav.Link>  : null }


    <Navbar.Toggle> <FontAwesomeIcon icon="chevron-circle-down" size="2x" /> </Navbar.Toggle >
    <Navbar.Collapse>
    <Nav style={{ fontSize:'24px',marginLeft: '120px'}}  >
      <Nav.Link style={{ marginRight: '20px' }} href="/events/">Events</Nav.Link>
      <Nav.Link style={{ marginRight: '20px' }} href="#features">Buylist</Nav.Link>
      <Nav.Link style={{ marginRight: '20px' }} href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link style={{ marginRight: '20px' }} href="/contact">Contact</Nav.Link>
      <Nav.Link style={{ marginRight: '20px' }} href="/about">About</Nav.Link>
      
    </Nav>
    </Navbar.Collapse>
  </Navbar>

  </Container>
    </>

  );
}

