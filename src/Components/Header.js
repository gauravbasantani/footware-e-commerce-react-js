import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";

const Header = () => {

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  let cartquantity = useSelector(state=>state.quantity);
  if(localStorage.getItem("products") != null)
    cartquantity = JSON.parse(localStorage.getItem("products")).length;

  //dispatch(actions.setQuantity(cartquantity));

	
	let [categories, setCategories] = useState([]);

	function load(){
	  axios.post("http://localhost:8081/productcategory/list").then((res)=>{
		setCategories(res.data.data);
	  })
	}  
	
	useEffect(()=>{
	  load();
	},)

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
									<li><NavLink style={navStyle} className='nav-bar-link' to="/">Home</NavLink></li>
									{
										categories.map((category)=>{
										return(
												<>
													<li><NavLink style={navStyle} className='nav-bar-link' to={"/products/" + category._id }>{ category.name }</NavLink></li>
												</>
										)})
									}
									<li><NavLink style={navStyle} className='nav-bar-link' to="/about">About</NavLink></li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/contact">Contact</NavLink></li>
									<li><NavLink style={navStyle} className='nav-bar-link' to="/administrator">Administrator</NavLink></li>

									
									<li className='cart'><NavLink className='cart nav-bar-link' style={navStyle}  to="/userlogin">Login</NavLink></li>
									<li className="cart"><NavLink style={navStyle} className='nav-bar-link' to="/Cart"><i className="icon-shopping-cart"></i> Cart [{ cartquantity }]</NavLink></li>
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