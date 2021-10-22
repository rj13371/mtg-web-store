import React,{useEffect, useState, Fragment} from 'react'
import { useParams } from 'react-router';
import { Table, Container, Nav, Card } from 'react-bootstrap';
import axios from 'axios';


export default function EventDisplay() {

    const { id } = useParams();

    const [ deckOnLoad, setDeckOnLoad ] = useState({

    })

    console.log(deckOnLoad)

    useEffect(() => {
       const getEvent = async () => { 
           
        await axios({
            method: "get",
            url: `/decklist/${id}`,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
              console.log(response.data)

            setDeckOnLoad( {...response.data} );
          })}
          getEvent();


      }, []);

    return (

        <Container>

<h1>{deckOnLoad.deckName ? deckOnLoad.deckName : 'no decklist name' }</h1>
<h1>{deckOnLoad.event? deckOnLoad.event.name : 'no event'}</h1>
<h1>{deckOnLoad.user? deckOnLoad.user.username : 'no event'}</h1>

<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Card</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>

{deckOnLoad.cardList? 
  <Fragment>
{deckOnLoad.cardList.map((card) => (
  

    <tr>
     {card.name == ' Mainboard' || card.name == ' Sideboard'  ?<td>{card.name}</td>  : <td><a href={`/card_name/${card.name}`}> {card.name} </a> </td>} 
      <td>{card.quantity ? card.quantity : null}</td>
    </tr>
  ))}

</Fragment>

: null}





  </tbody>
</Table>
            
        </Container>
    )
}
