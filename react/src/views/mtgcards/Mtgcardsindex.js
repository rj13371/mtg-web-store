import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import MtgCard from "./MtgCard";

export default function Mtgcardsindex() {
  const [cards, setCards] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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

  //   useEffect(() => {

  //     if (data.name){
  //         setisLoading(false)
  //          console.log(isLoading)

  //         }

  //   }, [isLoading]);

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
              <img src={`${card.image_uris.small}`} />
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
