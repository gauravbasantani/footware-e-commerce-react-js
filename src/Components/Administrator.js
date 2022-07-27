import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Administrator = () => {
    const navStyle = ({isActive}) =>{
		return{
			color : isActive ? '#88c8bc' : '',
			position : isActive ? 'relative' : '',
      
		}
	}
  return (
    <div>
        <div className="container-fluid">

        <div className="row my-3 ">
            <div className="col-lg-2 py-2" >
            <li><NavLink style={navStyle} className='nav-bar-link ' to="/administrator/dashboard">Dashboard</NavLink></li>
			<li><NavLink style={navStyle} className='nav-bar-link' to="/administrator/categories">Categories</NavLink></li>
			<li><NavLink style={navStyle} className='nav-bar-link' to="/administrator/products">Products</NavLink></li>
		    <li className="cart"><NavLink style={navStyle} className='nav-bar-link' to="/administrator/orders"> Orders</NavLink></li>
            </div>
            <div className="col-lg-10">
             <Outlet/>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Administrator