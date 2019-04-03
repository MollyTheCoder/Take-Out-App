import {createStore} from 'redux'


const reducer  = (state, {type,payload}) => {
    if(type === "FetchData") {
        return {...state, "state": [...payload], "filteredState": [...payload]}
     }
    if(type === "AddNewOrder") {
        return {...state, "filteredState": [...payload]}
    }

    if(type === "LoggedUserData") {
        return {...state, "filteredState": [...payload]}
    }
    if(type === "ChangeOrder") {
        return {...state, "filteredState": [...payload]}
    }
    if(type === "UpdateOrder") {
        return {...state, "state": [...payload]}
    }
    if(type === "UpdateUserOrder") {
        return {...state,"filteredState": [...payload]}
    }

    
    return state;
}

const state = {
    "state": [],
    "filteredState": []
}


const store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store