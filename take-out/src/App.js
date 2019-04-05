import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import AddOrder from "./Components/AddOrder";
import AllOrders from "./Components/AllOrders";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App  mt-5 mb-5">
         <Switch>       
              <Route exact path="/" component={Login} />
              <Route exact path="/Order" component={Orders} />
              <Route exact path="/MyOrder" component={AddOrder} />
              <Route exact path="/AllOrders" component={AllOrders} />
            </Switch>  
      </div>
    );
  }
}

export default App;
