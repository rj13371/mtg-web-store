import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Row,Col, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import axiosClient from "../../../../utils/axios";
import useWindowSize from "../../../../hooks/useWindowSize";

export default function OrdersDashboard() {
  const { authState } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const size = useWindowSize()

  const getOrders = async () => {
    const body = {
      userId: authState._id,
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

  // useEffect(()=>{

  //         getOrders()

  // },[])

  return (
    <Container>

<Table style={ size.width>500? {fontSize:'medium'}: {fontSize:'small'}} striped bordered hover variant="dark">
<Button onClick={getOrders}>Get Orders</Button>
<thead>
<tr>
  <th>Order ID</th>
  <th>Date</th>
  <th>Total Cost</th>
  <th>Status</th>
  <th> Products Ordered  </th>
</tr>
</thead>
<tbody>

{userOrders.map((order) => (

<tr>
  <td> {size.width<500? '...' + order._id.slice(-4) : order._id } </td>
  <td>{order.updatedAt}</td>
  <td>{"$"}{order.total}</td>
  <td>{ !order.isApproved ? 'Waiting for approval' : null } { order.isApproved && !order.isComplete ? 'Ready for pickup' : null }
                  { order.isApproved && order.isComplete ? 'Order Completed' : null }</td>
  <td>
    
    <DropdownButton id="dropdown-basic-button" variant='secondary'  title={size.width<500? '' : 'Products Ordered' }>

    {order.products.map((product) => (

<Dropdown.Item>                      {product.quantity}{" "}
                  {product.productName
                    ? product.productName
                    : product.name}{" "}
            
                  {product.mtgo_id
                    ? product.set_name
                    : product.productCategory }{" $"}
                    {product.mtgo_id
                    ? product.prices.usd
                    : product.price }{""}</Dropdown.Item>
    ))}



</DropdownButton>

</td>
</tr>
))}


</tbody>
</Table>

    </Container>
  );
}
