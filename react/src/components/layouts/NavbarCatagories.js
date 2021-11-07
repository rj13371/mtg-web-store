import React, { useContext, useState } from "react";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import { Nav, Navbar, Container } from "react-bootstrap";
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
            <Nav className='m-auto' style={{ fontSize: "22px",  fontWeight:'bold' }}>
              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/Warhammer%2040k">
                Warhammer 40k
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/board%20games">
                Board Games 
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/role%20playing%20games">
                Role Playing Games 
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/other%20tcg%20and%20dice%20games">
                Other TCG Games and Dice Games 
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/card%20accessories">
                Card accessories 
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/misc">
                Misc
              </Nav.Link>

              <Nav.Link style={{ paddingLeft: 20, paddingRight: 20 }} href="/products/catagory/Comic%20books">
                Comic Books
              </Nav.Link>

            </Nav>
            </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}
