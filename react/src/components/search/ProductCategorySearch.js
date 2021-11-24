import React, { useState } from "react";
import { Redirect } from "react-router";
import { Form, Button, Col } from "react-bootstrap";
import useInputState from "../../hooks/useInputState";
import useWindowSize from "../../hooks/useWindowSize";
import { Fragment } from "react";

export default function ProductCategorySearch() {
  const size = useWindowSize();

  const [submitted, setSubmitted] = useState(false);
  const [query, handleQueryChange] = useInputState();
  console.log(query);

  const handleSubmit = (event) => {
    setSubmitted(true);

    event.preventDefault();
  };

  if (submitted) {
    return <Redirect to={`/products/catagory/${query}`} />;
  }

  return (
    <Fragment>
      <Col
        className="mt-3 mb-3"
        style={size.width < 500 ? { width: "300px" } : null}
        xs={9}
        md={6}
      >
        <Form onSubmit={handleSubmit} type="text">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={query}
              type="text"
              onChange={handleQueryChange}
              placeholder="Search by Product Category Name"
            />
          </Form.Group>
        </Form>
      </Col>

      {size.width < 500 ? null : (
        <Col className="mt-3 mb-3" xs={1} md={1}>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Search
          </Button>
        </Col>
      )}
    </Fragment>
  );
}
