import React, {useEffect} from 'react';
import AddOrder from './../Components/AddOrder';
import fire from '../Firebase/Firebase';
import { connect } from 'react-redux'
import {GetCurrentUserData} from '../actions/userActions.js'

const Orders = (props) => {
  useEffect(()=>{  
    let currentUser = fire.auth().currentUser; 
    console.log(currentUser)
    props.GetCurrentUserData(currentUser.uid)
  },[]);
  

  return (
    <div id="SeeOrders">
      <AddOrder data={props.state}/>      
    </div>
  )
}

const mapStateToProps = (store) => {
    return { 
      userInformation: store.user.Userdata,
      userOrders: store.user.userOrders
    }
  }
  
  const mapDispatchToProps = { GetCurrentUserData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Orders)
