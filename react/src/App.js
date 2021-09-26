import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//GLOBAL COMPONENTS DISPLAY
import NavbarComponent from './components/layouts/NavbarComponent';
import FooterComponent from './components/layouts/FooterComponent';
import CardSearch from './components/search/CardSearch';


import Mtgcardsindex from './views/mtgcards/Mtgcardsindex';
import ProductsIndex from './views/products/ProductsIndex';
import ProductDisplay from './views/products/ProductDisplay';
import ProductDisplayByCatagory from './views/products/ProductDisplayByCatagory';
import MtgCardDisplay from './views/mtgcards/MtgCardDisplay';
import EmployeeDashboard from './views/dashboard/employeeDashboard/EmployeeDashboard';
import SidebarComponent from './components/layouts/SidebarComponent';
import NavbarCatagories from './components/layouts/NavbarCatagories';
import UserDashboard from './views/dashboard/userDashboard/UserDashboard';

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
import { Container,Col,Row} from 'react-bootstrap';

import useWindowSize from "./hooks/useWindowSize";


initFontAwesome();

function App() {

  
  const size = useWindowSize();

  return (
  <Fragment >
    <div className='App-background'>
    <Container fluid > 
    <ShoppingCartProvider>
    <NavbarComponent/>
   {size.width>500? <NavbarCatagories/> : null }
    <CardSearch/>
    <SidebarComponent />
  <Route exact path='/' component={Landing}/>
   <Route exact path='/cards/' render={(props) => (<Mtgcardsindex  {...props}/>)}/>

   <Route exact path='/products/' render={(props) => (<ProductsIndex  {...props}/>)}/>

   <Route exact path='/events/' component={EventsIndex}/>
   <Route exact path='/dashboard/' component={UserDashboard}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>
   <Route exact path='/contact/' component={Contact}/>
   <Route exact path='/about/' component={About}/>
   <Route exact path='/register/' component={Register}/>
   <Route exact path='/login/' component={Login}/>

   <Route exact path='/products/catagory/:catagoryName' component={ProductDisplayByCatagory}/>

   <Route exact path='/mtgcards/:id' component={MtgCardDisplay}/>
   <Route exact path='/products/:id' component={ProductDisplay}/>
   </ShoppingCartProvider>

   </Container>
   <FooterComponent/>
   </div>
  </Fragment>
  );
}

export default App;
