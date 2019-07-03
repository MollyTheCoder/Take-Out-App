import axios from 'axios'
import store from './../store'


const GetAllOrders = () => {
    console.log('gets here')
  axios({
      method: "get",
      url: "https://app-test-e1d31.firebaseio.com/users.json",
      headers: {"ContentType": "application/json"}
  })
    .then(r => {
        console.log(r.data)
    }).catch((err) => {
        console.log(err)
    })
}

const DeleteOrder = (state, obj) => {
    let newState = state.reduce((r,o,v) => {
        let deleteOrders = o.orders.filter(n => n !== obj);
        o = {...o, orders: [...deleteOrders]}

        return [...r, o]

    }, [])

     store.dispatch({type: "ChangeOrder", payload: newState}); 
}


export {GetAllOrders, DeleteOrder}