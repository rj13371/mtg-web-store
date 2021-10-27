import React, {Fragment, useContext} from 'react'
import DecklistsDashboard from './Decklists/DecklistsDashboard'
import OrdersDashboard from './Orders/OrdersDashboard'
import { Alert, Container, Tab, Tabs } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'
import EventsDashboard from './Events/EventsDashboard'


export default function UserDashboard() {

    const { authState } = useContext(AuthContext)

    return (
        <Fragment> 
            <Container style={{color:'white'}} >

{authState.email?
                <Fragment> 

<Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="orders" title="Orders">
  <OrdersDashboard/>
  </Tab>
  <Tab eventKey="events" title="Events">
  <EventsDashboard/>
  </Tab>
  <Tab eventKey="decklists" title="Decklists">
  <DecklistsDashboard/>
  </Tab>
</Tabs>




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

