import React,{useState, useContext, useEffect} from 'react'
import { Container,Row,Col, Form, Button, Table, Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import axiosClient from '../../../../utils/axios'
import { AuthContext } from '../../../../context/AuthContext'
import ModalAlert from '../../../../components/ModalAlert'
import useInputState from '../../../../hooks/useInputState'



export default function EventsDashboard() {

    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0)
    const [header, setHeader] = useState('Success')

    const {authState} = useContext(AuthContext)
    const [eventsOnLoad, setEventsOnLoad] = useState([])

    const [name, handleNameChange] = useInputState('')
    const [description, handleDescriptionChange] = useInputState('')
    const [dateAndTime, handleDateAndTimeChange] = useInputState('')

    console.log(dateAndTime)



  const submitNewEvent = async (e) =>{
    e.preventDefault()
    const body = {
      name: name,
      description: description,
      dateAndTime: dateAndTime,
      userId: authState._id
    };


    await axiosClient({
      method: "post",
      url: "/event/createEvent/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {

      setHeader(`Decklist submitted!`)
      setMessage('Decklist will be reviewed before event is completed')
      setMessageCount(messageCount+1)

    }).catch((e)=>{
         if (e){
          setHeader('Decklist submission failed')
          setMessage(` Something went wrong! ${e}`)
          setMessageCount(messageCount+1)
        }
      })
}


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

  }, [eventsOnLoad])

    return (

<Container className="d-flex justify-content-center" >
<ModalAlert header={header} message={message} messageCount={messageCount}/>

<Row>
<Col md={4}>
<Form onSubmit={submitNewEvent}>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Event Name</Form.Label>
    <Form.Control onChange={handleNameChange} value={name} type="text" placeholder="Event Name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Event Description</Form.Label>
    <Form.Control onChange={handleDescriptionChange} value={description} type="text" placeholder="Event Description" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Event Time and Date</Form.Label>
    <Form.Label>Example: 24/12/2019 09:15:00</Form.Label>
    <Form.Control onChange={handleDateAndTimeChange} value={dateAndTime} type="text" placeholder="24/12/2019 09:15:00" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Create Event
  </Button>
</Form>
</Col>
<Col md={8}>

<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Event ID</th>
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
      <td>{event._id}</td>
      <td>{event.name}</td>
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
