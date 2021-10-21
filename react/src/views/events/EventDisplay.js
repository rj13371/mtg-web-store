import React,{useEffect, useState, Fragment} from 'react'
import { useParams } from 'react-router';
import { Table, Container, Nav, Card } from 'react-bootstrap';
import axios from 'axios';
import axiosClient from '../../utils/axios';


export default function EventDisplay() {

    const { id } = useParams();

    const [ eventsOnLoad, setEventsOnLoad ] = useState({

    })

    console.log(eventsOnLoad)

    useEffect(() => {
       const getEvent = async () => { 
           
        await axios({
            method: "get",
            url: `/event/${id}`,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
              console.log(response.data)

            setEventsOnLoad( {...response.data} );
          })}
          getEvent();


      }, []);

    return (

        <Container>

<h1>{eventsOnLoad.name}</h1>
<h1>{eventsOnLoad.dateAndTime}</h1>
<h2> {eventsOnLoad.description} </h2>

<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Player</th>
      <th>Final Record</th>
      <th>Deckname</th>
      <th>Decklist</th>
      <th>Standing</th>
    </tr>
  </thead>
  <tbody>

{eventsOnLoad.entrants? 
  <Fragment>
{eventsOnLoad.entrants.map((player) => (

    <tr>
      <td>{player.username}</td>
      <td>{player.record ? player.record : null}</td>

      {eventsOnLoad.decklists.map((decklist, index) => (
<Fragment>
<td>{decklist.name? decklist.name : 'no name entered'}</td>
<td><Nav.Link href={`/decklist/${decklist._id}`}> Details </Nav.Link></td>
<td>{index + 1}</td>
</Fragment>
))}

    </tr>
  ))}

</Fragment>

: null}





  </tbody>
</Table>
            
        </Container>
    )
}
