import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

// move CART into new component

export default function ProductDisplay(props) {
  const [product, setProduct] = useState({
    productName: "",
  });


  const location = useLocation();
  const { id } = useParams();


  useEffect(() => {
    const grabProduct = async () => {
      if (!location.state) {
        await axios({
          method: "get",
          url: `/products/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          setProduct({ ...response.data });
        });
      } else {
        setProduct({ ...location.state });
      }
    };
    grabProduct();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col lg>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          src={`/test.png`}
          alt="card image"
        />
      </Card>
      </Col>

      <Col>
      <Card>
        <Card.Body>
          <Card.Title tag="h5">{product.productName}{product.mana_cost}</Card.Title>
          <Card.Text>{product.productCategory}</Card.Text>
          </Card.Body>
      </Card>
      </Col>

      </Row>
      </Container>

    </div>
  );
}
