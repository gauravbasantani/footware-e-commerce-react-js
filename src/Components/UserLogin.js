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
        axios.post("https://node-gaurav-ecommerce.onrender.com/user/login",{data:{
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
            <div className="container mx-auto">
     
        
          
          <div className="login-wrapper mx-auto my-auto">
            <h1 className="login-title mx-auto text-center">Log in</h1>
            <form className='mx-auto' action="#!">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={data.email} onChange={(e)=>handle(e)} id="email" className="form-control" placeholder="email@example.com"/>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={data.password} onChange={(e)=>handle(e)} id="password" className="form-control" placeholder="enter your passsword"/>
              </div>
		
              <button name="login" id="login" onClick={(e)=>submit(e)} style={{backgroundColor:'#88c8bc'}} className="btn btn-block " type="button" value="Login">Login</button>
            </form>
            <a href="#!" className="forgot-password-link">Forgot password?</a>
            <p className="login-wrapper-footer-text">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>
          </div>
        </div>
        
   
    
    </div>
  )
}

export default UserLogin