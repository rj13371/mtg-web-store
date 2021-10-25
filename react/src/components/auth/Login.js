import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axiosClient from '../../utils/axios'
import useInputState from '../../hooks/useInputState'
import { useHistory } from 'react-router'

import { Link } from 'react-router-dom'
import ModalAlert from '../ModalAlert'


export default function Login() {
  const history = useHistory()

  const [message, setMessage] = useState('')
  const [messageCount, setMessageCount] = useState(0)
  const [header, setHeader] = useState('Success')

  const [loginFormUserName, handleLoginFormUserName] = useInputState('')
  const [loginFormPassword, handleLoginFormPassword] = useInputState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const body ={
      username: loginFormUserName,
      password: loginFormPassword
    }
    console.log(body)

    const login = await axiosClient({
      method: "post",
      url: 'users/login',
      data:body,
      withCredentials:true
    })
      .then((response) => {
        console.log(response.data)
        if (response.status === 200){

          setMessage(`Welcome back, ${loginFormUserName}`)
          setMessageCount(messageCount+1)
       
          setTimeout(() => {
            history.push('/')
          }, 2000)
            
          
        }

      }).catch((e)=>{
        if (e){
          setHeader('Login Fail')
          setMessage(` Username: ${loginFormUserName} or password is incorrect`)
          setMessageCount(messageCount+1)
        }
      })



      

  }



    return (
        <Container style={{color:'white'}} className="d-flex justify-content-center" >
          <ModalAlert header={header} message={message} messageCount={messageCount}/>
<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control onChange={handleLoginFormUserName} value={loginFormUserName} type="text" placeholder="Enter username" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={handleLoginFormPassword} value={loginFormPassword} type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Login
  </Button>

  <Link to='/users/reset/requestPasswordReset'>
  <Button className="m-3" variant="secondary" type="submit">
    Forgot Password? 
  </Button>
  </Link>

  <Link to='/register'>
  <Button  variant="success" type="submit">
    Register
  </Button>
  </Link>

</Form>
</Container>
    )
}

// <Form onSubmit={(e)=>handleSubmit(e)}>
// <Form.Label> Decklist</Form.Label>
// <Form.Control
// as="textarea"
// placeholder="Enter decklist here"
// className='w-100'
// style={{ height: '600px'}}
// onChange={handleDecklistChange}
// value={decklist}
// />
// <Button type="submit"> Login </Button>

// </Form>