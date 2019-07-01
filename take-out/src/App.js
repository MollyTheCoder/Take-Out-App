import React, { Component, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import {FetchData, GetCurrentUserData} from './actions/actions.js'
import Start from "./Pages/Start";
import CreateAccount from "./Pages/CreateAccount";
import RecoverPassword from "./Pages/RecoverPassword";
import AddOrder from "./Components/AddOrder";
import AllOrders from "./Components/AllOrders";
import fire from './Firebase/Firebase';
import './App.css';

const App = (props) => {

    useEffect(() => {    
      FetchData()
    },[]);

  // constructor() {
  //   super();
  //   this.state = ({
  //     user: {},
  //   });   
  //   this.authListener = this.authListener.bind(this);
  // }

  // componentDidMount() {
  //   this.authListener();
  // }
  // const authListener = () => {
  //   fire.auth().onAuthStateChanged((user) => {
      
  //     if (user) {
  //    //   this.setState({user})
  //       console.log(user, 'there is a user');            
  //     } else {        
  //     //  this.setState({user: null})   
  //       console.log('no user')
  //     }
  //   });
  // }

  const signOut = (e) => {
    fire.auth().signOut();
  }
 

    return (
      <div className="App  mt-5 mb-5">
        <button type="button" onClick={(e) => signOut(e)}> Sign Out </button>
         <Switch>                                   
              <Route exact path="/" component={Start} />
              <Route path="/SignUp" component={CreateAccount} />    
              <Route path="/RecoverPassword" component={RecoverPassword} />                
              <Route path="/MyOrder" component={AddOrder} />
              <Route path="/AllOrders" component={AllOrders} />
            </Switch>  
      </div>
    );
  }


export default App;
