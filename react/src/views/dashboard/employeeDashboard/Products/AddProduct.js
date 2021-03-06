import React, { useState, Fragment, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axiosClient from "../../../../utils/axios";
import ModalAlert from "../../../../components/ModalAlert";

import CloudinaryWidget from "../CloudinaryWidget";

import { AuthContext } from "../../../../context/AuthContext";

const AddProduct = () => {
  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [header, setHeader] = useState("Success");

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    stock: "",
    price: "",
    productCategory: "",
    onSale: "false",
  });

  const [images, setImages] = useState([{ name: "", url: "" }]);

  const {
    productName,
    productDescription,
    stock,
    price,
    productCategory,
    onSale,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (newImage) => {
    setImages([newImage]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      productName: productName,
      productDescription: productDescription,
      stock: stock,
      price: price,
      productCategory: productCategory,
      onSale: onSale,
      images: images,
    };

    try {
      await axiosClient({
        method: "post",
        url: "/products/addproduct/",
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response);

        if (response.data.message.errors) {
          setHeader("Error");
          setMessage(JSON.stringify(response.data.message));
          setMessageCount(messageCount + 1);
        } else {
          setHeader("Success");
          setMessage(JSON.stringify(response.data.message));
          setMessageCount(messageCount + 1);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const { authState } = useContext(AuthContext);

  if (authState.authorization_level == "0" || !authState.authorization_level) {
    return <Fragment>Unauthorized</Fragment>;
  }

  return (
    <div>
      <ModalAlert
        header={header}
        message={message}
        messageCount={messageCount}
      />
      <Form onSubmit={onSubmit}>
        <Row form>
          <Col md={6}>
            <Form.Group>
              <Form.Label for="productName">Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                value={productName}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label for="productCaregory">Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Category"
                name="productCategory"
                value={productCategory}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row form>
          <Col md={10}>
            <Form.Group>
              <Form.Label for="productDescription">
                Product Description
              </Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Product Description"
                name="productDescription"
                value={productDescription}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group>
              <Form.Label for="stock">Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                name="stock"
                value={stock}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group>
              <Form.Label for="price">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Add Product</Button>
      </Form>

      <CloudinaryWidget images={images} onChange={onChangeImage} />
    </div>
  );
};

export default AddProduct;
