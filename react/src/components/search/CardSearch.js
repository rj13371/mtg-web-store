import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'

function CardSearch(props) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

//   useEffect(() => {
//     const params = new URLSearchParams()
//     if (query) {
//       params.append("name", query)
//     } else {
//       params.delete("name")
//     }
//   }, [query])


  const handleClickSearch = async (e) => {
    e.preventDefault();

    const body = {
        name: query
    }
  

     await axios({
        method: 'get',
        url: `/mtgcards/card?name=${query}`,
        data: body,
            headers: {
              'Content-Type': 'application/json'
            }
      }).then(response => {
        return JSON.stringify(response)
         })
        .then(data =>{
          history.push("/cards/", { query: data });
          setSubmitted(true);
        })

        if (submitted) {
            return <Redirect to='/cards/' /> 
          }

}

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search For Magic Card"
        onChange={handleChange}
      ></input>
        <button onClick={handleClickSearch}>Search</button>

    </div>



  );
}

export default CardSearch