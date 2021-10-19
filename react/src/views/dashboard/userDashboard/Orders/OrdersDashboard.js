import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Container, Button, Row,Col } from "react-bootstrap";
import OrdersSearch from "../../../../components/search/OrdersSearch";
import { AuthContext } from "../../../../context/AuthContext";
import axiosClient from "../../../../utils/axios";
import { Card } from "react-bootstrap";

export default function OrdersDashboard() {
  const { authState } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);

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
      <Button onClick={getOrders}>Get Orders</Button>

      <Row xs={1} md={3} className="g-4">
        
          {userOrders.map((order) => (

            <Col>
              <Card className="m-auto">
                <Card.Body className="m-auto">
                    <Card.Subtitle>{'OrderID: '}{order._id} </Card.Subtitle>
                    <Card.Subtitle >
                  {'Date: '}{order.updatedAt}
                  {'Total Cost: $ '}{order.total}
                  {'Status: '}{ !order.isApproved ? 'Waiting for approval' : null } { order.isApproved && !order.isComplete ? 'Order approved! Please pickup in store' : null }
                  { order.isApproved && order.isComplete ? 'Order Completed' : null }
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
  );
}
