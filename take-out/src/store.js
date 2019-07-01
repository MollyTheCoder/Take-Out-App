import {applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducers from "./Reducers";

// const reducer  = (state, {type,payload}) => {
//     if(type === "FetchData") {
//         return {...state, "state": [...payload], "filteredState": [...payload]}
//      }
//     if(type === "AddNewOrder") {
//         return {...state, "filteredState": [...payload]}
//     }

//     if(type === "LoggedUserData") {
//         return {...state, "filteredState": [...payload]}
//     }
//     if(type === "ChangeOrder") {
//         return {...state, "filteredState": [...payload]}
//     }
//     if(type === "UpdateOrder") {
//         return {...state, "state": [...payload]}
//     }
//     if(type === "UpdateUserOrder") {
//         return {...state,"filteredState": [...payload]}
//     }

    
//     return state;
// }

const middleware = applyMiddleware(promise, thunk);

// const state = {
//     "state": [],
//     "filteredState": []
// }


//const store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(reducers, composeWithDevTools(middleware));;




// const middleware = applyMiddleware(promise(), thunk);

// export default createStore(reducers, composeWithDevTools(middleware));