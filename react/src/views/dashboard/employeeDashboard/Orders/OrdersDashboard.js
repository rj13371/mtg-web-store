import React from "react";
import { Container, Button, Table } from "react-bootstrap";

export default function OrdersDashboard() {
  const sampleOrders = [
    {
      orderId: "614d85742d5a6e6369fb204d",
      orderContents: [
        { productName: "Delver of Secrets", quantity: "4" },
        { productName: "Settlers of Catan", quantity: "1" },
      ],
      orderTotal:69.42,
      orderDate: "10/10/2021",
      orderCustomerId: "614d85742d5a6e6369fb204e",
      orderCustomerUsername: "Bob",
    },

    {
      orderId: "614d85742d5a6e6369fb204z",
      orderContents: [
        { productName: "Red Dice", quantity: "2" },
        { productName: "Tarmogoyf", quantity: "1" },
      ],
      orderTotal:199,
      orderDate: "10/11/2021",
      orderCustomerId: "614d85742d5a6e6369fb204m",
      orderCustomerUsername: "Alice",
    },

    {
      orderId: "614d85742d5a6e6369fb204o",
      orderContents: [{ productName: "Aetherspell Bomb", quantity: "10" }],
      orderTotal:5.99,
      orderDate: "10/13/2021",
      orderCustomerId: "614d85742d5a6e6369fb2040",
      orderCustomerUsername: "John",
    },
  ];

  return (
    <div>
      <Container>
      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Order Date</th>
      <th>Order Total</th>
      <th>Order Customer Username</th>
      <th>Details</th>
    </tr>
  </thead>

  <tbody>

    {
        sampleOrders.map((order)=>(
            <tr>
            <td>{order.orderId}</td>
            <td>{order.orderDate}</td>
            <td>{order.orderTotal}</td>
            <td>{order.orderCustomerUsername}</td>
            <Button href={`/products/${order.orderId}`} variant="primary" size="sm">  Details </Button>
            </tr>
        ))
    }


  </tbody>
</Table>
      </Container>
    </div>
  );
}
