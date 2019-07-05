const reducer  = (state = {AllOrders: [], UnpaidOrders: []}, {type,payload}) => {
    if(type === "GetUnpaidOrders") {
        return {...state, "UnpaidOrders": [...payload]}
    }
    if(type === "PayOrder") {
        return {...state, "UnpaidOrders": [...payload]}
    }
    // if(type === "UpdateOrder") {
    //     return {...state, "state": [...payload]}
    // }
    // if(type === "UpdateUserOrder") {
    //     return {...state,"filteredState": [...payload]}
    // }

    
    return state;
}


export default reducer;