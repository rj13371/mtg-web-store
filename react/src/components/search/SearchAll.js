import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axiosClient from "../../utils/axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../hooks/useWindowSize";

// NEED TO CLEANUP 

function SearchAll() {
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  const history = useHistory();

  const handleSearch = async (query) => {
    setSubmitted(true);

    await axiosClient({
      method: "get",
      url: `/products/productsAndMtgCards?productName=${query}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
          console.log(resp.data)
        const res = resp.data;
        // if(res.every((product) => product.images[0].url ))


        const options = res.map((i) => ({
            productName: i.productName || i.name,      
            img: i.image_uris ? i.image_uris.small : i.images ? i.images[0].url : '' ,
            productCategory: (i.productCategory? i.productCategory : i.set_name),
            stock: i.stock,
            price: (i.price ? `$${i.price}` : `${i.prices.usd}`)
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
      url: `/products/productsAndMtgCards?productName=${searchName}`,
      data:body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {

        if (response.data[0].set_name){
            let data = JSON.stringify(response);

            history.push("/cards/", { query: data });
            setSubmitted(true);

        }else{

            let data = JSON.stringify(response);

            history.push("/products/", { query: data });
            setSubmitted(true);

        }

      })
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
        placeholder="Search for Products and MTG Cards"
        renderMenuItemChildren={(option, props) => (
          <Fragment>

            <img
              alt={option.productName}
              src={option.img ? option.img : ''}
              style={{
                height: "100px",
                marginRight: "10px",
                width: "75px",
              }}
            />

            {size.width<500? <span style={{fontSize:'0.9em'
              }}>{option.productName } {option.price } Stk:{option.stock} </span> 
              
              
              : <span>{option.productName }/{option.productCategory }/{option.price }/Stock:{option.stock} </span>}
            
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

export default SearchAll;

