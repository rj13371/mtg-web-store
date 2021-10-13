import React from "react";
import { Container, Button, Table } from "react-bootstrap";
import OrdersSearch from "../../../../components/search/OrdersSearch";

// IMPLEMENT SEARCH BAR FOR ORDERS, WITH ID, DATE OR USER ID PARAM

export default function OrdersDashboard() {


  return (
    <div>
        <OrdersSearch/>
    </div>
  );
}
