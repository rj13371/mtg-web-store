import React, { useState, Fragment } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchAll from "./SearchAll";
import ProductSearch from "./ProductSearch";
import CardSearch from "./CardSearch";
import ProductCategorySearch from "./ProductCategorySearch";
import CardSetSearch from "./CardSetSearch";

export default function Searchbar() {
  const [searchbar, setSearchBar] = useState("all");

  return (
    <Container fluid="xl">
      <Row className="justify-content-center">
        <Col className="mt-3 mb-3" xs={2} md={1}>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
              <FontAwesomeIcon icon="search" size="1x" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSearchBar("all")}>
                Search All Products and Cards
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBar("card")}>
                Search By Card
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBar("product")}>
                Search By Product
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBar("cardSet")}>
                Search By Card Set
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBar("productCategory")}>
                Search By Product Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        {searchbar === "all" ? <SearchAll /> : null}
        {searchbar === "card" ? <CardSearch /> : null}
        {searchbar === "product" ? <ProductSearch /> : null}
        {searchbar === "cardSet" ? <CardSetSearch /> : null}
        {searchbar === "productCategory" ? <ProductCategorySearch /> : null}
      </Row>
    </Container>
  );
}
