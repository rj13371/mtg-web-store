import React, { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import ModalAlert from "../ModalAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShoppingCart(props) {
  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [header, setHeader] = useState("Success");

  const { addToCart } = useContext(ShoppingCartContext);

  const [product, setProduct] = useState();

  const addToCartAndPopUp = () => {
    try {
      setHeader("Success");
      setMessage("Shopping Cart Updated");
      setMessageCount(messageCount + 1);

      addToCart(product, quantity);
    } catch (e) {
      setHeader("Error");
      setMessage(`Error: ${e}`);
      setMessageCount(messageCount + 1);
    }
  };

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  console.log(props.stock);

  const [quantity, setQuantity] = useState("1");

  return (
    <Container className="mb-3 pt-2">
      <ModalAlert
        header={header}
        message={message}
        messageCount={messageCount}
      />

      <Form>
        <Row xs="auto">
          <Col>
            {props.stock ? (
              <Button variant="success" onClick={() => addToCartAndPopUp()}>
                <FontAwesomeIcon icon="cart-plus" size="lg" />
              </Button>
            ) : (
              <Button
                variant="success"
                disabled={true}
                onClick={() => console.log("your not supposed to click this!")}
              >
                <FontAwesomeIcon icon="cart-plus" size="lg" />
              </Button>
            )}
          </Col>

          <Col>
            <Form.Control
              style={{ width: "50px" }}
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
  );
}
