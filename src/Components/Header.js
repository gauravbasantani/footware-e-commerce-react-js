import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Header = () => {
	const navStyle = ({isActive}) =>{
		return{
			color : isActive ? '#88c8bc' : '',
			position : isActive ? 'relative' : '',
		}
	}

	let path = useLocation();	  

	if(path.pathname !== "/login"){
  		return (
		<div>
			<nav className="colorlib-nav" role="navigation">
				<div className="top-menu">
					<div className="container">
						<div className="row">
							<div className="col-sm-7 col-md-9">
								<div id="colorlib-logo"><a href="index.html">Footwear</a></div>
							</div>
							<div className="col-sm-5 col-md-3">
							<form action="#" className="search-wrap">
							<div className="form-group">
								<input type="search" className="form-control search" placeholder="Search"/>
								<button className="btn btn-primary submit-search text-center" type="submit"><i className="icon-search"></i></button>
							</div>
							</form>
						</div>
					</div>
						<div className="row">
							<div className="col-sm-12 text-left menu-1">
								<ul>
									<li ><NavLink style={navStyle} className='nav-bar-link' to="/">Home</NavLink></li>
									<li className="has-dropdown">
										<NavLink className='nav-bar-link' style={navStyle} to="/men">Men</NavLink>
										<ul className="dropdown">
											<li><NavLink style={navStyle} className='nav-bar-link' to="/">Product Detail</NavLink></li>
											<li><NavLink style={navStyle} className='nav-bar-link' to="/">Shopping Cart</NavLink></li>
											<li><NavLink style={navStyle} className='nav-bar-link' to="/">Checkout</NavLink></li>
											<li><NavLink style={navStyle} className='nav-bar-link' to="/">Order Complete</NavLink></li>
											<li><NavLink style={navStyle} className='nav-bar-link' to="/">Wishlist</NavLink></li>
										</ul>
									</li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/women">Women</NavLink></li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/about">About</NavLink></li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/contact">Contact</NavLink></li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/administrator">Administrator</NavLink></li>

									
									<li className='cart'><NavLink className='cart nav-bar-link' style={navStyle}  to="/userlogin">Login</NavLink></li>
									<li className="cart"><NavLink style={navStyle} className='nav-bar-link' to="/Cart"><i className="icon-shopping-cart"></i> Cart [0]</NavLink></li>
								</ul>

							</div>
						</div>
					</div>
				</div>
				<div className="sale">
					<div className="container">
						<div className="row">
							<div className="col-sm-8 offset-sm-2 text-center">
								<div className="row">
									<div className="owl-carousel2">
										
										<div className="item">
											<div className="col">
												<h3><a href="#">Our biggest sale yet 50% off all summer shoes</a></h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
		)
	}
	else{
		return(
			<div></div>
		)
	}
}

export default Header