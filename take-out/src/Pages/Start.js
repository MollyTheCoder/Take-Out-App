import React, {useEffect,useState} from 'react'
import fire from '../Firebase/Firebase';
import Orders from "./Orders";
import Login from "./Login";
const Start = () => {
  let [LoggedIn,setLoggedIn] = useState(null);  
  useEffect(()=>{
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            setLoggedIn(true);
        } else {
            // No user is signed in.                
            setLoggedIn(false);
        }
    })
  },[]);
  
  let renderComponent = LoggedIn ? (<Orders />) : (<Login />);
  return (
    <>
        {renderComponent}  
    </>
  )
}

export default Start
