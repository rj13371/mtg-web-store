import React,{useState, useContext, useEffect} from 'react'
import { Container,Row,Col, Form, Button, Table, Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import axiosClient from '../../../../utils/axios'
import { AuthContext } from '../../../../context/AuthContext'
import ModalAlert from '../../../../components/ModalAlert'
import useInputState from '../../../../hooks/useInputState'
import DeleteEvent from './DeleteEvent'
import useToggle from '../../../../hooks/useToggleState'
import ToggleComplete from './ToggleComplete'
import moment from 'moment'
import useStateWithValidation from '../../../../hooks/useStateWithValidation'


export default function EventsDashboard() {


    const [showDelete, toggleShowDelete] = useToggle()
    
    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0)
    const [header, setHeader] = useState('Success')

    const {authState} = useContext(AuthContext)
    const [eventsOnLoad, setEventsOnLoad] = useState([])

    const validDate = (date) =>{
      return moment(date).isValid()
    }

    const [name, handleNameChange] = useInputState('')
    const [description, handleDescriptionChange] = useInputState('')
    const [dateAndTime, handleDateAndTimeChange, isValidDate] = useStateWithValidation(
      date => validDate(date) ,
      ""
    )




  const submitNewEvent = async (e) =>{
    e.preventDefault()

    if (!isValidDate){
      setHeader(`Invalid Date!`)
      setMessage('Please Format Date Like in the Example!!')
      setMessageCount(messageCount+1)
      return 
    }

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

      setHeader(`Success!`)
      setMessage('Event Created!')
      setMessageCount(messageCount+1)

    }).catch((e)=>{
         if (e){
          setHeader('Event creation failed!')
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

  }, [messageCount])

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
    <Form.Label>Example: 2019-12-25 09:30 </Form.Label>
    <Form.Control onChange={e =>  handleDateAndTimeChange(e.target.value)} value={dateAndTime} type="text" placeholder="24/12/2019 09:15:00" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Create Event
  </Button>
</Form>
</Col>
<Col md={8}>

<Table style={{color:'white'}} striped bordered hover variant="dark">
<h1>Recent Events</h1>
  <thead>
    <tr>
      <th>Event ID</th>
      <th>Name</th>
      <th>Date</th>
      <th># of Participants</th>
      <th>Players</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>

  {eventsOnLoad.map((event) => (

    <tr>
      <td> <Nav.Link href={`/event/${event._id}`}> {event._id} </Nav.Link> </td>
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
<td> <DeleteEvent id={event._id} /> <ToggleComplete id={event._id}/> </td>



    </tr>
  ))}

  </tbody>
</Table>
</Col>
</Row>

</Container>
    )
}
