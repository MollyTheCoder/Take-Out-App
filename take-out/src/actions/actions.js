import axios from 'axios'
import store from './../store'


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

const DeleteOrder = (state, obj) => {
    let newState = state.reduce((r,o,v) => {
        let deleteOrders = o.orders.filter(n => n !== obj);
        o = {...o, orders: [...deleteOrders]}

        return [...r, o]

    }, [])

     store.dispatch({type: "ChangeOrder", payload: newState}); 
}

const GetCurrentUserData = (state, email) => {
    let getUserData = state.filter(o => o.email === email);

    store.dispatch({type: "LoggedUserData", payload: getUserData})
}

export {FetchData,DeleteOrder, GetCurrentUserData}