import axios from 'axios'
import store from './../store'
import {getDate, isNumeric, getRandomInt} from '../general.js'

const FetchData = () => {
  axios({
      method: "get",
      url: "https://app-test-e1d31.firebaseio.com/users.json",
      headers: {"ContentType": "application/json"}
  })
    .then(r => {
        store.dispatch({type: "FetchData", payload: r.data })
    }).catch((err) => {
        console.log(err)
    })
}


const GetCurrentUserData = (id) => {
   
    return (dispatch) => {  
        axios({
            method: "get",
            url: "https://app-test-e1d31.firebaseio.com/users.json",
            headers: {"ContentType": "application/json"}
        })
          .then(r => {
              console.log(r.data)
              let getUserData = r.data[id];
              let currentUser = {};
              currentUser.name = getUserData.name;
              currentUser.Orders = getUserData.orders;
              currentUser.isAdmin = getUserData.admin;
            //   console.log(getUserData, getUserData, 'this here')
              dispatch({type: "LoggedUserData", payload: currentUser})
              dispatch({type: "LoggedUserOrders", payload: getUserData[0].orders})
          }).catch((err) => {
              console.log(err)
          })  
    }   
}

const AddOrderToday = (e) => {
    e.preventDefault();

    return (dispatch) => {  
        let newOrder = {};
        newOrder.orderPaid = false;
        newOrder.orderDate = getDate();
        newOrder.id = getRandomInt(100);

    
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
            dispatch({type: "AddNewOrder", payload: newOrder});    
            
            document.getElementById('SaveNewOrder').classList.remove('d-flex');
            document.getElementById('SaveNewOrder').classList.add('d-none');
            document.querySelector('#SaveNewOrder .error-field').classList.add('d-none')
            document.querySelector('#SaveNewOrder .priceNotNo').classList.add('d-none');
    
            document.querySelector('input[name="orderDetail"]').value = "";
            document.querySelector('input[name="orderPrice"]').value = "";
            document.querySelector('input[name="orderRestaurant"]').value = "";
        }
    }

   
}    

const DeleteOrder = (state, obj) => {
    return (dispatch) => {
        console.log(state, obj, 'look here')
       
        let newState = state.filter(o => o.id !== obj.id)
        dispatch({type: "DeleteOrder", payload: newState}); 
    }
    
}

export {FetchData, GetCurrentUserData, AddOrderToday, DeleteOrder}