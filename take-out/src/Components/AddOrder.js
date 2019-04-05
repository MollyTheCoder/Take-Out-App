import React from 'react'
import { connect } from 'react-redux'
import store from './../store'
import {DeleteOrder} from '../actions/actions.js'
import {getDate} from '../general.js'
import {  Link } from 'react-router-dom'
import avatar from './avatar.jpg'

const AddOrder = props => {

    //ADD EDIT AND DELETE TODAY'S ORDER
    const AddOrderToday = (e) => {
        e.preventDefault();

        let newOrder = {};
        newOrder.orderPaid = false;
        newOrder.orderDate = todayDate;
        let newState = props.filteredState;

        let validateFields = [];

        var price = document.querySelector('input[name="orderPrice"]').value;

        e.currentTarget.querySelectorAll('input').forEach(item=> {
            newOrder[item.getAttribute('name')] = item.value;
            if(item.value === "") {
                validateFields = [...validateFields, "empty"]
                item.classList.add('border-danger');
            } else {
                item.classList.remove('border-danger');
            }
        })

        if(validateFields.length > 0) {
            document.querySelector('#SaveNewOrder .fieldsEmpty').classList.remove('d-none');
        } else if (!isNumeric(price)) {
            document.querySelector('#SaveNewOrder .priceNotNo').classList.remove('d-none');
            document.querySelector('#SaveNewOrder .fieldsEmpty').classList.add('d-none');
        } else {
            newState[0].orders.push(newOrder);
            store.dispatch({type: "AddNewOrder", payload: newState});    
            
            document.getElementById('SaveNewOrder').classList.remove('d-flex');
            document.getElementById('SaveNewOrder').classList.add('d-none');
            document.querySelector('#SaveNewOrder .error-field').classList.add('d-none')
            document.querySelector('#SaveNewOrder .priceNotNo').classList.add('d-none');

            document.querySelector('input[name="orderDetail"]').value = "";
            document.querySelector('input[name="orderPrice"]').value = "";
            document.querySelector('input[name="orderRestaurant"]').value = "";
        }
    }    
    const EditOrder = (e, obj) => {
        DeleteOrder(props.filteredState, obj);    

        document.querySelector('input[name="orderDetail"]').value = obj.orderDetail;
        document.querySelector('input[name="orderPrice"]').value = obj.orderPrice;
        document.querySelector('input[name="orderRestaurant"]').value = obj.OrderRestaurant;
        document.getElementById('SaveNewOrder').classList.remove('d-none');   
        document.getElementById('SaveNewOrder').classList.add('d-flex')        
    }
    const CancelOrder = (e, obj) => {
        DeleteOrder(props.filteredState, obj);    
        document.getElementById('SaveNewOrder').classList.remove('d-none');   
        document.getElementById('SaveNewOrder').classList.add('d-flex')  
    }

    //CHECK IF VALUE IS NUMBER
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    //GET TODAY'S DATE
    const todayDate = getDate();

    // RENDER ORDER LIST INFORMATION    
    let allOrders = props.filteredState.length > 0 ? props.filteredState.map((o, i) => {
        let orders = o.orders;
        return ( <div key={i} className="profileOrdersList white-background row p-3 d-flex flex-column rounded">
                <h3>All your orders</h3>
                {orders.length > 0 && 
                <div className="container">
                     <div className="row">
                        <p className="col-3"> Order Detail </p>
                        <p className="col-2"> Order Price </p>
                        <p className="col-3"> Order Restaurant</p>
                        <p className="col-2"> Order Status </p>
                        <p className="col-2"> </p>
                     </div>
                        {orders.map((v,k) => {
                            var status = v.orderPaid.toString() === "true" ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>;
                        return  <div key={k} className="row">
                                    <p className="col-3 orderDetail">{v.orderDetail}</p>
                                    <p className="col-2 orderPrice">{v.orderPrice} {v.orderCurrency}</p>
                                    <p className="col-3 ">{v.orderRestaurant} </p>
                                    <p className="col-2">{status}</p>
                                    {v.orderDate === todayDate && 
                                    <div className="col-2">
                                        <button type="button" className="editOrder btn btn-secondary" onClick={(e) => EditOrder(e, v) }><i className="fa fa-edit"></i></button>
                                        <button type="button" className="deleteOrder btn btn-secondary" onClick={(e) => CancelOrder(e, v)}><i className="fa fa-trash"></i></button>
                                    </div>
                                    }
                                </div> 
                      })}</div>
               
                    }
                                
                
        </div>
        )
    }) : "nothing found";


    //RENDER PROFILE HEADER INFORMATION
    let profileHeader = props.filteredState.map((o, i) => {
        let orders = o.orders;
        return ( <div key={i} className="profileHeader mb-3 white-background row flex-column d-flex">    
                <div className="profilePictureWrapper mx-auto">  
                    <img src={avatar} className="profilePicture" alt="" />          
                </div>
                <h1 className="m-5">{o.name}</h1>    
                <div>
                    <p>Unpaid Orders</p>
                </div>                                                         
                
        </div>
        )
    }) 
    
    // ADD 'D-NONE' CLASS TO SAVE NEW ORDER CONTAINER ON PAGE LOAD
    let isOrderToday = props.filteredState.length ? props.filteredState[0].orders.reduce((r,o) => {
        r = o.orderDate === todayDate && !document.getElementById('SaveNewOrder').classList.contains('d-none') ? "d-none" : "";        
        return r;
    }, "") : "nothing found";

    //START OF HTML
    return (
        <div id="profileWrapper" className="container rounded">
            <div className="backButton white-background pt-4 pr-4 row">
                <Link to={'/Order'}>
                        <button type="button" className="backButton"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></button>
                </Link>  
            </div>
            

            {profileHeader}
                
        
            <div id="SaveNewOrder" className={isOrderToday + " white-background my-3 p-3 row d-flex flex-column rounded"} >       
                <h3 className="mb-3">Today's order</h3>
                <form id="addOrderForm" className="d-flex justify-content-around" onSubmit={(e)=> AddOrderToday(e)} autoComplete="off" noValidate>
                    <input type="hidden" name="orderCurrency" value="LEI" />                
                    <fieldset>
                        <label className="mr-3">Order Detail</label>
                        <input type="text" name="orderDetail" className="border" required />
                    </fieldset>
                    <fieldset>
                        <label className="mr-3">Price</label>
                        <input type="text" name="orderPrice" className="border"  required />
                    </fieldset>
                    <fieldset>
                        <label className="mr-3">Restaurant</label>
                        <input type="text" name="orderRestaurant" className="border"  required />
                    </fieldset>
                    <button type="submit" className="btn btn-primary">Save Order</button>
                </form>        
                <p className="error-field d-none fieldsEmpty"> One cannot simply place order with empty fields </p>  
                <p className="error-field d-none priceNotNo"> You must pay your debt with number, not letters</p>
            </div>

            {allOrders}
        
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


