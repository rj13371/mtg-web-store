import React, { useState, useEffect,useContext } from "react";
import axiosClient from "../../utils/axios";
import EditMtgCard from "./EditMtgCard";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import ShoppingCart from "../../components/cart/ShoppingCart";
import { AuthContext } from "../../context/AuthContext";
import { Fragment } from "react";

 


export default function Mtgcardsindex() {
  const {authState} = useContext(AuthContext)
  const [cards, setCards] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const {cardName} = useParams()



  useEffect(() => {

    setisLoading(true)

    const grabCards = async () => {

      await axiosClient({
        method: "get",
        url: `/mtgcards/cardSearch/${cardName}`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response)
        setCards([...response.data]);
        setisLoading(false)
      });

  };
  grabCards();
  }, []);


  return (

    <Fragment>
      {isLoading? <Loading/> : 
      
      <Container>

{cards.length === 0 ? 'no results': null}

    <Row xs={1} md={3} className="g-4">
  {cards.filter(function (card) {
            return card.image_uris;
          }).map((card) => (
    <Col>
      <Card className='m-auto' >
        <Card.Img className="w-75 h-75 p-3 m-auto" style={{backgroundBlendMode:'normal'}} src={`${card.image_uris.normal}`} alt="Card image cap" />
        <Card.Body className='m-auto'>
        <Card.Title tag="h5">{card.name}</Card.Title>
        <Card.Subtitle tag='h3'>{card.set_name} </Card.Subtitle>
          <Card.Text>${card.prices.usd || '0'}// In Stock: {card.stock} </Card.Text>

        <Button href={`/mtgcards/${card._id}`} variant="primary" size="lg">  Details </Button> <ShoppingCart stock={card.stock} product={card}/>
        {authState.authorization_level==="1" && <EditMtgCard id={card._id} />}
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>

      }
      

     
    </Fragment>
  
  );
}
