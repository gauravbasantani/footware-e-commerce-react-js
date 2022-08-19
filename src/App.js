import logo from './logo.svg';
import './App.css';
import './css/animate.css';
import './css/bootstrap-datepicker.css';
// import './css/bootstrap.min.css';
import './css/flexslider.css';
import './css/icomoon.css';
import './css/ionicons.min.css';
import './css/style.css';

import Header from './Components/Header';

import Footer from './Components/Footer';
// import Men from './Components/Men';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import About from './Components/About';
// import Women from './Components/Women';
import Home from './Components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import Administrator from './Components/Administrator';
import Dashboard from './Components/Dashboard';
import Categories from './Components/Categories';
import Products from './Components/Products';
import Orders from './Components/Orders';
import Category from './Components/Category';
import Product from './Components/Product';
import UserLogin from './Components/UserLogin';
import Variety from './Components/Variety';
import Register from './Components/Register';
// import Cat from './Components/Cat';
import UProducts from './Components/UProducts';
import SingleProduct from './Components/SingleProduct';
import CheckOut from './Components/CheckOut';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='products/:categoryid' element={<UProducts/>}/>
      <Route path='product/:productid' element={<SingleProduct/>}/>
      {/* <Route path='women' element={<Women/>}/> */}
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='checkout' element={<CheckOut/>}/>

      
      <Route path='login' element={<Login/>}/> 
      <Route path='administrator/' element={<Administrator/>}>
        <Route path='/administrator/dashboard' element={<Dashboard/>}/>
        <Route path='/administrator/categories' element={<Categories/>}/>
        <Route path='/administrator/products' element={<Products/>}/>
        <Route path='/administrator/orders' element={<Orders/>}/>
        <Route path='/administrator/category' element={<Category/>}/>
        <Route path='/administrator/category/:id' element={<Category/>}/>
        <Route path='/administrator/product' element={<Product/>}/>
        <Route path='/administrator/product/:id' element={<Product/>}/>
        <Route path='/administrator/product/varieties/:id' element={<Variety/>}/>
       </Route>     
       <Route path='userlogin' element={<UserLogin/>}/>
       <Route path='register' element={<Register/>}/>
    </Routes>
    

    
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
