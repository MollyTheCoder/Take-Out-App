import React from 'react'
//import AddOrder from './../Components/AddOrder';
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'

const Orders = (props) => {
  
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
