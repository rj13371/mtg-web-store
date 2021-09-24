import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Container, Col, Row, Button } from "react-bootstrap";
import ShoppingCart from "../../components/cart/ShoppingCart";


export default function Mtgcardsindex() {
  const [cards, setCards] = useState([]);
  const [auth, setAuth] = useState(true) //login auth for later for edit button
  // const [isLoading, setisLoading] = useState(true);

  const location = useLocation();
  const query = JSON.parse(location.state.query);
  const res = query.data;


  useEffect(() => {
    setCards(res);
    console.log(cards);
  }, []);


  //.from({ length: 3 })
  return (

    <div>
      
<Container>

{cards.length === 0 ? 'no results': null}

    <Row xs={1} md={3} className="g-4">
  {cards.filter(function (card) {
            return card.image_uris;
          }).map((card) => (
    <Col>
      <Card className='m-auto' >
        <Card.Img className="w-75 h-75 p-3 m-auto" style={{backgroundBlendMode:'normal'}} src={`${card.image_uris.small}`} alt="Card image cap" />
        <Card.Body className='m-auto'>
        <Card.Title tag="h5">{card.name}</Card.Title>
        <Card.Subtitle tag='h3'>{card.set_name} </Card.Subtitle>
          <Card.Text>${card.prices.usd || '0'}// In Stock: {card.stock} </Card.Text>

        <Button href={`/mtgcards/${card._id}`} variant="primary" size="lg">  Details </Button> <ShoppingCart product={card}/>

        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>


    {cards
          .filter(function (card) {
            return !card.image_uris;
          })
          .map((card) => (
            <tr>
              <td>{card.name}</td>
              <td>{card.set_name}</td>
              <td>{card.rarity}</td>
              <td>{card.oracle_text}</td>
              <td>{card.prices.usd}</td>
              <td>{card.stock}</td>
              <td>{card.artist}</td>
            </tr>
          ))}

      
     
    </div>
  
  );
}
