import React, { Fragment, useState,useEffect, useContext } from "react";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AddProduct from "./Products/AddProduct";
import EventsDashboard from "./Events/EventsDashboard";
import DecklistsDashboard from "../userDashboard/Decklists/DecklistsDashboard";

import { AuthContext } from "../../../context/AuthContext";
import EditLanding from "./EditLanding";
import { Container, Tab, Tabs } from "react-bootstrap";

const EmployeeDashboard = () => {

  const { authState } = useContext(AuthContext)



    if(authState.authorization_level=='0' || !authState.authorization_level ){
      return <Fragment>Unauthorized</Fragment>
    }

    
  return (
    <Fragment>
      <Container style={{color:'white'}} >
<Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="products" title="Products">
  <AddProduct/>
  </Tab>
  <Tab eventKey="orders" title="Orders">
  <OrdersDashboard/>
  </Tab>
  <Tab eventKey="landing" title="Landing">
  <EditLanding/>
  </Tab>
  <Tab eventKey="events" title="Events">
  <EventsDashboard/>
  </Tab>
  <Tab eventKey="decklists" title="Decklists">
  <DecklistsDashboard employee={true}/>
  </Tab>
</Tabs>




    </Container>
    </Fragment>
  )
}

export default EmployeeDashboard
//CRUD events
// CRUD USERS
// CRUD ORDERSs

//ADD ROUTES FOR EMPLOYEE
