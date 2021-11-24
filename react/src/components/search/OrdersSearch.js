import React, { useState, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInputState from "../../hooks/useInputState";
import axiosClient from "../../utils/axios";
import ApproveOrder from "../../views/dashboard/employeeDashboard/Orders/ApproveOrder";

export default function OrdersSearch() {
  const [query, setQuery] = useInputState();
  const [paramType, setParamType] = useInputState("");
  const [userOrders, setUserOrders] = useState([]);

  const getOrders = async (e) => {
    e.preventDefault();
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

              <Form.Select
                onChange={setParamType}
                aria-label="Default select example"
              >
                <option>Search by Type</option>
                <option value={"orderId"}> By order Id </option>
                <option value={"userName"}> By user name </option>
                <option value={"date"}> By date </option>
                <option value={"cost"}> By total cost </option>
                <option value={"productName"}> By product name </option>
                <option value={"cardName"}> By card name </option>
              </Form.Select>
            </Form>
          </Col>

          <Col className="mt-3 mb-3" xs={1} md={1}>
            <Button
              onClick={(e) => {
                getOrders(e);
              }}
            >
              <FontAwesomeIcon icon="search" size="1x" />
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Order ID and Username</th>
              <th>Date</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Products Ordered</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr>
                <td>
                  {order._id} {"/"} {order.customer.username}{" "}
                </td>
                <td>{order.updatedAt}</td>
                <td>{order.total}</td>
                <td>
                  {!order.isApproved ? "Waiting for approval" : null}{" "}
                  {order.isApproved && !order.isComplete
                    ? "Approved! Waiting for Cust pickup"
                    : null}
                  {order.isApproved && order.isComplete
                    ? "Order Completed"
                    : null}
                </td>
                <td>
                  <ApproveOrder orderId={order._id} />
                </td>
                <td>
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="secondary"
                    title="Products Ordered"
                  >
                    {order.products.map((product) => (
                      <Dropdown.Item>
                        {" "}
                        {product.quantity}{" "}
                        {product.productName
                          ? product.productName
                          : product.name}{" "}
                        {product.mtgo_id
                          ? product.set_name
                          : product.productCategory}
                        {" $"}
                        {product.mtgo_id ? product.prices.usd : product.price}
                        {""}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
}
