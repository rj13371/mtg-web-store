import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axiosClient from "../../utils/axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../hooks/useWindowSize";


function ProductSearch() {
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  const history = useHistory();

  const handleSearch = async (query) => {
    setSubmitted(true);

    await axiosClient({
      method: "get",
      url: `/products/product?productName=${query}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
          console.log(resp.data)
        const res = resp.data;




        const options = res.map((i) => ({
            productName: i.productName,      
            img: (i.images[0] ? i.images[0].url : '')  ,
            productCategory: i.productCategory,
            stock: i.stock,
            price: (i.price ? `$${i.price}` : '')
          }));

        setResults(options);
        setSubmitted(false);
      });
  };

  const filterBy = () => true;


  const handleClickSearch = async (q) => {
    

    const searchName = (q[0] ? q[0].productName :'')
    console.log(searchName)

    const body = {
        productName: searchName,
    };

    if (searchName.length !== 0) {
    await axiosClient({
      method: "get",
      url: `/products/product?productName=${searchName}`,
      data:body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return JSON.stringify(response);
      })
      .then((data) => {
        history.push("/products/", { query: data });
        setSubmitted(true);
      })}

    if (submitted) {
      return <Redirect to="/products/" />;
    }
  }

  const size = useWindowSize();

  return (
    <Fragment>

      <Col className="mt-3 mb-3" style={size.width<500? {width:'300px'}: null} xs={9} md={6}>
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={submitted}
        labelKey="productName"
        delay={1500}
        onChange={(q) => { handleClickSearch(q) }}
        minLength={4}
        maxResults={5}
        onSearch={handleSearch}
        options={results}
        placeholder="Search for Products"
        renderMenuItemChildren={(option, props) => (
          <Fragment>

            <img
              alt={option.productName}
              src={option.img}
              style={{
                height: "100px",
                marginRight: "10px",
                width: "75px",
              }}
            />

            {size.width<500? <span style={{fontSize:'0.9em'
              }}>{option.productName} {option.price} Stk:{option.stock} </span> 
              
              
              : <span>{option.productName}/{option.productCategory}/{option.price}/Stock:{option.stock} </span>}
            
          </Fragment>

        )}
      />

      </Col>

      {size.width>500? 

      <Col className="mt-3 mb-3" xs={1} md={1}>

              

      <Button onClick={() => { handleClickSearch(results) }}>

      Search 

      </Button>
      </Col> : null}
      </Fragment>
  );
}

export default ProductSearch;

