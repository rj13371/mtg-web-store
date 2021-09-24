import React, {useContext, useEffect, useState} from 'react'
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ShoppingCart(props) {


    const { cart, addToCart, clearCart } = useContext(ShoppingCartContext);

    const [product, setProduct] = useState();

    useEffect(()=>{
        setProduct(props.product)
    },[props.product])


  const [quantity, setQuantity] = useState("1");

    return (
        <Container className="mb-3 pt-2">
            
            <Form>
            <Row xs="auto">
            <Col>
            <Button variant="success" onClick={() => addToCart(product, quantity)}>
            <FontAwesomeIcon icon='cart-plus' size="lg" />
            </Button>
            </Col>

            <Col >
            <Form.Control
            style={{width: '50px'}}
              type="number"
              placeholder="0"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            
            </Col>
            </Row>
          </Form>

        </Container>
    )
}
