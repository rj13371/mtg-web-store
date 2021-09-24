import React from 'react'
import { Col, Button, Form, Row, FormGroup, Label, Input, Jumbotron, Container } from 'reactstrap';
export default function Contact() {
    return (
        <div>
        <Container fluid>
    <Jumbotron>
      <p className="lead"> Feel free to contact us @</p>
      <hr className="my-2" />
      <p>+1604-792-3666</p>
      <p>45610 Yale Rd #101, Chilliwack, BC V2P 2N2, Canada</p>
      <a href = "mailto:bastiongamesbg@gmail.com?subject = Feedback&body = Message">
      bastiongamesbg@gmail.com</a>

      <p className="lead">
        <Button color="primary">Learn More</Button>
      </p>

      <Container>
<Row>
    <Col sm={6}>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.4540934663296!2d-121.96399418431514!3d49.15398847931755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x410b83d1dfe49a63%3A0xe11e5b1e6907ad8e!2sBastion%20Games!5e0!3m2!1sen!2sjp!4v1632062334723!5m2!1sen!2sjp"
              frameBorder="0"
              style={{ height: '400px', width: '100%' }}
              allowFullScreen="true"
              aria-hidden="false"
              tabIndex="0"
            />
    </Col>
    <Col sm={6}>
<h3>Store Hours</h3>
<p>
Monday: <br/>
12:00 PM - 6:00 PM<br/>
Tuesday:<br/>
12:00 PM - 6:00 PM<br/>
Wednesday:<br/>
12:00 PM - 6:00 PM<br/>
Thursday: <br/>
12:00 PM - 6:00 PM<br/>
Friday:<br/>
12:00 PM - 8:00 PM<br/>
Saturday:<br/>
12:00 PM - 8:00 PM<br/>
Sunday:<br/>
12:00 PM - 8:00 PM<br/>
</p>
</Col>
</Row>
</Container>
    </Jumbotron>
    </Container>
<Container>

<h3 className="display-5">Feedback Form</h3>

    <Form>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
    </Col>
  </Row>
  <FormGroup>
    <Label for="exampleAddress">Address</Label>
    <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
  </FormGroup>
  <FormGroup>
    <Label for="exampleAddress2">Address 2</Label>
    <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
  </FormGroup>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleCity">City</Label>
        <Input type="text" name="city" id="exampleCity"/>
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup>
        <Label for="exampleState">State</Label>
        <Input type="text" name="state" id="exampleState"/>
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="exampleZip">Zip</Label>
        <Input type="text" name="zip" id="exampleZip"/>
      </FormGroup>  
    </Col>
  </Row>
  <FormGroup check>
    <Input type="checkbox" name="check" id="exampleCheck"/>
    <Label for="exampleCheck" check>Check me out</Label>
  </FormGroup>
  <Button>Sign in</Button>
</Form>
</Container>
  </div>
    )
}
