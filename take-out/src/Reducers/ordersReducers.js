const reducer  = (state = {AllOrders: [], UnpaidOrders: []}, {type,payload}) => {
    if(type === "GetOrders") {
        return {...state, "AllOrders": [...payload]}
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

export default reducer;