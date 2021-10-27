import React, { useState, useEffect,useContext } from "react";
import axiosClient from "../../utils/axios";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import ShoppingCart from "../../components/cart/ShoppingCart";
import { AuthContext } from "../../context/AuthContext";
import { Fragment } from "react";



  export default function ProductsIndex() {
    const {authState} = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);
  
    const {productName} = useParams()
  
  
  
    useEffect(() => {
  
      setisLoading(true)
  
      const grabProducts = async () => {
  
        await axiosClient({
          method: "get",
          url: `/products/productName/${productName}`, //change this to route in BE
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          console.log(response)
          setProducts([...response.data]);
          setisLoading(false)
        });
  
    };
    grabProducts();
    }, []);


  return (

    <Fragment>

{isLoading? <Loading/> : 
      
      <Container>
      
      
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
      </Container>}

    </Fragment>

  )}
