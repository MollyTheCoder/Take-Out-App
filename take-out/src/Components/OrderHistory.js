import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {GetUnpaidOrders} from '../actions/orderActions.js'
import Calendar from './Calendar';
import {getDate} from '../general.js'


const AllOrders = (props) => {
console.log(props.unpaidOrders, 'UNPAID ORDERS')
  useEffect(()=>{  
    console.log('testing')
    props.GetUnpaidOrders()
  },[]);
  
    const PayOrder = (e, obj, user) => {
        let newObj = obj;
        newObj.orderPaid = true;
        
        let newState = props.state.reduce((r,v,k) => {
            if(v.userID === user.userID) {
                v.orders =  v.orders.filter(o => o !== obj);
                v = {...v, orders: [...v.orders, newObj]}
                let userOrder = [v];
               
               // store.dispatch({type: "UpdateUserOrder", payload: userOrder}); 
            }

            return [...r, v]
        }, [])

       // store.dispatch({type: "UpdateOrder", payload: newState}); 
        
    }
    
    let [date, setDate] = useState(getDate());

    const getValueDate = (val) => {  
      setDate(val);
    }
        

    let allOrders = props.unpaidOrders.length > 0 ? props.unpaidOrders.map((o, i) => {
        let orders = o.orders;
        return ( <div key={i}>
               
                {orders.length > 0 && 
                <div className="container">{orders.map((v,k) => {
                        return  <div key={k} className="row">
                                    
                                    {v.orderDate === date && 
                                    <div>
                                    <p>{o.name}</p>
                                    <p className="col-3 orderDetail">{v.orderDetail}</p>
                                    <p className="col-3 orderPrice">{v.orderPrice}{v.orderCurrency}</p>
                                    <p className="col-3">{v.orderPaid.toString()}</p>
                                    
                                      {v.orderPaid === false &&
                                          <button type="button" className="paidOrder" onClick={(e) => PayOrder(e, v, o)}><i class="fa fa-money"></i></button>
                                      }                                     
                                      </div>
                                    }
                                    
                                </div> 
                      })}</div>
               
                    }
                                
                
        </div>
        )
    }) : "nothing found";
    
  //STARTING HTML

  return (
    <div>
     <input type="date" id="DateOfOrder" defaultValue={todayDate} /> 
     <Calendar setValue={(val) => getValueDate(val)} date={date} />
   <div>
       {allOrders}
   </div> 
</div>
  )
}

const mapStateToProps = (store) => {
    return {
      unpaidOrders: store.order.UnpaidOrders
    }
  }
  
  const mapDispatchToProps = { GetUnpaidOrders }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllOrders)
