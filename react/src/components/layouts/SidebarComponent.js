import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { Button, Container } from "react-bootstrap";
import useWindowSize from "../../hooks/useWindowSize";
import React, { Fragment, useState } from "react";


export default function SidebarComponent() {
  const [open, setOpen] = useState({ width: "0" });

  const size = useWindowSize();

  function openNav(e) {
    e.preventDefault();
    setOpen({ width: "250px" });
  }

  function closeNav(e) {
    e.preventDefault();
    setOpen({ width: "0" });
  }
  // FIX PRODUCTS ROUTES
  return (
<Fragment >
      <div id="mySidenav" className="sidenav" style={open}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="danger" onClick={closeNav}>
          {" "}
          <FontAwesomeIcon icon="arrow-left" size="1x" />{" "}
        </Button>
        <a href="/products/catagory/Warhammer%2040k">Warhammer 40k</a>
        <a href="/products/catagory/board%20games">Board Games</a>
        <a href="/products/catagory/role%20playing%20games">Role Playing Games</a>
        <a href="/products/catagory/other%20tcg%20and%20dice%20games">Other TCG and Dice Games</a>
        <a href="/products/catagory/card%20accessories">Card Accessories</a>
        <a href="/products/catagory/misc">Misc</a>
        <a href="/products/catagory/Comic%20books">Comic Books</a>

      </div>

      {size.width < 500?   
       
       <Button className='mx-auto p-1 mb-1 mt-1' style={{width:'300px', display:'block'}} size="lg" variant="danger" onClick={openNav}>
        Store Catagories{'  '}
        <FontAwesomeIcon icon="store" size="1x" />
      </Button> : null }
      </Fragment>
  );
}
