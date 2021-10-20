import React, { Fragment, useState,useEffect, useContext } from "react";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AddProduct from "./Products/AddProduct";
import EventsDashboard from "./Events/EventsDashboard";
import DecklistsDashboard from "../userDashboard/Decklists/DecklistsDashboard";

import { AuthContext } from "../../../context/AuthContext";
import EditLanding from "./EditLanding";
import { Container } from "react-bootstrap";

const EmployeeDashboard = () => {

  const { authState } = useContext(AuthContext)



    if(authState.authorization_level=='0' || !authState.authorization_level ){
      return <Fragment>Unauthorized</Fragment>
    }

    
  return (
    <Fragment>
      <Container style={{color:'white'}} >
    <AddProduct/>
    <OrdersDashboard/>
    <EditLanding/>
    <EventsDashboard/>
    <DecklistsDashboard employee={true}/>
    </Container>
    </Fragment>
  )
}

export default EmployeeDashboard
//CRUD events
// CRUD USERS
// CRUD ORDERSs

//ADD ROUTES FOR EMPLOYEE
