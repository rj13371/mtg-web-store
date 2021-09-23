import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function FooterComponent() {
  return (
    <Navbar bg="dark" className="p-1" variant="dark" sticky="bottom" >
      <Nav className="justify-content-start">

        <Nav.Item>
          
        <Nav.Link href="/home">© Bastion Games</Nav.Link>

        </Nav.Item>

        <Nav.Item>

        <Nav.Link ><FontAwesomeIcon icon={['fab', 'cc-paypal']} size="2x" /></Nav.Link>
        
        </Nav.Item>

        <Nav.Item>

<Nav.Link ><FontAwesomeIcon icon={['fab', 'cc-visa']}  size="2x"/></Nav.Link>

</Nav.Item>

<Nav.Item>

<Nav.Link ><FontAwesomeIcon icon={['fab', 'cc-mastercard']} size="2x" /></Nav.Link>

</Nav.Item>

<Nav.Item>

<Nav.Link><FontAwesomeIcon icon={['fab', 'cc-stripe']} size="2x" /></Nav.Link>

</Nav.Item>
        
      </Nav>
    </Navbar>
  );
}
