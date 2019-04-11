import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {FetchData} from '../actions/actions.js'
import fire from '../Firebase/Firebase';
import {  Link } from 'react-router-dom'


const Login = (props) => {
    // useEffect(() => {    
    //     FetchData()
    //   },[]);

     
      const LoginAction = (e) => {
        e.preventDefault();
        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        

        fire.auth().signInWithEmailAndPassword(user, pass).then((data)=>{
          console.log('success')
         
        }).catch((error) => {
            
            console.log(error, 'login fail');
            document.querySelector('.loginError').classList.remove('d-none')
        });      
        
      }  

   
  return (
    <div className="container login">
        <div className="row">
            <div className="col-6 mx-auto  d-flex flex-column loginWrapper rounded p-5 m-5">
                <h3 className="mb-5">Login</h3>
                <div className="col-10 mx-auto d-flex flex-column">
                    <form>
                    <label for="username">Email</label>
                    <input type="text" className="mx-auto form-control mb-3" name="username" id="username" />
                    <label for="password">Password</label>
                    <input type="password" className="mx-auto form-control mb-3" name="password" id="password"/>
                    <Link to={'/Order'}>
                        <button type="submit" className="btn btn-primary col-4 mb-3" id="loginButton"  onClick={(e) => LoginAction(e)}>Login</button>  
                    </Link>  
                    </form>
                    <p className="loginError d-none"> This is not the login you are looking for. Try again, you must! </p>
                </div>
                <p className=""> Dont't have an account? <Link to={'/SignUp'}>Click here! </Link></p>
            </div>     
        </div>
      
    </div>
  )
}

const mapStateToProps = (store) => {
    return {
      state: store.state,
      filteredState: store.filteredState
    }
  }
  
  const mapDispatchToProps = {  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)

