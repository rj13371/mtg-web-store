import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarComponent from './components/layouts/NavbarComponent';
import CardSearch from './components/search/CardSearch';
import Mtgcardsindex from './views/mtgcards/Mtgcardsindex';
import EmployeeDashboard from './views/dashboard/EmployeeDashboard';

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
<Router>
  <Fragment>
    <NavbarComponent/>
    <CardSearch/>
   <Route exact path='/cards/' render={(props) => (<Mtgcardsindex test="hi" {...props}/>)}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>

  </Fragment>
</Router>
  );
}

export default App;
