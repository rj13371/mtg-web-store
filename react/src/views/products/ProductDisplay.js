import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import ShoppingCart from "../../components/cart/ShoppingCart";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

// move CART into new component

export default function ProductDisplay(props) {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: '',
    stock: '',
    price: '',
    productCategory: '',
    onSale: false,
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
          console.log(response)
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
      <Card style={{ width: '18rem', color:'white' }}>
        <Card.Img
          src={`/test.png`}
          alt="card image"
        />
      </Card>
      </Col>

      <Col>
      <Card style={{ color:'black' }}>
        <Card.Body>
          <Card.Title tag="h5">{product.productName}</Card.Title>
          <Card.Text>{product.productCategory}</Card.Text>
          <Card.Text>{product.productDescription}</Card.Text>
          <Card.Text>{product.price}</Card.Text>
          <Card.Text>{product.stock}</Card.Text>
          </Card.Body>
      </Card>
      </Col>

      </Row>

      <ShoppingCart product={product}/>
      </Container>

    </div>
  );
}
