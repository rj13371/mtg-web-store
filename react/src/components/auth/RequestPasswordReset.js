import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import axios from 'axios'
import { Redirect } from 'react-router'
import { useHistory } from 'react-router'
import ModalAlert from '../ModalAlert'

export default function RequestPasswordReset() {
  const history = useHistory()

  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

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

        setMessage(`If that email is associated with a username, please check your email! `)
        setMessageCount(messageCount+1)
     
        setTimeout(() => {
          history.push('/')
        }, 2000)


      })

      

  }

  if (submitted){
    return <Redirect to='/' />
  }




  
      return (
        <Container className="d-flex justify-content-center" >
          <ModalAlert header={header} message={message} messageCount={messageCount}/>
<Form onSubmit={handleSubmit}>


  <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={handleLoginFormEmail} value={loginFormEmail} type="text" placeholder="Enter Email" />
  </Form.Group>


  <Button variant="primary" type="submit">
    Request Reset Password
  </Button>
</Form>
</Container>
    )
    
}
