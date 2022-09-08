import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  let navigate = useNavigate();
    const [data, setData] = useState({
        email : '',
        password : '',
    
      });
      
    const handle = (e) =>{
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
      }
      function submit(e){
        e.preventDefault();
        axios.post("https://react-ecomm-mern.herokuapp.com/user/login",{data:{
          email : data.email,
          password : data.password}
        }).then(res => {
          console.log(res.data);
          if(res.data.status === "success")
          {
            localStorage.setItem("usertype", "user");
            localStorage.setItem("userid", res.data.data._id);
            localStorage.setItem("name", res.data.data.name);
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem("mobileno", res.data.data.mobileno);
            if(localStorage.getItem("cartproducts") != null)
              navigate("/checkout");
            else
              navigate("/user");
          }else{
            alert(res.data.data);
          }
        })
        
      }
  return (
    <div>
            <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 login-section-wrapper">
          <div className="brand-wrapper">
            <img src="assets/images/logo.svg" alt="logo" className="logo"/>
          </div>
          <div className="login-wrapper my-auto">
            <h1 className="login-title">Log in</h1>
            <form action="#!">
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input type="email" name="email" value={data.email} onChange={(e)=>handle(e)} id="email" className="form-control" placeholder="email@example.com"/>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={data.password} onChange={(e)=>handle(e)} id="password" className="form-control" placeholder="enter your passsword"/>
              </div>
              <input name="login" id="login" onClick={(e)=>submit(e)}  className="btn btn-block login-btn" type="button" value="Login"/>
            </form>
            <a href="#!" className="forgot-password-link">Forgot password?</a>
            <p className="login-wrapper-footer-text">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img src={{}} alt="login image" className="login-img"/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserLogin