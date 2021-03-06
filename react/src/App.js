import React, { Fragment, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//GLOBAL COMPONENTS DISPLAY
import NavbarComponent from "./components/layouts/NavbarComponent";
import FooterComponent from "./components/layouts/FooterComponent";
import Searchbar from "./components/search/Searchbar";
import axiosClient from "./utils/axios";

import Mtgcardsindex from "./views/mtgcards/Mtgcardsindex";
import ProductDisplay from "./views/products/ProductDisplay";
import ProductDisplayByCatagory from "./views/products/ProductDisplayByCatagory";
import MtgCardDisplay from "./views/mtgcards/MtgCardDisplay";
import EmployeeDashboard from "./views/dashboard/employeeDashboard/EmployeeDashboard";
import SidebarComponent from "./components/layouts/SidebarComponent";
import NavbarCatagories from "./components/layouts/NavbarCatagories";
import UserDashboard from "./views/dashboard/userDashboard/UserDashboard";

import Contact from "./views/contact/Contact";
import About from "./views/contact/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Landing from "./views/Landing";
import EventsIndex from "./views/events/EventsIndex";
import Logout from "./components/auth/Logout";
import Checkout from "./components/cart/Checkout";
import Loading from "./components/Loading";

import "./App.css";

//FONT AWESOME
import initFontAwesome from "./icons/fontAwesomeConfig";
import { Container } from "react-bootstrap";

import useWindowSize from "./hooks/useWindowSize";
import PasswordReset from "./components/auth/PasswordReset";
import RequestPasswordReset from "./components/auth/RequestPasswordReset";
import MtgCardDisplayBySetName from "./views/mtgcards/MtgCardDisplayByCategory";
import EventDisplay from "./views/events/EventDisplay";
import DecklistDisplay from "./views/decklists/DecklistDisplay";


initFontAwesome();

function App() {
  const { setAuthState, authState, loadingAuth, setLoadingAuth } =
    useContext(AuthContext);

  const loadData = async () => {
    const response = await axiosClient({
      method: "get",
      url: "auth/isAuth",
      withCredentials: true,
    });
    console.log(response.data);

    if (!response.data) {
      console.log("error", response.data);
      setLoadingAuth(false);
      return 1;
    }

    if (response.data.error) {
      console.log("error", response.data.error);
      setLoadingAuth(false);
    }

    if (!response.data.user) {
      setLoadingAuth(false);
    } else {
      setAuthState({
        _id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        authorization_level: response.data.user.authorization_level,
      });

      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    if (loadingAuth) {
      loadData();
    } else {
      console.log("logged in");
    }
  }, [authState, loadingAuth]);

  const size = useWindowSize();

  return (
  <Fragment >
    <div className='App-background'>
    <Container fluid > 
    <Router forceRefresh={true} >
    
    <ShoppingCartProvider>
    <NavbarComponent/>
   {size.width>500? <NavbarCatagories/> : null }

<Searchbar />
    <SidebarComponent />

 {loadingAuth? <Loading/> :    

    <Switch>


  <Route exact path='/' component={Landing}/>


   <Route exact path='/events/' component={EventsIndex}/>
   <Route exact path='/dashboard/' component={UserDashboard}/>
   <Route exact path='/employeedashboard/' component={EmployeeDashboard}/>
   <Route exact path='/checkout/' component={Checkout}/>
   <Route exact path='/contact/' component={Contact}/>
   <Route exact path='/about/' component={About}/>
   <Route exact path='/register/' component={Register}/>
   <Route exact path='/login/' component={Login}/>
   <Route exact path='/logout/' component={Logout}/>

   <Route exact path='/cards/:cardName' component={Mtgcardsindex}/>
   <Route exact path='/products/catagory/:catagoryName' component={ProductDisplayByCatagory}/>
   <Route exact path='/mtgcards/set_name/:set_name' component={MtgCardDisplayBySetName}/>


   <Route exact path='/card_name/:card_name' component={MtgCardDisplay}/>

   <Route exact path='/mtgcards/:id' component={MtgCardDisplay}/>
   <Route exact path='/products/:id' component={ProductDisplay}/>
   <Route exact path='/event/:id' component={EventDisplay}/>
   <Route exact path='/decklist/:id' component={DecklistDisplay}/>

   <Route exact path='/reset/passwordResetPage/:token/:id' component={PasswordReset}/>
   <Route exact path='/users/reset/requestPasswordReset' component={RequestPasswordReset}/>

   </Switch>
   } 

   </ShoppingCartProvider>
   </Router>
   </Container>
   <FooterComponent/>
   </div>
  </Fragment>
  );
}

export default App;
