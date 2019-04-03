import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {FetchData} from '../actions/actions.js'
import {  Link } from 'react-router-dom'
import store from './../store'

const Login = (props) => {
    useEffect(() => {    
        FetchData()
      },[]);

      const LoginAction = (e) => {

        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        let loginSuccess = [];


        props.state.map((o,i) => {
            let myData = [];
            if(o.userID === user && o.password === pass) {
                myData.push(o)
                loginSuccess = [...loginSuccess, "true"]
                store.dispatch({type: "LoggedUserData", payload: myData});             
            } else {             
                loginSuccess = [...loginSuccess, "false"]
            }         
        })

        if(!loginSuccess.includes('true')) {
            e.preventDefault();
            document.querySelector('.loginError').classList.remove('d-none')
        }
        
      }

    console.log(props.state)
  return (
    <div className="container login">
        <div className="row">
            <div className="col-6 mx-auto  d-flex flex-column loginWrapper rounded p-5 m-5">
                <h3 className="mb-5">Login</h3>
                <div className="col-10 mx-auto d-flex flex-column">
                    <form>
                    <input type="text" className="mx-auto form-control mb-3" name="username" id="username" />
                    <input type="password" className="mx-auto form-control mb-3" name="password" id="password"/>
                    <Link to={'/Order'}>
                        <button type="submit" className="btn btn-primary col-4 mb-3"  onClick={(e) => LoginAction(e)}>Login</button>  
                    </Link>  
                    </form>
                    <p className="loginError d-none"> This is not the login you are looking for. Try again! </p>
                </div>
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

