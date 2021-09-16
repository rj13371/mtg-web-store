import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

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



//   const handleClick = async () => {
//     alert("saved food to db");

//     props.history.push(`/food/${query}`); //use for mongoDB push
//   };

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search For Magic Card"
        onChange={handleChange}
      ></input>

      <Link to={`mtgcards/card?name=${query}`}>Go</Link>
    </div>



  );
}

export default CardSearch
