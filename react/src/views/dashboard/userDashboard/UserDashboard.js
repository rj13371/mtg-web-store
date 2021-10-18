import React, {Fragment, useContext} from 'react'
import DecklistsDashboard from './Decklists/DecklistsDashboard'
import OrdersDashboard from './Orders/OrdersDashboard'
//ADD ROUTES FOR EVENTS, ORDERS, AND DECKLISTS


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
                : <h6 style={{color:'white'}}>{'please login'}</h6>}

        </Fragment>
            

    )
}

// CREATE DECKLIST
// PARAMS ARE DECKLIST, DATE CREATED, CHOSE FROM EVENT ENUM LIST GRABBED FROM DB, USER ID, 
//SUBMIT DECKLIST

// VIEW PREVIOS ORDERS, ORDERS HAVE PRODUCTS, DATE SUBMITTED, TOTAL COST
//