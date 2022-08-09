import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Cart = () => {
  
  const [cartproducts, setCart] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  let localProducts = new Array();
  if(localStorage.getItem("products")){
    localProducts = JSON.parse(localStorage.getItem("products"));
  }


  useEffect(()=>{
    axios.post("http://localhost:8081/product/list",{data :{ pcid: ''}}).then((res)=>{
      let products = new Array();
      let count = 1;        
      localProducts.forEach(localproduct => {
        res.data.data.forEach(product => {
          if(product._id === localproduct.productid)
          {
            product.varieties.forEach(variety => {
              if(variety.color === localproduct.color && variety.size === localproduct.size)
              {
                products.push({
                  id:count,
                  name:product.name,
                  color:variety.color,
                  size:variety.size,
                  imagepath:product.imagepath,
                  quantity:localproduct.quantity,
                  mrp:variety.mrp,
                  price:variety.price
                });
                count++;
              }
            });
          }          
        });
      });
      setCart(products);      
      calculateTotal();
      
    })
  },[])

  function calculateTotal(){

  }

  return (
    <div>
      <div className="colorlib-product">
        <div className="container">
          <div className="row row-pb-lg">
            <div className="col-md-10 offset-md-1">
              <div className="process-wrap">
                <div className="process text-center active">
                  <p><span>01</span></p>
                  <h3>Shopping Cart</h3>
                </div>
                <div className="process text-center">
                  <p><span>02</span></p>
                  <h3>Checkout</h3>
                </div>
                <div className="process text-center">
                  <p><span>03</span></p>
                  <h3>Order Complete</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-pb-lg">
            <div className="col-md-12">
              <div className="product-name d-flex">
                <div className="one-forth text-left px-4">
                  <span>Product Details</span>
                </div>
                <div className="one-eight text-center">
                  <span>Price</span>
                </div>
                <div className="one-eight text-center">
                  <span>Quantity</span>
                </div>
                <div className="one-eight text-center">
                  <span>Total</span>
                </div>
                <div className="one-eight text-center px-4">
                  <span>Remove</span>
                </div>
              </div>
              {
                cartproducts.map((product)=>{
                  return(
                    <>
              <div className="product-cart d-flex">
                <div className="one-forth">
                  <div className="product-img">
                  </div>
                  <div className="display-tc">
                    <h3>{product.name}</h3>
                  </div>
                </div>
                <div className="one-eight text-center">
                  <div className="display-tc">
                    <span className="price">${product.mrp}</span>
                  </div>
                </div>
                <div className="one-eight text-center">
                  <div className="display-tc">
                    <form action="#">
                      <input type="text" name="quantity" className="form-control input-number text-center" value="1" min="1" max="100" />
                    </form>
                  </div>
                </div>
                <div className="one-eight text-center">
                  <div className="display-tc">
                    <span className="price">${product.price}</span>
                  </div>
                </div>
                <div className="one-eight text-center">
                  <div className="display-tc">
                    <a href="#" className="closed"></a>
                  </div>
                </div>
              </div>
              </>
                  )
                })
              }
            </div>
          <div className="row row-pb-lg">
            <div className="col-md-12">
              <div className="total-wrap">
                <div className="row">
                  <div className="col-sm-8">
                  </div>
                  <div className="col-sm-4 text-center">
                    <div className="total">
                      <div className="sub">
                        <p><span>Subtotal:</span> <span>$200.00</span></p>
                        <p><span>Delivery:</span> <span>$0.00</span></p>
                        <p><span>Discount:</span> <span>$45.00</span></p>
                      </div>
                      <div className="grand-total">
                        <p><span><strong>Total:</strong></span> <span>$450.00</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Cart