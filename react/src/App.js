import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//GLOBAL COMPONENTS DISPLAY
import NavbarComponent from './components/layouts/NavbarComponent';
import FooterComponent from './components/layouts/FooterComponent';
import CardSearch from './components/search/CardSearch';


import Mtgcardsindex from './views/mtgcards/Mtgcardsindex';
import MtgCardDisplay from './views/mtgcards/MtgCardDisplay';
import EmployeeDashboard from './views/dashboard/employeeDashboard/EmployeeDashboard';


import Contact from './views/contact/Contact';
import About from './views/contact/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Landing from './views/Landing';
import EventsIndex from './views/events/EventsIndex';

import './App.css'


//FONT AWESOME
import initFontAwesome from './icons/fontAwesomeConfig';
initFontAwesome();

function App() {
  return (
  <Fragment >
    <div className='App-background'>
    <ShoppingCartProvider>
    <NavbarComponent/>
    <CardSearch/>
    <Route exact path='/' component={Landing}/>
   <Route exact path='/cards/' render={(props) => (<Mtgcardsindex test="hi" {...props}/>)}/>
   <Route exact path='/events/' component={EventsIndex}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>
   <Route exact path='/contact/' component={Contact}/>
   <Route exact path='/about/' component={About}/>
   <Route exact path='/register/' component={Register}/>
   <Route exact path='/login/' component={Login}/>
   <Route exact path='/mtgcards/:id' component={MtgCardDisplay}/>
   </ShoppingCartProvider>
   <FooterComponent/>
   </div>
  </Fragment>
  );
}

export default App;
