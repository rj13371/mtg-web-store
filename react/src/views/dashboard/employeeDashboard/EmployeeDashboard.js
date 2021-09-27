import React, { Fragment, useState } from "react";
import EventsDashboard from "./Events/EventsDashboard";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AddProduct from "./Products/AddProduct";

const EmployeeDashboard = () => {

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
