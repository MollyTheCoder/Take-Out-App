import React from 'react'
import { connect } from 'react-redux'
import store from './../store'
import {DeleteOrder} from '../actions/actions.js'

const AddOrder = props => {

    const AddOrderToday = (e) => {
        e.preventDefault();

        let newOrder = {};
        newOrder.orderPaid = false;
        newOrder.orderDate = todayDate;

        e.currentTarget.querySelectorAll('input').forEach(item=> {
            newOrder[item.getAttribute('name')] = item.value;
        })

        let newState = props.filteredState;
        newState[0].orders.push(newOrder)
        store.dispatch({type: "AddNewOrder", payload: newState});  

        document.getElementById('SaveNewOrder').classList.add('d-none')

    }

    const EditOrder = (e, obj) => {
        DeleteOrder(props.filteredState, obj);    
        document.getElementById('SaveNewOrder').classList.remove('d-none');    
    }
    const CancelOrder = (e, obj) => {
        DeleteOrder(props.filteredState, obj);    
        document.getElementById('SaveNewOrder').classList.remove('d-none');     
    }

    const curDay = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //As January is 0.
        let  yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
     
        return (yyyy + "-" + mm + "-" + dd);
        };
    const todayDate = curDay();

        
    let allOrders = props.filteredState.length > 0 ? props.filteredState.map((o, i) => {
        let orders = o.orders;
        return ( <div key={i}>
               {o.orders.length > 0 && 
                <p>{o.name}</p>
               }
                {o.orders.length > 0 && 
                <div className="container">{orders.map((v,k) => {
                        return  <div key={k} className="row">
                                    <p className="col-3 orderDetail">{v.orderDetail}</p>
                                    <p className="col-3 orderPrice">{v.orderPrice}{v.orderCurrency}</p>
                                    <p className="col-3">{v.orderPaid.toString()}</p>
                                    {v.orderDate === todayDate && 
                                    <div className="col-3">
                                        <button type="button" className="editOrder btn btn-secondary" onClick={(e) => EditOrder(e, v) }>Edit</button>
                                        <button type="button" className="deleteOrder btn btn-secondary" onClick={(e) => CancelOrder(e, v)}>Delete</button>
                                    </div>
                                    }
                                </div> 
                      })}</div>
               
                    }
                                
                
        </div>
        )
    }) : "nothing found"
    
    let isOrderToday = props.filteredState[0].orders.reduce((r,o) => {

        r = o.orderDate === todayDate ? "d-none" : "";
        
        return r;
    }, "");

  return (
    <div>
         <input type="date" id="DateOfOrder" defaultValue={todayDate} />
        <div>
            {allOrders}
        </div>
        <div id="SaveNewOrder" className={isOrderToday}>       
            <h3>Today's order</h3>
            <form id="addOrderForm"  onSubmit={(e)=> AddOrderToday(e)}>
                <input type="hidden" name="orderCurrency" value="LEI" />                
                <fieldset>
                    <label>Order Detail</label>
                    <input type="text" name="orderDetail"/>
                </fieldset>
                <fieldset>
                    <label>Price</label>
                    <input type="text" name="orderPrice" />
                </fieldset>
                <button type="submit" className="btn btn-primary">Save Order</button>
            </form>
           
            
            
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
  )(AddOrder)


