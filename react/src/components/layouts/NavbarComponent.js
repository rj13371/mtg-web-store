import React,{useState} from "react";
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

import { Link } from "react-router-dom";

export default function NavbarComponent() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
    <Container>
    <Navbar className="bg-light justify-content-between" color="light" light expand="md">
      <NavbarBrand href="/">Mtg Web Store</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#">Events</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Buylist</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Magic The Gathering
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
        </Nav>
        <NavbarText className="mr-auto">Simple Text</NavbarText>
      </Collapse>
    </Navbar>
    </Container>
  </div>
  );
}


            
{/* <input type='text' value={query} placeholder='search for food' onChange={handleChange}></input>
<Link to={`/food/${query}/drink/${query}`}>Go</Link>
<button onClick={handleClick}>save to db</button> */}