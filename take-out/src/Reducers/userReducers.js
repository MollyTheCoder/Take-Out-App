const reducer  = (state = {}, {type,payload}) => {
    if(type === "FetchData") {
        return {...state, "state": [...payload], "filteredState": [...payload]}
     }

    if(type === "LoggedUserData") {
        return {...state, "filteredState": [...payload]}
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