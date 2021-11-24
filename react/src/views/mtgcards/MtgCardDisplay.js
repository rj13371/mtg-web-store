import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import EditMtgCard from "./EditMtgCard";
import axiosClient from "../../utils/axios";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

import ShoppingCart from "../../components/cart/ShoppingCart";
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

  const { authState } = useContext(AuthContext);

  const location = useLocation();
  const { id, card_name } = useParams();

  useEffect(() => {
    const grabCard = async () => {
      const param = id || card_name;

      const url = id ? "/mtgcards/" : "/mtgcards/card_name/";

      console.log(param, url);

      if (!location.state) {
        await axiosClient({
          method: "get",
          url: `${url}${param}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          console.log(response.data);
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
            <Card style={{ width: "18rem" }}>
              <Card.Img
                src={`${card.image_uris ? card.image_uris.normal : ""}`}
                alt="card image"
              />
              <ShoppingCart stock={card.stock} product={card} />
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title tag="h5">
                  {card.name}
                  {card.mana_cost}
                </Card.Title>
                <Card.Text>{card.type_line}</Card.Text>
                <Card.Text>{card.oracle_text}</Card.Text>
                <Card.Text>
                  {card.power ? `${card.power} /` : ""}{" "}
                  {card.toughness ? card.toughness : ""}{" "}
                </Card.Text>
                <Card.Text>{card.stock}</Card.Text>
                <Card.Text> {card.set_name} </Card.Text>

                <Card.Text tag="h3">
                  ${card.price ? card.price : card.prices.usd}
                </Card.Text>
                <Card.Text tag="h3">{card.stock ? card.stock : ""}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {authState.authorization_level === "1" && <EditMtgCard id={card._id} />}
    </div>
  );
}
