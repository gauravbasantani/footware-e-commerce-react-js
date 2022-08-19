// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const CheckOut = () => {
    let navigate = useNavigate();
    if(localStorage.getItem("cartproducts") === null){
      navigate("/cart");
    }
    if(localStorage.getItem("usertype") === null){
      navigate("/userlogin");
    }
    if(localStorage.getItem("usertype") !== "user"){
      navigate("/userlogin");
    }

    let [checkOuts, setCheckOuts] = useState({
        userid : '',
        address : '',
        city : '',
        state : '',
        pincode : '',
        totalamount: 0,
        shipmentamount:0,
        billamount : 0,
        products: [],
    });
    const handle = (e) =>{
      const newData = {...checkOuts}
      newData[e.target.id] = e.target.value
      setCheckOuts(newData)
    }

    

    useEffect(()=>{
        axios.post("http://localhost:8081/order/place",{data: checkOuts }).then((res)=>{
      console.log(res.data.data);
        })
    },[])
  return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-8'>
       <label for="address">Address</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="address" aria-describedby="emailHelp" placeholder="Enter Address" />
       <label for="city">City</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="city" aria-describedby="emailHelp" placeholder="Enter City" />
       <label for="state">State</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="state" aria-describedby="emailHelp" placeholder="Enter State" />
       <label for="pincode">Pincode</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="pincode" aria-describedby="emailHelp" placeholder="Enter Pincode" />
       
    </div>
    <div className='col-md-4'>

    </div>
    </div>
    </div>
  )
}

export default CheckOut;
