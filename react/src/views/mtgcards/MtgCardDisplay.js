import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import EditMtgCard from "./EditMtgCard";
import axios from "axios";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import ShoppingCartContainer from "../../containers/ShoppingCartContainer";

// move CART into new component

export default function MtgCardDisplay(props) {
  const [card, setCard] = useState({
    name: "",
    set_name: "",
    rarity: "",
    oracle_text: "",
    prices: "",
    stock: "",
    artist: "",
    image_uris: "",
    _id: "",
  });

  const [quantity, setQuantity] = useState("0");

  const location = useLocation();
  const { id } = useParams();

  const { cart, addToCart, clearCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    const grabCard = async () => {
      if (!location.state) {
        await axios({
          method: "get",
          url: `/mtgcards/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          setCard({ ...response.data });
        });
      } else {
        setCard({ ...location.state });
      }
    };
    grabCard();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col lg>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          src={`${card.image_uris.normal}`}
          alt="card image"
        />
      </Card>
      </Col>

      <Col>
      <Card>
        <Card.Body>
          <Card.Title tag="h5">{card.name}{card.mana_cost}</Card.Title>
          <Card.Text>{card.type_line}</Card.Text>
          <Card.Text>{card.oracle_text}</Card.Text>
          <Card.Text>{card.power? `${card.power} /` :''} {card.toughness? card.toughness:''} </Card.Text>
          <Card.Text>{card.stock}</Card.Text>
          <Card.Text>{card.set_name}</Card.Text>

          <Card.Text tag='h3'>{card.prices ? card.prices.usd : ""}</Card.Text>
          <Card.Text tag='h3'>{card.stock ? card.stock : ""}</Card.Text>

          </Card.Body>
      </Card>
      </Col>

      </Row>
      </Container>


          <Form>
            <Button onClick={() => addToCart(card, quantity)}>Add to cart</Button>

            <Form.Control
              type="number"
              placeholder="0"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form>

          <Form>
            <Button onClick={clearCart}>Clear cart</Button>
          </Form>


      <ShoppingCartContainer />

      {location.state && <EditMtgCard id={card._id} />}
    </div>
  );
}
