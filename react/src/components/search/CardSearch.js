import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../hooks/useWindowSize";

function CardSearch(props) {
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  const history = useHistory();

  const handleSearch = async (query) => {
    setSubmitted(true);

    await axios({
      method: "get",
      url: `/mtgcards/card?name=${query}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp)
      .then((data) => {
        const res = data.data;



        const options = res.map((i) => ({
          name: i.name,      
          img: (i.image_uris ? i.image_uris.small : '')  ,
          set_name: i.set_name,
          stock: i.stock,
          price: (i.prices.usd ? `$${i.prices.usd}` : '')
        }));

        setResults(options);
        setSubmitted(false);
      });
  };

  const filterBy = () => true;


  const handleClickSearch = async (q) => {
    

    const searchName = (q[0] ? q[0].name :'')
    console.log(searchName)

    const body = {
      name: searchName,
    };

    if (searchName.length !== 0) {
    await axios({
      method: "get",
      url: `/mtgcards/card?name=${searchName}`,
      data:body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return JSON.stringify(response);
      })
      .then((data) => {
        history.push("/cards/", { query: data });
        setSubmitted(true);
      })}

    if (submitted) {
      return <Redirect to="/cards/" />;
    }
  }

  const size = useWindowSize();

  return (
    <Container fluid="xl">
      <Row className="justify-content-center">
      <Col className="mt-3 mb-3" style={size.width<500? {width:'500px'}: null} xs={9} md={6}>
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={submitted}
        labelKey="name"
        delay={1500}
        onChange={(q) => { handleClickSearch(q) }}
        minLength={4}
        maxResults={5}
        onSearch={handleSearch}
        options={results}
        placeholder="Search for Magic Cards"
        renderMenuItemChildren={(option, props) => (
          <Fragment>

          
            <img
              alt={option.name}
              src={option.img}
              style={{
                height: "100px",
                marginRight: "10px",
                width: "75px",
              }}
            />

            {size.width<500? <span style={{fontSize:'0.9em'
              }}>{option.name} {option.price} Stk:{option.stock} </span> 
              
              
              : <span>{option.name}/{option.set_name}/{option.price}/Stock:{option.stock} </span>}
            
          </Fragment>

        )}
      />

      </Col>

      {size.width>500? 

      <Col className="mt-3 mb-3" xs={1} md={1}>

              

      <Button onClick={() => { handleClickSearch(results) }}>

      <FontAwesomeIcon icon='search' size="1x" />

      </Button>
      </Col> : null}
    </Row>
    </Container>
  );
}

export default CardSearch;

