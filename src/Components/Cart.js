import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Cart = () => {
  let navigate = useNavigate();
  const [cartproducts, setCart] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  let [cartemtpy, setcartEmpty] = useState(false);

  useEffect(() => {
    axios.post("http://localhost:8081/product/list", { data: { pcid: '' } }).then((res) => {
      let products = new Array();
      let count = 1;
      let localProducts = new Array();
      if (localStorage.getItem("products")) {
        localProducts = JSON.parse(localStorage.getItem("products"));
      }
      localProducts.forEach(localproduct => {
        res.data.data.forEach(product => {
          if (product._id === localproduct.productid) {
            product.varieties.forEach(variety => {
              if (variety.color === localproduct.color && variety.size === localproduct.size) {
                products.push({
                  id: count,
                  productid: product._id,
                  name: product.name,
                  color: variety.color,
                  size: variety.size,
                  imagepath: product.imagepath,
                  quantity: localproduct.quantity,
                  mrp: variety.mrp,
                  price: variety.price
                });
                count++;
              }
            });
          }
        });
      });
      setCart(products);
    });
  }, []);

  useEffect(()=>{
    calculateTotal();
  });
  function handleDump(e){
    e.preventDefault();    
    localStorage.setItem("cartproducts",JSON.stringify(cartproducts));
    navigate('/checkout');
  }

  function handleQauntity(e, id) {
    e.preventDefault();
    let localProducts = JSON.parse(localStorage.getItem("products"));
    let products = cartproducts;
    if (e.target.value != "") {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          products[i]["quantity"] = e.target.value;
          for (let j = 0; j < localProducts.length; j++) {
            let localproduct = localProducts[j];
            let variety = products[i];
            if (variety.productid === localproduct.productid && variety.color === localproduct.color && variety.size === localproduct.size) {
              localProducts[j]["quantity"] = e.target.value;
            }
          }
        }
      }
      localStorage.setItem("products", JSON.stringify(localProducts));
      setCart([...products]);
    }
  }


  function removeProduct(e, id) {
    e.preventDefault();
    if (window.confirm("Sure to remove?")) {
      let products = new Array();
      let product = null;
      for (let i = 0; i < cartproducts.length; i++) {
        if (cartproducts[i].id !== id) {
          products.push(cartproducts[i]);
        }
        else {
          product = cartproducts[i];
        }
      }
      setCart(products);
      if (product != null) {
        let localProducts = JSON.parse(localStorage.getItem("products"));
        let lproducts = new Array();
        for (let i = 0; i < localProducts.length; i++) {
          if (localProducts[i].productid === product.productid && localProducts[i].size === product.size && localProducts[i].color === product.color) {
          }
          else {
            lproducts.push(localProducts[i]);
          }
        }
        localStorage.setItem("products", JSON.stringify(lproducts));
      }
    }
  }


  function calculateTotal() {

    if(cartproducts.length === 0)
      setcartEmpty(true);
    else
      setcartEmpty(false);

    let total = 0;
    for (let i = 0; i < cartproducts.length; i++) {
      total += cartproducts[i].price * cartproducts[i].quantity;
    }
    setTotalPrice(total);
  }

  if (cartemtpy) {
    return (
      <div><h1>Cart Is Empty</h1></div>
    )
  }

  else {
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
                              <input type="number" min="1" onChange={(e) => { handleQauntity(e, product.id); }} className="form-control input-number text-center" value={product.quantity} />
                            </div>
                          </div>
                          <div className="one-eight text-center">
                            <div className="display-tc">
                              <span className="price">{(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="one-eight text-center">
                            <div className="display-tc">
                              <button onClick={(e) => { removeProduct(e, product.id) }} className="closed"></button>
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
                          <div className="grand-total">
                            <p><span><strong>Total:</strong></span> <span>{totalprice.toFixed(2)}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
      <button className='btn-primary' onClick={(e)=>{handleDump(e);}} className='btn btn-primary'>Proceed to Checkout</button>
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
}
export default Cart;