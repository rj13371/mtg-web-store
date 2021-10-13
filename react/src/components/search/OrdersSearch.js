import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInputState from "../../hooks/useInputState";
import axiosClient from "../../utils/axios";

export default function OrdersSearch(props) {
  const [query, setQuery] = useInputState();
  const [paramType, setParamType] = useInputState('');
  const [userOrders, setUserOrders] = useState([]);

  console.log(paramType)

  const history = useHistory();

  // MUST BE ASYNC WHEN UNCOMMENT AXIOS CODE

  const getOrders = async (e) => {
    e.preventDefault()
    const body = {
      paramType: paramType,
      query: query,
    };

    await axiosClient({
      method: "post",
      url: "/orders/showorders/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserOrders([...response.data]);
    });
  };

  return (
    <Fragment>
    <Container fluid>
      <Row className="justify-content-center">
        
          <Col className="mt-3 mb-3" xs={9} md={6}>
          <Form onSubmit={(e) => getOrders(e)}>
            <Form.Control
              as="textarea"
              placeholder="enter customer name"
              onChange={setQuery}
              value={query}
            />

<Form.Select onChange={setParamType} aria-label="Default select example">
<option>Search by Type</option>
    <option value={'userName'}> By user name </option>
    <option value={'date'}> By date </option>
    <option value={'cost'}> By total cost </option>
    <option value={'productName'}> By product name </option>
    <option value={'cardName'}> By card name </option>
</Form.Select>

            </Form>
          </Col>

          <Col className="mt-3 mb-3" xs={1} md={1}>
          <Button onClick={(e) => { getOrders(e) }}>
              <FontAwesomeIcon icon="search" size="1x" />
            </Button>
          </Col>

        
      </Row>


    </Container>

    <Container>
            <Row xs={1} md={3} className="g-4">
        
        {userOrders.map((order) => (

          <Col>
            <Card className="m-auto">
              <Card.Body className="m-auto">
                  <Card.Subtitle>{'OrderID: '}{order._id} </Card.Subtitle>
                <Card.Subtitle >
                  {'Date: '}{order.updatedAt}
                </Card.Subtitle>

                {order.products.map((product) => (
                  <Fragment>
                    <Card.Text>
                      {" "}
                      {product.quantity}{" "}
                      {product.productName
                        ? product.productName
                        : product.name}{" "}
                
                      {product.mtgo_id
                        ? product.set_name
                        : product.productCategory }{" $"}
                        {product.mtgo_id
                        ? product.prices.usd
                        : product.price }{""}

                      {product.mtgo_id ? (
                        <Button
                          href={`/mtgcards/${product._id}`}
                          variant="primary"
                          size='sm'
                        >
                          {" "}
                          Details{" "}
                        </Button>
                      ) : (
                        <Button
                          href={`/products/${product._id}`}
                          variant="primary"
                          size="sm"
                        >
                          {" "}
                          Details{" "}
                        </Button>
                      )}
                    </Card.Text>
                  </Fragment>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
  </Row>

    </Container>
    </Fragment>
  );
}
