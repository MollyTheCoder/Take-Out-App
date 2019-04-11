import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import AddOrder from "./Components/AddOrder";
import AllOrders from "./Components/AllOrders";
import fire from './Firebase/Firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: {},
    });   
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      
      if (user) {
        this.setState({user})
      //  console.log(user, 'there is a user');            
      } else {        
        this.setState({user: null})   
        console.log('no user')
      }
    });
  }

  signOut() {
    fire.auth().signOut();
  }
 
  render() {
    return (
      <div className="App  mt-5 mb-5">
        <button type="button" onClick={(e) => this.signOut()}> Sign Out </button>
         <Switch>                     
              {this.state.user ?
              <Route exact path="/" component={Orders} /> :
              <Route exact path="/" component={Login} />             
              }   
               <Route exact path="/SignUp" component={CreateAccount} />           
               <Route exact path="/Order" component={Orders} />
              <Route exact path="/MyOrder" component={AddOrder} />
              <Route exact path="/AllOrders" component={AllOrders} />
            </Switch>  
      </div>
    );
  }
}

export default App;
