import React, {useEffect} from 'react'
//import AddOrder from './../Components/AddOrder';
import {FetchData} from '../actions/actions.js'
import fire from '../Firebase/Firebase';
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import store from './../store'

const Orders = (props) => {

  useEffect(() => {    
    FetchData()
  },[]);

  let currentUser = fire.auth().currentUser;
  console.log(currentUser, 'this is a user') 

    props.state.map((o,i) => {
      let myData = [];
      if(o.email === currentUser.email) {
          myData.push(o)
          store.dispatch({type: "LoggedUserData", payload: myData});             
      }      
      return myData;
  })

  const isAdmin = props.filteredState.map((o,k) => {
      if(o.admin === true) {
        return (

          <Link to={'/AllOrders'} key={k}>
              <button type="button" className="btn btn-primary m-5">View and Edit All Orders</button>  
          </Link> 
        );
      } 
  })
  return (
    <div id="SeeOrders">
     <Link to={'/MyOrder'}>
          <button type="button" className="btn btn-primary m-5">View and Edit Your Order</button>  
      </Link>  
      {isAdmin}
               {/* <AddOrder data={props.state}/>  */}

     
    </div>
  )
}

const mapStateToProps = (store) => {
    return { 
      state: store.state,
      filteredState: store.filteredState
    }
  }
  
  const mapDispatchToProps = {  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Orders)
