import React, { Fragment, useState,useEffect, useContext } from "react";
import EventsDashboard from "./Events/EventsDashboard";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AddProduct from "./Products/AddProduct";
import axios from "axios";
import { Redirect } from "react-router";

import { AuthContext } from "../../../context/AuthContext";

const EmployeeDashboard = () => {

  const { authState } = useContext(AuthContext)



    if(authState.authorization_level=='0'){
      return <Redirect to="/"/>
    }

    
  return (
    <Fragment>
    <AddProduct/>
    <EventsDashboard/>
    <OrdersDashboard/>
    </Fragment>
  )
}

export default EmployeeDashboard
//CRUD events
// CRUD USERS
// CRUD ORDERSs

//ADD ROUTES FOR EMPLOYEE
