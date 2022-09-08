import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const [data, setData] = useState({
        name:'',
        email:'',
        mobileno:'',
        password:'',
    });
    const handle = (e) =>{
        const newData = {...data}
        newData[e.target.id] = e.target.value;
        setData(newData);
      }
      function submit(e){
        e.preventDefault();
        axios.post("https://react-ecomm-mern.herokuapp.com/user/register",{data:{
            name : data.name,
            email : data.email,
            mobileno :data.mobileno,
            password : data.password}
          }).then(res => {
            console.log(res.data)
          })
          
      }
  return (
    <div>   <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 login-section-wrapper">
        <div className="brand-wrapper">
          
        </div>
        <div className="login-wrapper my-auto">
          <h1 className="login-title">Register</h1>
          <form action="#!">
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input type="text" name="name" value={data.name} onChange={(e)=>handle(e)} id="name" className="form-control" placeholder="enter your name"/>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={data.email} onChange={(e)=>handle(e)} id="email" className="form-control" placeholder="email@example.com"/>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="mobileno">Phone No.</label>
              <input type="number" name="mobileno" value={data.mobileno} onChange={(e)=>handle(e)} id="mobileno" className="form-control" placeholder="enter your phone number"/>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={data.password} onChange={(e)=>handle(e)} id="password" className="form-control" placeholder="enter your passsword"/>
            </div>
            <input name="register" id="register" onClick={(e)=>submit(e)}  className="btn btn-block login-btn" type="button" value="register"/>
          </form>
          
        </div>
      </div>
      
    </div>
  </div></div>
  )
}

export default Register