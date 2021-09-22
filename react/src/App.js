import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarComponent from './components/layouts/NavbarComponent';
import CardSearch from './components/search/CardSearch';
import Mtgcardsindex from './views/mtgcards/Mtgcardsindex';
import MtgCardDisplay from './views/mtgcards/MtgCardDisplay';
import EmployeeDashboard from './views/dashboard/employeeDashboard/EmployeeDashboard';
import Contact from './views/contact/Contact';
import About from './views/contact/About';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Landing from './views/Landing';

function App() {
  return (
  <Fragment>
    <ShoppingCartProvider>
    <NavbarComponent/>
    <CardSearch/>
    <Route exact path='/' component={Landing}/>
   <Route exact path='/cards/' render={(props) => (<Mtgcardsindex test="hi" {...props}/>)}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>
   <Route exact path='/contact/' component={Contact}/>
   <Route exact path='/about/' component={About}/>
   <Route exact path='/mtgcards/:id' component={MtgCardDisplay}/>
   </ShoppingCartProvider>
  </Fragment>
  );
}

export default App;
