import axios from 'axios'
import store from './../store'


const FetchData = () => {
  axios({
      method: "get",
      url: "/Api/users.json",
      headers: {"ContentType": "application/json"}
  })
    .then(r => {
        store.dispatch({type: "FetchData", payload: r.data })
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


export {FetchData,DeleteOrder}