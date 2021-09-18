import React, { Fragment, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { Redirect } from "react-router-dom";
import useToggle from "../../hooks/useToggleState";

import axios, { AxiosInstance } from 'axios';



import * as tunnel from 'tunnel';
const agent = tunnel.httpsOverHttp({
    proxy: {
        host: 'http://localhost/',
        port: 5000,
    },
});

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/', 
    httpsAgent: agent,
});

const EmployeeDashboard = () => {

    const [submitted, setSubmitted] = useState(false);
    const [onSaleToggle, setOnSaleToggle] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    stock: "",
    price: "",
    productCategory: "",
    onSale: false
  })

  const history = useHistory();

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      productName: productName,
      productDescription: productDescription,
      stock: stock,
      price: price,
      productCategory: productCategory,
      onSale: onSale,
    };

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
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={productName}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Product Description"
            name="productDescription"
            value={productDescription}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Product Category"
            name="productCategory"
            value={productCategory}
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={stock}
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={onChange}
          />
          <input
            type="checkbox"
            placeholder="onSale"
            name="onSale"
            checked={onSale}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="AddProduct" />
      </form>
    </Fragment>
  )
}

export default EmployeeDashboard