import React, {useState} from 'react'
import { connect } from 'react-redux'
import store from './../store'
import Calendar from './Calendar';
import {getDate} from '../general.js'

const AllOrders = (props) => {

    const PayOrder = (e, obj, user) => {
        let newObj = obj;
        newObj.orderPaid = true;
        
        let newState = props.state.reduce((r,v,k) => {
            if(v.userID === user.userID) {
                v.orders =  v.orders.filter(o => o !== obj);
                v = {...v, orders: [...v.orders, newObj]}
                let userOrder = [v];
               
                store.dispatch({type: "UpdateUserOrder", payload: userOrder}); 
            }

            return [...r, v]
        }, [])

        store.dispatch({type: "UpdateOrder", payload: newState}); 
        
    }
    
    let [date, setDate] = useState(getDate());

    const getValueDate = (val) => {  
      setDate(val);
    }
        

    let allOrders = props.state.length > 0 ? props.state.map((o, i) => {
        let orders = date === null ? o.orders : o.orders.filter(v=>v.orderDate === date);


        return ( <div key={i}>
               {o.orders.length > 0 && 
                <p>{o.name}</p>
               }
                {o.orders.length > 0 && 
                <div className="container">{orders.map((v,k) => {
                        return  <div key={k} className="row">
                                    
                                    {v.orderDate === getValueDate && 
                                    <div>
                                    <p className="col-3 orderDetail">{v.orderDetail}</p>
                                    <p className="col-3 orderPrice">{v.orderPrice}{v.orderCurrency}</p>
                                    <p className="col-3">{v.orderPaid.toString()}</p>
                                    
                                      {v.orderPaid === false &&
                                          <button type="button" onClick={(e) => PayOrder(e, v, o)}>Order was paid</button>
                                      }                                     
                                      </div>
                                    }
                                    
                                </div> 
                      })}</div>
               
                    }
                                
                
        </div>
        )
    }) : "nothing found"
  return (
    <div>
    {/* <input type="date" id="DateOfOrder" defaultValue={todayDate} /> */}
    <Calendar setValue={(val) => getValueDate(val)} date={date} />
   <div>
       {allOrders}
   </div> 
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
  )(AllOrders)
