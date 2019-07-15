const reducer  = (state = {AllOrders: [], UnpaidOrders: []}, {type,payload}) => {
    if(type === "GetUnpaidOrders") {
        return {...state, "UnpaidOrders": [...payload]}
    }
    if(type === "PayOrder") {
        return {...state, "UnpaidOrders": [...payload]}
    }
    if(type === "NewOrder") {
        return {...state, "UnpaidOrders": [payload, ...state.UnpaidOrders]}
    }
    
    return state;
}


export default reducer;