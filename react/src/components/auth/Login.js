import React,{useState} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import useInputState from '../../hooks/useInputState'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


export default function Login() {

  const [loginFormUserName, handleLoginFormUserName] = useInputState('')
  const [loginFormPassword, handleLoginFormPassword] = useInputState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const body ={
      username: loginFormUserName,
      password: loginFormPassword
    }
    console.log(body)

    const login = await axios({
      method: "post",
      url: '/users/login',
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