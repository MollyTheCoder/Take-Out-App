import axios from 'axios'
//import store from './../store'


const GetUnpaidOrders = () => {
    return (dispatch) => {  
        axios({
            method: "get",
            url: "https://app-test-e1d31.firebaseio.com/users.json",
            headers: {"ContentType": "application/json"}
        })
          .then(r => {
              let allUsersOrders = r.data.reduce((r,v) => {
                  let newUserObj = {}
                  newUserObj.name = v.name;
                  newUserObj.Id = v.userId;
                  newUserObj.orders = v.orders.filter(o => o.orderPaid === false);
      
                  return [...r, newUserObj]
              }, [])
              dispatch({type: "GetUnpaidOrders", payload: allUsersOrders}); 
          }).catch((err) => {
              console.log(err)
          })
    }

}

const DeleteOrder = (state, obj) => {
    let newState = state.reduce((r,o,v) => {
        let deleteOrders = o.orders.filter(n => n !== obj);
        o = {...o, orders: [...deleteOrders]}

        return [...r, o]

    }, [])

 //    store.dispatch({type: "ChangeOrder", payload: newState}); 
}

const PayOrder = (orderId, unpaidOrders) => {
    return (dispatch) => {  
        let newObj = unpaidOrders.reduce((r,v) => {
            v.orders = v.orders.filter( o => o.id !== orderId)

            return [...r, v]
    }, [])
        dispatch({type: "PayOrder", payload: newObj}); 
    } 
    
}

export {GetUnpaidOrders, DeleteOrder, PayOrder}