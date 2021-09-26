import React from 'react'
import DecklistsDashboard from './Decklists/DecklistsDashboard'
//ADD ROUTES FOR EVENTS, ORDERS, AND DECKLISTS

export default function UserDashboard() {
    return (
        <div>
            <DecklistsDashboard/>
        </div>
    )
}

// CREATE DECKLIST
// PARAMS ARE DECKLIST, DATE CREATED, CHOSE FROM EVENT ENUM LIST GRABBED FROM DB, USER ID, 
//SUBMIT DECKLIST

// VIEW PREVIOS ORDERS, ORDERS HAVE PRODUCTS, DATE SUBMITTED, TOTAL COST
//