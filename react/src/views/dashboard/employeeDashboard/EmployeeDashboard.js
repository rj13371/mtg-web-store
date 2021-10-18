import React, { Fragment, useState,useEffect, useContext } from "react";
import EventsDashboard from "./Events/EventsDashboard";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AddProduct from "./Products/AddProduct";

import { AuthContext } from "../../../context/AuthContext";
import EditLanding from "./EditLanding";

const EmployeeDashboard = () => {

  const { authState } = useContext(AuthContext)



    if(authState.authorization_level=='0' || !authState.authorization_level ){
      return <Fragment>Unauthorized</Fragment>
    }

    
  return (
    <Fragment>
    <AddProduct/>
    <EventsDashboard/>
    <OrdersDashboard/>
    <EditLanding/>
    </Fragment>
  )
}

export default EmployeeDashboard
//CRUD events
// CRUD USERS
// CRUD ORDERSs

//ADD ROUTES FOR EMPLOYEE
