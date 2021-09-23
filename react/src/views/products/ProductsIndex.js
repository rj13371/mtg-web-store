import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Container, Col, Row, Button } from "react-bootstrap";


export default function ProductsIndex() {
  const [products, setproducts] = useState([]);

  const location = useLocation();
  const query = JSON.parse(location.state.query);
  const res = query.data;


  useEffect(() => {
    setproducts(res);
    console.log(products);
  }, []);


  return (

    <div>
      
<Container>

{products.length === 0 ? 'no results': null}

    <Row xs={1} md={3} className="g-4">
  {products.map((product) => (
    <Col>
      <Card>
        <Card.Body>
        <Card.Title tag="h5">{product.productName}</Card.Title>
        <Card.Subtitle tag='h3'>{product.productCatagory} </Card.Subtitle>

          <Button href={`/products/${product._id}`} variant="primary" size="lg">  Details </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>

    </div>
  
  );
}
