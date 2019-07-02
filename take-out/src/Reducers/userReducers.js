const reducer  = (state = {Userdata: {}, userOrders: []}, {type,payload}) => {

    if(type === "LoggedUserData") {
        return {...state, Userdata: {...payload}}
    }
    // if(type === "UpdateUserOrder") {
    //     return {...state,"filteredState": [...payload]}
    // }
    
    return state;
}


export default reducer;