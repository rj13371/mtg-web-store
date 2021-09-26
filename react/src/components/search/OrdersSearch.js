import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInputState from "../../hooks/useInputState";

export default function OrdersSearch(props) {
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useInputState();
  const [paramType, setParamType] = useInputState('');

  console.log(paramType)

  const history = useHistory();

  // MUST BE ASYNC WHEN UNCOMMENT AXIOS CODE

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(query, paramType);
    //     if (searchName.length !== 0) {
    //     await axios({
    //       method: "get",
    //       url: `/orders/orderCustomerUsername?name=${searchName}`,
    //       data:body,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => {
    //         return JSON.stringify(response);
    //       })
    //       .then((data)=>{
    //           console.log(data)
    //       })

    //     //   .then((data) => {
    //     //     history.push("/orders/", { query: data });
    //     //     setSubmitted(true);
    //     //   })}

    //     // if (submitted) {
    //     //   return <Redirect to="/orders/" />;
    //     // }
    //   }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        
          <Col className="mt-3 mb-3" xs={9} md={6}>
          <Form onSubmit={(e) => handleSubmit(e)}>
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
          <Button onClick={(e) => { handleSubmit(e) }}>
              <FontAwesomeIcon icon="search" size="1x" />
            </Button>
          </Col>

        
      </Row>
    </Container>
  );
}
