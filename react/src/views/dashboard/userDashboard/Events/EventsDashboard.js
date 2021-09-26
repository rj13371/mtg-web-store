import React from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'

export default function EventsDashboard() {

    const sampleEvents = [
        {eventName:'MTG PTQ Standard', eventId:'1', eventDate:'10/10/2021' },
        {eventName:'MTG PTQ Modern', eventId:'2', eventDate:'10/20/2021' },
        {eventName:'MTG PTQ Limited', eventId:'3', eventDate:'10/27/2021' }
    ]

    return (
        <div>
            
            <Container>

{sampleEvents.length === 0 ? 'no results': null}

    <Row xs={1} md={3} className="g-4">
  {sampleEvents.map((event) => (
    <Col>
      <Card>
        <Card.Body>
        <Card.Title tag="h5">{event.eventName}</Card.Title>
        <Card.Subtitle tag='h3'>{event.eventDate} </Card.Subtitle>
          <Button href={`/products/${event.eventId}`} variant="primary" size="lg">  Details </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>

        </div>
    )
}
