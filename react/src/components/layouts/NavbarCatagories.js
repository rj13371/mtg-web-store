import React, { useContext, useState } from "react";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import { Nav, Navbar, Container } from "react-bootstrap";
import ShoppingCartContainer from "../../containers/ShoppingCartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavbarCatagories(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Container fluid className='justify-content-center'>
        <Navbar
          sticky="top"
          className="p-1"
          bg="dark"
          variant="dark"
          expand="md"
        >

<Navbar.Toggle> <FontAwesomeIcon icon="chevron-circle-down" size="1x" /> </Navbar.Toggle >

<Navbar.Collapse>
            <Nav className='m-auto' style={{ fontSize: "22px", fontWeight:'bold',fontFamily: 'Fantasy, Copperplate, Papyrus' }}>
              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Warhammer 40k
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Board Games 
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Role Playing Games 
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Other TCG Games and Dice Games 
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Card accessories 
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Misc
              </Nav.Link>

              <Nav.Link href="/products/catagory/Warhammer%2040k">
                Comic Books
              </Nav.Link>

            </Nav>
            </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}
