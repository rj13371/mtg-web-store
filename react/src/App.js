import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarComponent from './components/layouts/NavbarComponent';
import CardSearch from './components/search/CardSearch';
import Mtgcardsindex from './views/mtgcards/Mtgcardsindex';
import MtgCardDisplay from './views/mtgcards/MtgCardDisplay';
import EmployeeDashboard from './views/dashboard/employeeDashboard/EmployeeDashboard';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Form,
  Input
} from 'reactstrap';

function App() {
  return (
  <Fragment>
    <NavbarComponent/>
    <CardSearch/>
   <Route exact path='/cards/' render={(props) => (<Mtgcardsindex test="hi" {...props}/>)}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>
   <Route exact path='/mtgcards/:id' component={MtgCardDisplay}/>
  </Fragment>
  );
}

export default App;
