import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// atlas password : Gaurav123
import React, { useEffect, useState } from 'react'
import { NavLink, Route, Router, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";


const Header = () => {
	let [showmenu, setShowMenu] = useState(false);
	let username = "";
	if(localStorage.getItem("name") !== null)
		username = localStorage.getItem("name");
	let adminLoggedIn = false;
	if(localStorage.getItem('usertype') != null){
		if(localStorage.getItem('usertype') === 'admin')
			adminLoggedIn = true;
	}

	let userLoggedIn = false;
	if(localStorage.getItem('usertype') != null){
		if(localStorage.getItem('usertype') === 'user'){
			userLoggedIn = true;			
		}
	}

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  let cartquantity = useSelector(state=>state.quantity);
  if(localStorage.getItem("products") != null)
    cartquantity = JSON.parse(localStorage.getItem("products")).length;

  //dispatch(actions.setQuantity(cartquantity));

	
	let [categories, setCategories] = useState([]);

	
	useEffect(()=>{
	    axios.post("https://react-ecomm-mern.herokuapp.com/productcategory/list").then((res)=>{
		setCategories(res.data.data);
	  })
	},[]);

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
                    <div id="colorlib-logo">
                      <a to="/">Gaurav-Commerce</a>
                    </div>
                    <button
                      onClick={(e)=>{ setShowMenu(!showmenu); }}
                      className="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"
                    >
                      <i></i>
                    </button>
                  </div>
				  {showmenu === true &&
                  <div className="col-sm-12">
                    <div id="demomenu">
                      <ul className="nav flex-column">
					  <li onClick={(e)=>{ setShowMenu(!showmenu); }}>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                      {categories.map((category) => {
                        return (
                          <>
                            <li>
                              <NavLink
                                style={navStyle}
                                className="nav-bar-link"
                                to={"/products/" + category._id}
                              >
                                {category.name}
                              </NavLink>
                            </li>
                          </>
                        );
                      })}
                      <li>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/about"
                        >
                          About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/contact"
                        >
                          Contact
                        </NavLink>
                      </li>
                      {adminLoggedIn ? (
                        <li>
                          <NavLink
                            style={navStyle}
                            className="nav-bar-link"
                            to="/administrator"
                          >
                            Administrator
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {userLoggedIn ? (
                        <li className="cart">
                          <NavLink
                            className="cart nav-bar-link text-right"
                            style={navStyle}
                            to="/userlogin"
                          >
                            Hello {username}
                          </NavLink>
                        </li>
                      ) : (
                        <li className="cart">
                          <NavLink
                            className="cart nav-bar-link"
                            style={navStyle}
                            to="/userlogin"
                          >
                            Login
                          </NavLink>
                        </li>
                      )}

                      <li className="cart">
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link text-right"
                          to="/cart"
                        >
                          <i className="icon-shopping-cart"></i> Cart [
                          {cartquantity}]
                        </NavLink>
                      </li>
                      </ul>
                    </div>
                  </div>
					}
                  <div className="col-sm-5 col-md-3">
                    <form action="#" className="search-wrap">
                      <div className="form-group">
                        <input
                          type="search"
                          className="form-control search"
                          placeholder="Search"
                        />
                        <button
                          className="btn btn-primary submit-search text-center"
                          type="submit"
                        >
                          <i className="icon-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-left menu-1">
                    <ul>
                      {/* <Navbar bg="light" expand="lg">
									<Container>
									<Navbar.Toggle aria-controls="basic-navbar-nav" />
										<Navbar.Collapse id="basic-navbar-nav">
										<Nav className="me-auto">
										<li><NavLink style={navStyle} className='nav-bar-link' to="/home">Home</NavLink></li>
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
										{

adminLoggedIn ? <li><NavLink style={navStyle} className='nav-bar-link' to="/administrator">Administrator</NavLink></li> : ''
}										

{
   userLoggedIn ? <li className='cart'><NavLink className='cart nav-bar-link' style={navStyle} to="/userlogin">Hello { username }</NavLink></li> : <li className='cart'><NavLink className='cart nav-bar-link' style={navStyle}  to="/userlogin">Login</NavLink></li>
}									<li className="cart"><NavLink style={navStyle} className='nav-bar-link' to="/cart"><i className="icon-shopping-cart"></i> Cart [{ cartquantity }]</NavLink></li>

										</Nav>
										</Navbar.Collapse>
									</Container>
								</Navbar> */}
                      {/* <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
								 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
       <Nav className="mr-auto"> */}
                      <li>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                      {categories.map((category) => {
                        return (
                          <>
                            <li>
                              <NavLink
                                style={navStyle}
                                className="nav-bar-link"
                                to={"/products/" + category._id}
                              >
                                {category.name}
                              </NavLink>
                            </li>
                          </>
                        );
                      })}
                      <li>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/about"
                        >
                          About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link"
                          to="/contact"
                        >
                          Contact
                        </NavLink>
                      </li>
                      {adminLoggedIn ? (
                        <li>
                          <NavLink
                            style={navStyle}
                            className="nav-bar-link"
                            to="/administrator"
                          >
                            Administrator
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {userLoggedIn ? (
                        <li className="cart">
                          <NavLink
                            className="cart nav-bar-link text-right"
                            style={navStyle}
                            to="/userlogin"
                          >
                            Hello {username}
                          </NavLink>
                        </li>
                      ) : (
                        <li className="cart">
                          <NavLink
                            className="cart nav-bar-link"
                            style={navStyle}
                            to="/userlogin"
                          >
                            Login
                          </NavLink>
                        </li>
                      )}

                      <li className="cart">
                        <NavLink
                          style={navStyle}
                          className="nav-bar-link text-right"
                          to="/cart"
                        >
                          <i className="icon-shopping-cart"></i> Cart [
                          {cartquantity}]
                        </NavLink>
                      </li>
                      {/* </Nav>
      </Navbar.Collapse>
									</Navbar>
														 */}
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
                            <h3>
                              <a to="#">
                                Our biggest sale yet 50% off all summer shoes
                              </a>
                            </h3>
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
      );
	}
	else{
		return(
			<div></div>
		)
	}
}

export default Header