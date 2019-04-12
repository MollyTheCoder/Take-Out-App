import React, {useEffect} from 'react';
import AddOrder from './../Components/AddOrder';
import {FetchData, GetCurrentUserData} from '../actions/actions.js'
import fire from '../Firebase/Firebase';
import { connect } from 'react-redux'


const Orders = (props) => {
  console.log(props.state, 'this is the state')  
  useEffect(()=>{  
    let currentUser = fire.auth().currentUser; 
    console.log("tesdt",currentUser)
  },[]);
  

  return (
    <div id="SeeOrders">
     {/* <Link to={'/MyOrder'}>
          <button type="button" className="btn btn-primary m-5">View and Edit Your Order</button>  
      </Link>   */}
      {/* {isAdmin} */}
               <AddOrder data={props.state}/> 

     
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
