import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'

export default function Register() {
    return (
        <Container className="d-flex justify-content-center">
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" />

    <Form.Text className="text-muted">
     Please use a unique password
    </Form.Text>

  </Form.Group>

  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
</Container>
    )
}
