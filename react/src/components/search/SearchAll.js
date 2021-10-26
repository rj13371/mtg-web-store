import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axiosClient from "../../utils/axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import useWindowSize from "../../hooks/useWindowSize";

// NEED TO CLEANUP 

function SearchAll() {
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [redirecting, setRedirecting] = useState(false)
  const [param, setParam] = useState()
  const [paramIsCard, setParamIsCard] = useState(false)

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


        const options = res.map((i) => ({
            productName: i.productName || i.name,      
            img: i.image_uris ? i.image_uris.small : i.images ? i.images[0].url : '' ,
            productCategory: (i.productCategory? i.productCategory : i.set_name),
            stock: i.stock,
            price: (i.price ? `$${i.price}` : `${i.prices.usd}`),
            set_name: i.set_name? i.set_name : null
          }));

        setResults(options);
        setSubmitted(false);
      });
  };

  const filterBy = () => true;


  const handleClickSearch = async (q) => {

    if (q[0].set_name){
      setParamIsCard(true)
    }

    const searchName = (q[0] ? q[0].productName :'')
    console.log(q[0])

    setParam(searchName)
    setRedirecting(true)

  }


  const size = useWindowSize();


  if(redirecting && paramIsCard){
    return (<Redirect to={`/cards/${param}`} />) 
}else if (redirecting){
  return (<Redirect to={`/products/${param}`} />) 
}

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

