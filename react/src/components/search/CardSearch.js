import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Dropdown,
  InputGroup,
  FormControl,
  DropdownButton,
  Form,
  Button,
} from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

function CardSearch(props) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  const location = useLocation();
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
        }));

        setResults(options);
        setSubmitted(false);
      });
  };

  const filterBy = () => true;

  // const handleChange = (event) => {
  //   event.preventDefault();

  //   setQuery(event.target.value);
  // };

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
    <>
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
            <span>{option.name}</span>
          </Fragment>

        )}
      />

    </>
  );
}

export default CardSearch;

{/* <Form onSubmit={handleClickSearch} type="text">
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Control
    value={query}
    type="text"
    onChange={handleChange}
    placeholder="Search For Magic Card"
  />
</Form.Group>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form> */}

{/* 
<InputGroup.Append>
              <Button
                onClick={()=>{console.log}}
                variant="outline-secondary">
                Play Again
              </Button>
            </InputGroup.Append>

                </InputGroup>
                </Form.Group> */}