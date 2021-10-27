import React, {useEffect, useState, useContext} from 'react'
import {Form, Button, Container,Col,Row, Card } from 'react-bootstrap'
import useInputState from '../../../../hooks/useInputState'
import axiosClient from '../../../../utils/axios'
import { AuthContext } from '../../../../context/AuthContext'
import ModalAlert from '../../../../components/ModalAlert'
import useStateWithValidation from '../../../../hooks/useStateWithValidation'

// ADD VALIDATION 
// ADD USE EFFECT TO GRAB EVENTS FROM DB, EMPLOYEE WILL HAVE CRUD IN DASHBOARD
//WHEN USER SUBMITS DECKLIST, AXIOS POST WITH EVENT ID AND DECKLIST , AND USER ID, POPULATE

export default function DecklistsDashboard(props) {

    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0)
    const [header, setHeader] = useState('Success')

    const {authState} = useContext(AuthContext)

    const [formdecklist, handleformDecklistChange, isValidDecklist] = useInputState([])
    const [email, handleEmailChange] = useInputState()
    const [deckName, handleDeckNameChange] = useInputState()
    const [record, handleRecordChange] = useInputState()

    const [decklist, setDecklist] = useState([])


    const [event, handleEventChange] = useInputState([])

    const [eventsOnLoad, setEventsOnLoad] = useState([''])



    const handleSubmit = (e) =>{

        let res = [];

        e.preventDefault()

        const regex = /([1-9][0-9]*)/;

        let splitDecklist = formdecklist.split('\n');


        for(let i=0;i<splitDecklist.length;i++){
            
                let quantityIndex = splitDecklist[i].search(regex);

                let quantity = splitDecklist[i].slice(quantityIndex, quantityIndex+2);

                let name = splitDecklist[i].slice(quantityIndex + 2 );

                res.push({name:name, quantity:quantity})

        }

        if(res[0].name.toLowerCase().includes('mainboard') && res.some(obj => obj.name.toLowerCase() == ' sideboard') ){
          setDecklist(res)



          setHeader('Please confirm before submitting')
          setMessage( <pre>
            {JSON.stringify(res, null, 2) }
          </pre>)
          setMessageCount(messageCount+1)
        }else{
          setHeader('Invalid Decklist')
          setMessage('Please include a Mainboard Quantity at the top and a Sideboard quantity within the textfield')
          setMessageCount(messageCount+1)
        }


    }

    const decklistSubmit = async (e) =>{
        e.preventDefault()
        const body = {
          userId: props.employee? null : authState._id,
          cardList: decklist,
          eventId: event,
          username: props.employee? null : authState.username,
          email: email || null,
          deckName: deckName,
          record: record? record : '0-0'
        };



    
        await axiosClient({
          method: "post",
          url: "/decklist/createDecklist/",
          data: body,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
    
          console.log(response.data)
          setHeader(`Decklist submitted!`)
          setMessage('Decklist will be reviewed before event is completed')
          setMessageCount(messageCount+1)
    
        }).catch((e)=>{

            if(e.message == 'Request failed with status code 409'){
                setHeader('Decklist submission failed')
                setMessage(` You have already entered this event!`)
                setMessageCount(messageCount+1)
              }

             else if(e.message == 'Request failed with status code 400'){
                setHeader('Decklist submission failed')
                setMessage(`Event not selected! Please choose an event`)
                setMessageCount(messageCount+1)
              }

              


            else if (e){
              setHeader('Decklist submission failed')
              setMessage(` Something went wrong! ${e}`)
              setMessageCount(messageCount+1)
            }
          })
    }



    useEffect(async () => {
        await axiosClient({
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
<Container >
<ModalAlert header={header} message={message} messageCount={messageCount}/>

<Row>
<Col md={8}>
  
      <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Label> Decklist</Form.Label>
    <Form.Control
      as="textarea"
      placeholder="Enter decklist here"
      className='w-100'
      style={{ height: '600px'}}
      onChange={handleformDecklistChange}
      value={formdecklist}
    />

  <Form.Group className="mb-3" controlId="formemail">
    <Form.Label>Enter Deckname </Form.Label>
    <Form.Control type="text" placeholder="Deckname" onChange={handleDeckNameChange} value={deckName} />
  </Form.Group>


{props.employee? <Form.Group className="mb-3" controlId="formemail">
    <Form.Label>Enter Email for Customer</Form.Label>
    <Form.Control type="text" placeholder="email" onChange={handleEmailChange} value={email} />
  </Form.Group>: null }

  {props.employee? <Form.Group className="mb-3" controlId="formemail">
    <Form.Label>Enter Record for Customer Example:3-0 (update all when event completed) </Form.Label>
    <Form.Control type="text" placeholder="0-0" onChange={handleRecordChange} value={record} />
  </Form.Group>: null }


    </Form>



    </Col>
    <Col md={4}>
    <Form.Label> Decklist Example</Form.Label>
        <Card style={{color:'black'}} >
            <Card.Title> Please enter like the example</Card.Title>
            <Card.Body>
                60 Mainboard <br></br>
                4 Delver of Secrets  <br></br>
                2 Snapcaster Mage  <br></br>
                4 Lightning Bolt <br></br>
                15 Sideboard  <br></br>
                4 Lightning Helix <br></br>
                3 Negate <br></br>

            </Card.Body>
            
        </Card>

        <Form.Select onChange={handleEventChange} aria-label="Default select example">
  <option>Select Event to Submit</option>
  {
      eventsOnLoad.map((e)=>(
        <option value={e._id}> {e.name}{' '}{e.dateAndTime}</option>
      ))

  }

</Form.Select>

<Button onClick={(e)=>handleSubmit(e)}> Enter Decklist  </Button>

{decklist.length == 0 ? null : <Button onClick={decklistSubmit}>Submit Decklist to Event</Button> }



    </Col>



    </Row>
</Container>
            
    )
}
