import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

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
  };

  return (
    <Container>
      <Row>
      <Col className="mt-3" md={{ span: 6, offset: 3 }}>
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
            <span>{option.name}/{option.set_name}/{option.price}/Stock:{option.stock} </span>
          </Fragment>

        )}
      />
      </Col>
    </Row>
    </Container>
  );
}

export default CardSearch;

