import React, {Fragment, useContext} from 'react'
import DecklistsDashboard from './Decklists/DecklistsDashboard'
import OrdersDashboard from './Orders/OrdersDashboard'
import { Alert, Container } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'


export default function UserDashboard() {

    const { authState } = useContext(AuthContext)

    return (
        <Fragment> 
            <Container style={{color:'white'}} >

{authState.email?
                <Fragment> 
                <DecklistsDashboard/>
                <OrdersDashboard/>
                </Fragment> 
                : 

                <Alert variant='danger'>
                  <Alert.Link href="/login">  Please Login or Register to see your Dashboard</Alert.Link>
                 
              </Alert>
                



                }
</Container>
        </Fragment>
            

    )
}

