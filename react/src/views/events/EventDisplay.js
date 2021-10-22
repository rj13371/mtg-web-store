import React,{useEffect, useState, Fragment} from 'react'
import { useParams } from 'react-router';
import { Table, Container, Nav, Card } from 'react-bootstrap';
import axios from 'axios';
import axiosClient from '../../utils/axios';
import useWindowSize from '../../hooks/useWindowSize';


export default function EventDisplay() {
  const size = useWindowSize()

    const { id } = useParams();

    const [ eventsOnLoad, setEventsOnLoad ] = useState({

    })


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

        <Container fluid='sm'>

<h1>{eventsOnLoad.name}</h1>
<h1>{eventsOnLoad.dateAndTime}</h1>
<h2> {eventsOnLoad.description} </h2>
<h2> {eventsOnLoad.isFinished?'Event Completed': 'Event not yet complete'} </h2>

<Table style={ size.width>500? {fontSize:'medium'}: {fontSize:'70%' }} striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Player</th>
      <th>Final Record</th>
      <th>Deck name</th>
      <th>Decklist</th>
      <th>Place</th>
    </tr>
  </thead>
  <tbody>

{eventsOnLoad.entrants? 
  <Fragment>
{eventsOnLoad.entrants.map((player, index) => (

    <tr>
      <td>{player.username}</td>
      <td>{eventsOnLoad.decklists? eventsOnLoad.decklists[index].record : ''}</td>
      <td>{eventsOnLoad.decklists? eventsOnLoad.decklists[index].deckName : 'no name entered'}</td>
<td><Nav.Link href={`/decklist/${eventsOnLoad.decklists[index]._id}`}> Details </Nav.Link></td>
<td>{index + 1}</td>

    </tr>
  ))}

</Fragment>

: null}





  </tbody>
</Table>
            
        </Container>
    )
}
