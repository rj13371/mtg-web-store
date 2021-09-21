import React,{useContext, useState} from "react";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavbarText,
  UncontrolledDropdown,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Form,
  Input,
} from "reactstrap";


export default function NavbarComponent(props) {

  const {cart} = useContext(ShoppingCartContext)

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div>



    <Container className="d-flex justify-content-start">
    <Navbar className="bg-light" color="light" light expand="md">
      <NavbarBrand href="/">
     
      <img className="rounded" width="100" height="100" src="logo.jpg" alt="store logo" />

      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-start" navbar>
          <NavItem>
            <NavLink href="#">Events</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Buylist</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/employeedashboard">Dashboard</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              About
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/contact/">Contact Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">About</NavLink>
          </NavItem>
        </Nav>
        <NavbarText className="">Simple Text</NavbarText>
      </Collapse>
    </Navbar>
    </Container>
  </div>
  );
}


            
{/* <input type='text' value={query} placeholder='search for food' onChange={handleChange}></input>
<Link to={`/food/${query}/drink/${query}`}>Go</Link>
<button onClick={handleClick}>save to db</button> */}