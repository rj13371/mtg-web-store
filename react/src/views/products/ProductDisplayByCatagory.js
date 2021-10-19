import React, {useState, useEffect} from 'react'
import ShoppingCart from '../../components/cart/ShoppingCart';
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import axios from 'axios';
import { useParams } from 'react-router';

export default function ProductDisplayByCatagory() {

    const [products, setProducts] = useState([]);
    
      const { catagoryName } = useParams();
    
    
      useEffect(() => {
        const grabProducts = async () => {

            await axios({
              method: "get",
              url: `/products/catagory/${catagoryName}`,
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              console.log(response)
              setProducts([...response.data]);
            });

        };
        grabProducts();
      }, []);

    return (
<Container>

{products.length === 0 ? 'no results': null}

    <Row xs={1} md={3} className="g-4">
  {products.map((product) => (
    <Col>
      <Card className='justify-content-center' >
 
        <Card.Body>
        <Card.Text>{product.productName} </Card.Text>
        <Card.Img className="w-75 h-75 p-3" src={`${product.images[0].url}`} alt="Card image cap" />
          <Card.Text>${product.price} </Card.Text>
          <Card.Text>In Stock: {product.stock} </Card.Text>

        <Button href={`/products/${product._id}`} variant="primary" size="lg">  Details </Button> <ShoppingCart stock={product.stock} product={product}/>

        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>
    )
}
