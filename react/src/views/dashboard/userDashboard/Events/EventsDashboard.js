import React,{useState, useContext, useEffect} from 'react'
import { Container,Row,Col, Table, Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import axiosClient from '../../../../utils/axios'
import ModalAlert from '../../../../components/ModalAlert'
import useWindowSize from '../../../../hooks/useWindowSize'


export default function EventsDashboard() {
  const size = useWindowSize()

    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0)
    const [header, setHeader] = useState('Success')

    const [eventsOnLoad, setEventsOnLoad] = useState([])


    useEffect(async () => {
       axiosClient({
          method: "get",
          url: "/event/getAllEvents/",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {

          setEventsOnLoad(response.data)
    
    
        });

  }, [])

    return (

<Container className="d-flex justify-content-center" >
<ModalAlert header={header} message={message} messageCount={messageCount}/>

<Row>

<Col>
<h1>Recent Events</h1>

<Table style={ size.width>500? {fontSize:'medium'}: {fontSize:'70%' }} striped bordered hover variant="dark">

  <thead>
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th># of Participants</th>
      <th>Players</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>

  {eventsOnLoad.map((event) => (

    <tr>
      <td >{event.name}</td>
      <td>{event.dateAndTime}</td>
      <td>{event.entrants? event.entrants.length : null}</td>
      <td>
        
        <DropdownButton id="dropdown-basic-button" variant='secondary' title="Players">

        {event.entrants.map((player) => (

  <Dropdown.Item>  {player.username}       </Dropdown.Item>
        ))}



</DropdownButton>

</td>
<td><Nav.Link href={`/event/${event._id}`}> Details </Nav.Link></td>
    </tr>
  ))}

  </tbody>
</Table>
</Col>
</Row>

</Container>
    )
}
