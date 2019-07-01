const reducer  = (state = {}, {type,payload}) => {
    if(type === "FetchData") {
        return {...state, "state": [...payload], "filteredState": [...payload]}
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