import React, {Fragment, useContext} from 'react'
import DecklistsDashboard from './Decklists/DecklistsDashboard'
import OrdersDashboard from './Orders/OrdersDashboard'
import { Alert } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'


export default function UserDashboard() {

    const { authState } = useContext(AuthContext)

    return (
        <Fragment> 

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

        </Fragment>
            

    )
}

