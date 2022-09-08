import React from 'react'

const SuccesOrder = () => {
//localStorage.setItem("products",null);
localStorage.removeItem("products");
localStorage.removeItem("cartproducts");
  return (
    <div className='h1'>
      Order Successfull
    </div>
  )
}

export default SuccesOrder
