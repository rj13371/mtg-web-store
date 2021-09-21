import React, { Fragment, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button,Row,Col, FormText } from "reactstrap";
import useToggle from "../../../hooks/useToggleState";
import axiosClient from "../../../utils/axios";
import axios from "axios";
import CloudinaryWidget from "./CloudinaryWidget";

import {Image, Transformation} from 'cloudinary-react';
import {Cloudinary} from 'cloudinary-core';




const AddProduct = () => {

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    stock: "",
    price: "",
    productCategory: "",
    onSale: false
  })

  const [images, setImages] = useState([{name: '', url: ''}]);


  const {
    productName,
    productDescription,
    stock,
    price,
    productCategory,
    onSale
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (newImage) => {
    setImages([...images, newImage]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      productName: productName,
      productDescription: productDescription,
      stock: stock,
      price: price,
      productCategory: productCategory,
      onSale: onSale,
      images: images
    };
    console.log(body)
     

    await axiosClient({
      method: "post",
      url: "/products/addproduct/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
        console.log(response)
         })
        // .then(data =>{
        //   history.push("/", { query: data });
        //   setSubmitted(true);
        // })

        // if (submitted) {
        //     return <Redirect to='/' /> 
        //   }


  };

  return (

    <div>
    <Form onSubmit={onSubmit}>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="productName">Product Name</Label>
          <Input
          type="text"
          placeholder="Product Name"
          name="productName"
          value={productName}
          onChange={onChange}
        />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="productCaregory">Product Category</Label>
          <Input
          type="text"
          placeholder="Product Category"
          name="productCategory"
          value={productCategory}
          onChange={onChange}
        />
        </FormGroup>
      </Col>
    </Row>

    <Row form>
      <Col md={10}>
        <FormGroup>
          <Label for="productDescription">Product Description</Label>
          <Input
          type="textarea"
          placeholder="Product Description"
          name="productDescription"
          value={productDescription}
          onChange={onChange}
        />
        </FormGroup>
      </Col>
      <Col md={1}>
        <FormGroup>
          <Label for="stock">Stock</Label>
          <Input
          type="number"
          placeholder="Stock"
          name="stock"
          value={stock}
          onChange={onChange}
        />
        </FormGroup>
      </Col>
      <Col md={1}>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={onChange}
        />
        </FormGroup>  
      </Col>
    </Row>

    <FormGroup check>
      <Input type="checkbox" name="onSale"/>
      <Input
          type="checkbox"
          placeholder="onSale"
          name="onSale"
          checked={onSale}
          onChange={onChange}
        />{onSale}
    </FormGroup>

    


    <Button>Add Product</Button>
  </Form>

  <CloudinaryWidget images={images} onChange={onChangeImage}/>

  </div>


  )
}

export default AddProduct

