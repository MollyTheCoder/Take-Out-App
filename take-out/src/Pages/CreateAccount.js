import React from 'react'
import fire from '../Firebase/Firebase';
import {  Link } from 'react-router-dom'
//import store from './../store'

const CreateAccount = () => {

      const signUp = (e) => {

        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;

        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(user, pass).then((u)=>{
            console.log(u)
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            console.log(error);
        //    L {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
          })
      }
  return (
    <div className="container login">
    <div className="row">
        <div className="col-6 mx-auto  d-flex flex-column loginWrapper rounded p-5 m-5">
            <h3 className="mb-5">Login</h3>
            <div className="col-10 mx-auto d-flex flex-column">
                <form>
                <input type="text" className="mx-auto form-control mb-3" name="displayName" id="name" />
                <input type="text" className="mx-auto form-control mb-3" name="username" id="username" />
                <input type="password" className="mx-auto form-control mb-3" name="password" id="password"/>
                <Link to={'/Order'}>
                    <button type="submit" className="btn btn-primary col-4 mb-3" id="loginButton"  onClick={(e) => signUp(e)}>Login</button>  
                </Link>  
                </form>
                <p className="loginError d-none"> This is not the login you are looking for. Try again, you must! </p>
            </div>
        </div>     
    </div>
  
</div>
  )
}

export default CreateAccount
