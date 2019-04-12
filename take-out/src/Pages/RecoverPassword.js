import React from 'react'
import fire from '../Firebase/Firebase';
import {  Link } from 'react-router-dom'

const RecoverPassword = () => {

    const RecoverPass = (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        
        fire.auth().sendPasswordResetEmail(email).then((data)=>{
            console.log('success')
            document.querySelector('.loginSuccess').classList.remove('d-none');            
           
          }).catch((error) => {
              
              console.log(error, 'login fail');
              document.querySelector('.loginError').classList.remove('d-none')
          });      
    }
    const HideError = (e) => {
        let errorMessage = document.querySelector('.loginError');
        let successMessage = document.querySelector('.loginSuccess');

        if(!errorMessage.classList.contains('d-none')) {
            errorMessage.classList.add('d-none');
        }
        if(!successMessage.classList.contains('d-none')) {
            successMessage.classList.add('d-none');
        }
        
    }

  return (
    <div className="container login">
        <div className="row">
            <div className="col-6 mx-auto  d-flex flex-column loginWrapper rounded p-5 m-5">
                <h3 className="mb-5">Create a new account</h3>
                <div className="col-10 mx-auto d-flex flex-column">
                    <form>
                    <label>Email</label>
                    <input type="text" className="mx-auto form-control mb-3" name="email" id="email" onKeyPress={(e) => HideError(e)} />
                        <button type="submit" className="btn btn-primary col-6 mb-3" id="recoverButton" onClick={(e) => RecoverPass(e)}>Get new password</button>  
                    </form>
                    <p className="loginError d-none"> This email is not recognized! Try another one! </p>
                    <p className="loginSuccess d-none"> Check your email, reset your password and <Link to={'/'}> go back to login! </Link>  </p>
                </div>
                <p> Did you remember? <Link to={'/'}> Go back to login! </Link></p>
            </div>     
        </div>
    
    </div>
    
  )
}

export default RecoverPassword
