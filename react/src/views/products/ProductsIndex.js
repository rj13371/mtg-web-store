import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Container, Col, Row, Button } from "react-bootstrap";
import ShoppingCart from "../../components/cart/ShoppingCart";


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

      <Card className='m-auto' >
        <Card.Img className="w-75 h-75 p-3 m-auto" style={{ width:'25%',height:'25%', backgroundBlendMode:'normal'}} src={`${product.images[0].url}`} alt="product image cap" />
        <Card.Body className='m-auto'>
        <Card.Title tag="h5">{product.productName}</Card.Title>
        <Card.Subtitle tag='h3'>{product.productCategory} </Card.Subtitle>
          <Card.Text>${product.price || '0'}// In Stock: {product.stock} </Card.Text>

        <Button href={`/products/${product._id}`} variant="primary" size="lg">  Details </Button> <ShoppingCart stock={product.stock} product={product}/>
        {/* {authState.authorization_level==="1" && <EditMtgCard id={card._id} />} */}
        </Card.Body>
      </Card>

    </Col>
  ))}
</Row>
</Container>

    </div>
  
  );
}
