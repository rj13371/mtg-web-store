import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import axios from 'axios'
import { Redirect } from 'react-router'

export default function Register() {

  const [loginFormUserName, handleLoginFormUserName] = useInputState('')
  const [loginFormPassword, handleLoginFormPassword] = useInputState('')
  const [loginFormPassword2, handleLoginFormPassword2] = useInputState('')
  const [loginFormEmail, handleLoginFormEmail] = useInputState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(loginFormPassword!=loginFormPassword2){
      console.log('passwords must match')
      return 1
    }

    const body ={
      username: loginFormUserName,
      password: loginFormPassword,
      email: loginFormEmail
    }
    console.log(body)

    const login = await axios({
      method: "post",
      url: '/users/register',
      data:body,
      withCredentials:true
    })
      .then((response) => {
        setSubmitted(!submitted)
      })

      

  }

  if (submitted){
    return <Redirect to='/' />
  }




  
      return (
        <Container className="d-flex justify-content-center" >
<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control onChange={handleLoginFormUserName} value={loginFormUserName} type="text" placeholder="Enter username" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={handleLoginFormEmail} value={loginFormEmail} type="text" placeholder="Enter username" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={handleLoginFormPassword} value={loginFormPassword} type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control onChange={handleLoginFormPassword2} value={loginFormPassword2} type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
</Container>
    )
    
}
