// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const CheckOut = () => {

    let navigate = useNavigate();
    let [orderid, setOrderId] = useState("");
    let [total, setTotal] = useState(2);


    let message = "Not yet stared";
    let paymentId = "";
    let error = "";
    let options = {
    "key": "rzp_live_Ay9af2dQeUH8A6",
    "amount": "200",
    "name": "Abhijit Gatade",
    "description": "Web Development",
    "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
    "order_id": "",
    "handler": function (response) {
      alert("Success:" + orderid);

      axios.post("http://localhost:8081/order/markpaid",{data: { id:orderid } }).then((res)=>{
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
      }
      data.products = products;
      axios.post("http://localhost:8081/order/place",{data: data }).then((res)=>{
        console.log(res.data.data);
        alert(res.data.data._id);
        setOrderId(res.data.data._id);
        paymentId = '';
        error = '';
        options.amount = total * 100; //paise
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
    

    useEffect(()=>{
        
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
    {
                  cartproducts.map((product) => {
                    return (
                      <>
                        <div className="product-cart d-flex" key={product.id}>
                          <div className="one-forth">
                            <div className="product-img">
                            </div>
                            <div className="display-tc">
                              <h3>{product.name } { product.color == "" ? "" : <span style={{ backgroundColor : 'red', padding: '10px' }}> { product.color }</span>} 
                              { product.size == "" ? "" : <span style={{ padding: '10px' }}> { product.size }</span>} 
                              </h3>
                            </div>
                          </div>
                          <div className="one-eight text-center">
                            <div className="display-tc">
                              <span className="price">{parseFloat(product.price).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="one-eight text-center">
                            <div className="display-tc">
                              {product.quantity}
                            </div>
                          </div>
                          <div className="one-eight text-center">
                            <div className="display-tc">
                              <span className="price">{(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
    </div>
    <button onClick={(e)=>{ placeorder(e); }}>Place Order</button>
    </div>
    </div>
  )
}

export default CheckOut;
