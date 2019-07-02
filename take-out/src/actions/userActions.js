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


const GetCurrentUserData = (email) => {
    return (dispatch) => {  
        axios({
            method: "get",
            url: "https://app-test-e1d31.firebaseio.com/users.json",
            headers: {"ContentType": "application/json"}
        })
          .then(r => {
              console.log(r.data, email, 'the result')
              let getUserData = r.data.filter(o => o.email === email);
              console.log(getUserData)
              let currentUser = {}
              currentUser.name = getUserData[0].name;
              currentUser.Orders = getUserData[0].orders;
              currentUser.isAdmin = getUserData[0].admin;
            //   console.log(getUserData, getUserData, 'this here')
              dispatch({type: "LoggedUserData", payload: currentUser})
          }).catch((err) => {
              console.log(err)
          })  
    }   
}

export {FetchData, GetCurrentUserData}