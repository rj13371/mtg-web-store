import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../hooks/useWindowSize";
import { Image } from "react-bootstrap";
import CheckoutOrder from "../../views/dashboard/userDashboard/Orders/CheckoutOrder";
import { AuthContext } from "../../context/AuthContext";
import { Fragment } from "react";

export default function Checkout() {
  const { authState } = useContext(AuthContext);

  const { cart, removeItem } = useContext(ShoppingCartContext);
  const size = useWindowSize();

  return (
    <Container>
      {authState.email ? (
        <Fragment>
          <Table
            fluid="xl"
            variant="dark"
            striped
            bordered
            hover
            size="sm"
            style={
              size.width > 500 ? { fontSize: "medium" } : { fontSize: "small" }
            }
          >
            <thead>
              <tr>
                {size.width > 500 ? <th> Image</th> : null}
                <th> Name</th>
                <th>Set/Catagory Name</th>
                <th>Rarity </th>
                <th>Price</th>
                {size.width > 500 ? <th> Quantity</th> : <th> #</th>}
                <th>Remove? </th>
              </tr>
            </thead>
            <tbody>
              {cart.length !== 0
                ? cart.map((item, index) => (
                    <tr>
                      {size.width > 500 ? (
                        <td>
                          <Image
                            style={
                              item.rarity
                                ? { width: "75px", height: "100px" }
                                : { width: "50%", height: "50%" }
                            }
                            src={`${
                              item.image_uris
                                ? item.image_uris.small
                                : item.images[0].url
                            }`}
                            alt="Card image cap"
                          />
                        </td>
                      ) : null}
                      <td>{item.name || item.productName}</td>
                      <td>{item.set_name || item.productCategory}</td>
                      <td>{item.rarity ? item.rarity.charAt() : null}</td>
                      <td>
                        $
                        {parseFloat(
                          item.prices ? item.prices.usd : item.price
                        ).toFixed(2)}
                      </td>
                      <td>{` x${item.quantity}`}</td>
                      <td>
                        {" "}
                        <Button
                          variant="danger"
                          onClick={() => removeItem(index)}
                        >
                          <FontAwesomeIcon icon="trash" size="sm" />
                        </Button>
                      </td>
                    </tr>
                  ))
                : "Shopping Cart is Empty"}
            </tbody>
          </Table>
          <CheckoutOrder />
        </Fragment>
      ) : (
        <Alert variant="danger">
          <Alert.Link href="/login">
            {" "}
            Please Login or Register to Checkout your Order
          </Alert.Link>
        </Alert>
      )}
    </Container>
  );
}
