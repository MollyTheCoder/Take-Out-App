import React  from 'react'
import { connect } from 'react-redux'
import {AddOrderToday, DeleteOrder} from '../actions/userActions.js'
import {SendOrder} from '../actions/orderActions.js'
import {getDate} from '../general.js'
import {  Link } from 'react-router-dom'
import avatar from './avatar.jpg'

const AddOrder = props => {

    const usersOrders = props.userOrders;
    const EditOrder = (obj) => {
         props.DeleteOrder(usersOrders, obj);    
     
         document.querySelector('input[name="orderDetail"]').value = obj.orderDetail;
         document.querySelector('input[name="orderPrice"]').value = obj.orderPrice;
         document.querySelector('input[name="orderRestaurant"]').value = obj.OrderRestaurant;
         document.getElementById('SaveNewOrder').classList.remove('d-none');   
         document.getElementById('SaveNewOrder').classList.add('d-flex')        
     }
     const CancelOrder = (obj) => {
         props.DeleteOrder(usersOrders, obj);       
         document.getElementById('SaveNewOrder').classList.remove('d-none');   
         document.getElementById('SaveNewOrder').classList.add('d-flex')  
     }

    let todayDate = getDate();
    //add button for admins to see al orders
    const isAdmin = props.userInformation.isAdmin === true ? <Link to={'/AllOrders'}>
    <button type="button" className="btn btn-primary m-5">View and Edit All Orders</button>  
</Link> : "";

    // RENDER ORDER LIST INFORMATION    
    let allOrders = usersOrders.length > 0 ?  <div className="profileOrdersList white-background row p-3 d-flex flex-column rounded">
                <h3>All your orders</h3>
               
                <div className="container">
                     <div className="row">
                        <p className="col-2"> Order Detail </p>
                        <p className="col-2"> Order Price </p>
                        <p className="col-2"> Order Restaurant</p>
                        <p className="col-2"> Order Status </p>
                        <p className="col-2"> Edit order </p>
                        <p className="col-2"> Ready? </p>
                     </div>
                        {usersOrders.map((v,k) => {
                            var status = v.orderPaid.toString() === "true" ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>;
                        return  <div key={k} className="row">
                                    <p className="col-2 orderDetail">{v.orderDetail}</p>
                                    <p className="col-2 orderPrice">{v.orderPrice} {v.orderCurrency}</p>
                                    <p className="col-2 ">{v.orderRestaurant} </p>
                                    <p className="col-2">{status}</p>
                                    {v.orderDate === todayDate && 
                                    <div className="col-4 row mx-0">
                                        <div className="col-6">
                                            <button type="button" className="editOrder btn btn-secondary" onClick={(e) => EditOrder(v) }><i className="fa fa-edit"></i></button>
                                            <button type="button" className="deleteOrder btn btn-secondary" onClick={(e) => CancelOrder(v)}><i className="fa fa-trash"></i></button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="sendOrder btn btn-secondary" onClick={(e) => props.SendOrder(v)}>Send order</button>
                                        </div>
                                    </div>
                                    }
                                </div> 
                      })}</div>         
                    </div>  : "No orders yet. Aren't you hungry?";


    
    // ADD 'D-NONE' CLASS TO SAVE NEW ORDER CONTAINER ON PAGE LOAD
    let isOrderToday = usersOrders.length ? usersOrders.reduce((r,o) => {
        r = o.orderDate === todayDate && !document.getElementById('SaveNewOrder').classList.contains('d-none') ? "d-none" : "";        
        return r;
    }, "") : "";

    
    //START OF HTML
    return (
        <div id="profileWrapper" className="container rounded">
            <div className="backButton white-background pt-4 pr-4 row">
                <Link to={'/Order'}>
                        <button type="button" className="backButton"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></button>
                </Link>  
            </div>
            

            <div  className="profileHeader mb-3 white-background row flex-column d-flex">    
                <div className="profilePictureWrapper mx-auto">  
                    <img src={avatar} className="profilePicture" alt="" />          
                </div>
                <h1 className="m-5">{props.userInformation.name}</h1>    
                <div>
                    <p>Unpaid Orders</p>
                    {isAdmin}
                </div>                                                         
                
        </div>
                
        
            <div id="SaveNewOrder" className={isOrderToday + " white-background my-3 p-3 row d-flex flex-column rounded"} >       
                <h3 className="mb-3">Today's order</h3>
                <form id="addOrderForm" className="d-flex justify-content-around" onSubmit={(e)=> props.AddOrderToday(e)} autoComplete="off" noValidate>
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
        userInformation: store.user.Userdata,
        userOrders: store.user.userOrders
      }
  }
  
  const mapDispatchToProps = { AddOrderToday, DeleteOrder, SendOrder }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddOrder)


