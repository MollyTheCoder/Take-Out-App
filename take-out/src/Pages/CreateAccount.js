import React from 'react'
import fire from '../Firebase/Firebase';
import {  Link } from 'react-router-dom'

const CreateAccount = () => {

      const signUp = (e) => {
     
        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        let name = document.getElementById('name').value;
        

        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(user, pass).then((u)=>{
            let userId = u.user.uid;
            //create user in data base
            fire.database().ref('users/' + userId).set({
                email: user,
                name: name,
                admin: false,
                userId: userId,
                orders: "undefined"
              });
        })
        .catch((error) => {
            console.log(error);
        //    L {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
             document.querySelector('.loginError').classList.remove('d-none')
          })
      }
  return (
    <div className="container login">
    <div className="row">
        <div className="col-6 mx-auto  d-flex flex-column loginWrapper rounded p-5 m-5">
            <h3 className="mb-5">Create a new account</h3>
            <div className="col-10 mx-auto d-flex flex-column">
                <form>
                <label>Name</label>
                <input type="text" className="mx-auto form-control mb-3" name="name" id="name" />
                <label>Email</label>
                <input type="text" className="mx-auto form-control mb-3" name="username" id="username" />
                <label>Password</label>
                <input type="password" className="mx-auto form-control mb-3" name="password" id="password"/>
                <Link to={'/Order'}>
                    <button type="submit" className="btn btn-primary col-4 mb-3" id="signUpButton"  onClick={(e) => signUp(e)}>Sign Up</button>  
                </Link>  
                </form>
                <p className="loginError d-none"> Can this email have more than one account? Nope! Try another one! </p>
            </div>
            <p className=""> Already have an account? <Link to={'/'}> Click here! </Link></p>
        </div>     
    </div>
  
</div>
  )
}

export default CreateAccount
