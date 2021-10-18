import React,{useState, useEffect} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import axios from 'axios'
import { useParams } from 'react-router'

export default function PasswordReset() {

    const {token,id} = useParams()
    console.log(token,id)

    

  const [loginFormPassword, handleLoginFormPassword] = useInputState('')
  const [loginFormPassword2, handleLoginFormPassword2] = useInputState('')




  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(loginFormPassword!=loginFormPassword2){
      console.log('passwords must match')
      return 1
    }

    const body ={
    userId: id,
      password: loginFormPassword,
      token: token
    }
    console.log(body)

    const login = await axios({
      method: "post",
      url: '/users/reset/resetPassword',
      data:body,
      withCredentials:true
    })
      .then((response) => {
        console.log(response)
      })

  }





  
      return (
        <Container className="d-flex justify-content-center" >
<Form onSubmit={handleSubmit}>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={handleLoginFormPassword} value={loginFormPassword} type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control onChange={handleLoginFormPassword2} value={loginFormPassword2} type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Reset Password
  </Button>
</Form>
</Container>
    )
    
}
