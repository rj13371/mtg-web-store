import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import axios from 'axios'
import { useHistory } from 'react-router'
import useStateWithValidation from '../../hooks/useStateWithValidation'
import ModalAlert from '../ModalAlert'

export default function Register() {

  const history = useHistory()

  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')
  

  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [loginFormPassword, handleLoginFormPassword, isValidPw1] = useStateWithValidation(
    name => name.match(passw) ,
    ""
  )

  const [loginFormPassword2, handleLoginFormPassword2, isValidPw2] = useStateWithValidation(
    name => name.match(passw),
    ""
  )

  const [loginFormUserName, handleLoginFormUserName] = useInputState('')
  const [loginFormEmail, handleLoginFormEmail] = useInputState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if (!isValidPw1){
      setHeader('registration failed')
      setMessage('passwords must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
      return 1
    }

    if(loginFormPassword!=loginFormPassword2){
      setHeader('registration failed')
      setMessage('passwords must match')
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

        console.log(response)


         if (response.status === 200){
          
          setHeader('Registration Successful!')
          setMessage(`Please check your email at ${loginFormEmail} to verify your account, ${loginFormUserName}`)
          setMessageCount(messageCount+1)
          
          setTimeout(() => {
            history.push('/')
          }, 2000)
            
          
        }
      }).catch((e)=>{
        if (e){
          setHeader('Registration Fail')
          setMessage(` ${loginFormEmail} or ${loginFormUserName} is already in use, please register with a different username and or email`)
          setMessageCount(messageCount+1)
        }
      })
      

  }





  
      return (
        <Container className="d-flex justify-content-center" >
          <ModalAlert header={header} message={message} messageCount={messageCount}/>
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
    <Form.Control onChange={e => handleLoginFormPassword(e.target.value)} value={loginFormPassword} type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control onChange={e => handleLoginFormPassword2(e.target.value)}  value={loginFormPassword2} type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
</Container>
    )
    
}
