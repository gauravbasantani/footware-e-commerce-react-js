// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';

const CheckOut = () => {

    let navigate = useNavigate();
    let orderid = useRef("");
    let [total, setTotal] = useState(2);


    let message = "Not yet stared";
    let paymentId = "";
    let error = "";
    let options = {
    "key": "rzp_live_Ay9af2dQeUH8A6",
    "amount": "200",
    "name": "Gaurav Basantani",
    "description": "Web Development",
    "image": "https://media-exp1.licdn.com/dms/image/C4D03AQG3nqW9a90oog/profile-displayphoto-shrink_200_200/0/1658646650977?e=2147483647&v=beta&t=pHn-bCOni3ps4EQSVMo-z2n7qleEM292NnDJT0qK0rY",
    "order_id": "",
    "handler": function (response) {
      console.log(orderid.current);
      axios.post("https://react-ecomm-mern.herokuapp.com/order/markpaid",{data: { id:orderid.current } }).then((res)=>{
        navigate("/ordersuccess");
    });
      


    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };


    useEffect(()=>{
    if(localStorage.getItem("cartproducts") === null){
      navigate("/cart");
    }
    if(localStorage.getItem("usertype") === null){
      navigate("/userlogin");
    }
    if(localStorage.getItem("usertype") !== "user"){
      navigate("/userlogin");
    }
  },[]);

    let cartproducts = JSON.parse(localStorage.getItem("cartproducts"));

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

    function placeorder(e){
      e.preventDefault();
      if(checkOuts.address === ""){
        alert("Enter address");
        return;
      }

      let data = {...checkOuts};
      data.userid = localStorage.getItem("userid");
      let products = new Array();
      let mytotal = 0;
      for(let i = 0; i < cartproducts.length; i++)
      {
        let product = {
          productid:cartproducts[i].productid,
          name:cartproducts[i].name,
          color:cartproducts[i].color,
          size:cartproducts[i].size,
          quantity:cartproducts[i].quantity,
          price:cartproducts[i].price,
          total:cartproducts[i].quantity * cartproducts[i].price
        }
        products.push(product);
        mytotal += product.total;
      }
      setTotal(mytotal);
      data.products = products;
      axios.post("https://react-ecomm-mern.herokuapp.com/order/place",{data: data }).then((res)=>{
        console.log(res.data.data);
        alert(res.data.data._id);
        orderid.current = res.data.data._id;
        paymentId = '';
        error = '';
        options.amount = mytotal * 100; //paise
        options.prefill.name = localStorage.getItem("name");
        options.prefill.email = localStorage.getItem("email");
        options.prefill.contact = "+91" + localStorage.getItem("mobileno");
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
          alert("Failed");
        }
        );
       
      });
    }   

  return (
    <div>
    <div className='container mt-3' >
    <div className='row'>
    <div className='col-lg-6'>
       <label for="address">Address</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="address" aria-describedby="emailHelp" placeholder="Enter Address" />
       <label for="city">City</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="city" aria-describedby="emailHelp" placeholder="Enter City" />
       <label for="state">State</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="state" aria-describedby="emailHelp" placeholder="Enter State" />
       <label for="pincode">Pincode</label>
       <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="pincode" aria-describedby="emailHelp" placeholder="Enter Pincode" />       
    </div>
    <div className='col-lg-6'>
      <div className='mr-5'>
    <table className='table table-bordered table-stripped '>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Color</th>
        <th>Size</th>
        <th>Qauntity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>

    {
                  cartproducts.map((product) => {
                    return (
                      <>
                      <tr>
                      
                             <td> <h5>{product.name }</h5></td>
                             <td><img src={ "https://react-ecomm-mern.herokuapp.com/" + product.imagepath} style={{height:"70px"}}/></td>
                             <td> { product.color == "" ? "" : <span style={{ backgroundColor : product.color,  }}> { product.color }</span>} </td>
                              <td><h5>{ product.size == "" ? "" : <span > { product.size }</span>}</h5> </td>
                                                          <td>
                              {product.quantity}
                              </td>
                                                    <td>
                              <span className="price">{parseFloat(product.price).toFixed(2)}</span>
                              </td>
                           
                              <td>
                              <span className="price">{(product.price * product.quantity).toFixed(2)}</span>
                              </td>
                           
                        </tr>
                      </>
                    )
                  })
                }
                </table>
                </div>
    </div>
    </div>
    <div className='row'>
      <div className='col-md-11'>

      </div>
      <div className='col-md-1'>

    <div className=' mt-3' style={{width:"120px"}}>
    <button  onClick={(e)=>{ placeorder(e); }}>Place Order</button>
    </div>
    </div>
      </div>
    </div>
    
    </div>
  )
}

export default CheckOut;
