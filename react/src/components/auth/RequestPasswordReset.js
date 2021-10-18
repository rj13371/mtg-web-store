import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import axios from 'axios'
import { Redirect } from 'react-router'

export default function RequestPasswordReset() {

  const [loginFormEmail, handleLoginFormEmail] = useInputState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()



    const body ={
      email: loginFormEmail
    }
    console.log(body)

    const login = await axios({
      method: "post",
      url: '/users/reset/requestResetPassword/',
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
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={handleLoginFormEmail} value={loginFormEmail} type="text" placeholder="Enter username" />
  </Form.Group>


  <Button variant="primary" type="submit">
    Request Reset Password
  </Button>
</Form>
</Container>
    )
    
}
