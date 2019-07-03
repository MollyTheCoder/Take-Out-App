import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Start from "./Pages/Start";
import CreateAccount from "./Pages/CreateAccount";
import RecoverPassword from "./Pages/RecoverPassword";
import AllOrders from "./Components/AllOrders";
import fire from './Firebase/Firebase';
import './App.css';

const App = (props) => {
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
              <Route path="/AllOrders" component={AllOrders} />              
              {/* <Route path="/MyOrder" component={AddOrder} />
               */}
            </Switch>  
      </div>
    );
  }


export default App;
