import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios'

function CardSearch(props) {
  const [query, setQuery] = useState("");

  const { params } = useParams()

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.append("name", query)
    } else {
      params.delete("name")
    }
  }, [query])


  const handleClick = async (e) => {
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
      }).then(res =>{console.log(res)})

}

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search For Magic Card"
        onChange={handleChange}
      ></input>
        <button onClick={handleClick}>Search</button>
      <Link to={`/mtgcards/card?name=${query}`}>Go</Link>
    </div>



  );
}

export default CardSearch
