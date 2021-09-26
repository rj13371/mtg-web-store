import React from 'react'
import { FloatingLabel, Form, Button, Container,Col,Row, Card } from 'react-bootstrap'
import useInputState from '../../../../hooks/useInputState'

// ADD VALIDATION 
// ADD USE EFFECT TO GRAB EVENTS FROM DB, EMPLOYEE WILL HAVE CRUD IN DASHBOARD
//WHEN USER SUBMITS DECKLIST, AXIOS POST WITH EVENT ID AND DECKLIST , AND USER ID, POPULATE

export default function DecklistsDashboard() {

    const [decklist, handleDecklistChange, resetDecklist] = useInputState([
    ])

    const [event, handleEventChange] = useInputState([

    ])
    console.log(event)

    const sampleEvents = [
        {eventName:'MTG PTQ Standard', eventId:'1', eventDate:'10/10/2021' },
        {eventName:'MTG PTQ Modern', eventId:'2', eventDate:'10/20/2021' },
        {eventName:'MTG PTQ Limited', eventId:'3', eventDate:'10/27/2021' }
    ]



    const handleSubmit = (e) =>{

        let res = [];

        e.preventDefault()

        const regex = /([1-9][0-9]*)/;

        

        let splitDecklist = decklist.split(',');

        let letter = splitDecklist[0].charAt(0)




        for(let i=0;i<splitDecklist.length;i++){
            

                let quantityIndex = splitDecklist[i].search(regex);

                let quantity = splitDecklist[i].slice(quantityIndex, quantityIndex+1);

                let name = splitDecklist[i].slice(1, quantityIndex-1);

                res.push({name:name, quantity:quantity})

                

        }



        
        res[0].name = letter + res[0].name


        console.log(JSON.stringify(res))
    }

    return (
<Container >

<Row>
<Col xs={12}>
  
      <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Label> Decklist</Form.Label>
    <Form.Control
      as="textarea"
      placeholder="Enter decklist here"
      className='w-100'
      style={{ height: '600px'}}
      onChange={handleDecklistChange}
      value={decklist}
    />
    <Button type="submit"> Enter Decklist </Button>

    <Form.Select onChange={handleEventChange} aria-label="Default select example">
  <option>Select Event to Submit</option>
  {
      sampleEvents.map((e)=>(
        <option value={e.eventName}>{e.eventName}{e.eventDate}</option>
      ))

  }

</Form.Select>

    </Form>

    </Col>
    <Col>
    
        <Card>
            <Card.Title> Please enter like the example</Card.Title>
            <Card.Body>
                Mainboard 60, <br></br>
                Delver of Secrets 4, <br></br>
                Snapcaster Mage 2 <br></br>
                Lightning Bolt 4<br></br><br></br>
                Sideboard 15, <br></br>
                Lightning Helix 4,<br></br>
                Negate 3<br></br>

            </Card.Body>
            
        </Card>

    </Col>   
    </Row>
</Container>
            
    )
}
