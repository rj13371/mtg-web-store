import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory, Link , Router} from "react-router-dom";
import EditMtgCard from "./EditMtgCard";

export default function Mtgcardsindex() {
  const [cards, setCards] = useState([]);
  const [auth, setAuth] = useState(true) //login auth for later for edit button
  // const [isLoading, setisLoading] = useState(true);

  const location = useLocation();
  const query = JSON.parse(location.state.query);
  const res = query.data;

  // const history = useHistory();
  // const query = history.state.query
  const { data } = useParams();

  useEffect(() => {
    setCards(res);
    console.log(cards);
  }, []);

  return (

    <div>
      {/* <MtgCard data={data}/> */}

      <table>

        {cards.length === 0 ? 'no results': null}

        {cards
          .filter(function (card) {
            return card.image_uris;
          })
          .map((card) => (
            <tr>
              <td>{card.name}</td>
              <td>{card.set_name}</td>
              <td>{card.rarity}</td>
              <td>{card.oracle_text}</td>
              <td>{card.prices.usd}</td>
              <td>{card.stock}</td>
              <td>{card.artist}</td>
              <td><img src={`${card.image_uris.small}`} /></td>
              <td>{auth?<EditMtgCard id={card._id}/>: null}</td>
              <td><Link to={{ pathname: `/mtgcards/${card._id}`, state:{ ...card} }}> Details </Link></td>
            </tr>
          ))}

    {cards
          .filter(function (card) {
            return !card.image_uris;
          })
          .map((card) => (
            <tr>
              <td>{card.name}</td>
              <td>{card.set_name}</td>
              <td>{card.rarity}</td>
              <td>{card.oracle_text}</td>
              <td>{card.prices.usd}</td>
              <td>{card.stock}</td>
              <td>{card.artist}</td>
            </tr>
          ))}

      </table>
     
    </div>
  
  );
}
