const reducer  = (state = {Userdata: {}, userOrders: []}, {type,payload}) => {

    if(type === "LoggedUserData") {
        return {...state, Userdata: {...payload}}
    }
    if(type === "LoggedUserOrders") {
        return {...state, userOrders: [...payload]}
    }
    if(type === "UpdateUserOrder") {
        return {...state,"userOrders": [...payload]}
    }
    if(type === "DeleteOrder") {
        return {...state,"userOrders": [...payload]}
    }
    if(type === "AddNewOrder") {
        return {...state,"userOrders": [payload, ...state.userOrders]}
    }
    
    return state;
}

export default reducer;