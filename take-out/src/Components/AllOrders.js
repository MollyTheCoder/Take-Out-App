import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {GetUnpaidOrders, PayOrder} from '../actions/orderActions.js'
import Calendar from './Calendar';
import {getDate} from '../general.js'


const AllOrders = (props) => {
  useEffect(()=>{  
    props.GetUnpaidOrders()
  },[]);
  
    
    let [date, setDate] = useState(getDate());

    const getValueDate = (val) => {  
      setDate(val);
    }
        

    let allOrders = props.unpaidOrders.length > 0 ? props.unpaidOrders.map((o, i) => {
        let orders = o.orders;
        return ( <div key={i}>         
               
                <div className="container"><h2 className="text-center col-12">{o.name}</h2>  { orders.length >0 ? orders.map((v,k) => {
                        return  <div key={k} className="row">                                                                     
                                    <p className="col-3 orderDate">{v.orderDate}</p>                                  
                                    <p className="col-3 orderDetail">{v.orderDetail}</p>
                                    <p className="col-3 orderPrice">{v.orderPrice}{v.orderCurrency}</p>
                                    <button type="button" className="paidOrder" onClick={(e) => props.PayOrder(v.id, props.unpaidOrders)}><i className="fa fa-money"></i></button> 
                                </div> 
                      }) : "This user has no unpaid orders" }</div>
               
                    
                                
                
        </div>
        )
    }) : "nothing found";
    
  //STARTING HTML

  return (
    <div>
    
       {allOrders}
</div>
  )
}

const mapStateToProps = (store) => {
    return {
      unpaidOrders: store.order.UnpaidOrders
    }
  }
  
  const mapDispatchToProps = { GetUnpaidOrders, PayOrder }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllOrders)
