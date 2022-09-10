import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleProduct = () => {
    const dispatch = useDispatch();
    const actions = bindActionCreators(actionCreators, dispatch);

    let { productid } = useParams();
    const [product, setProduct] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [price, setPrice] = useState(0);
    const [mrp, setMRP] = useState(0);

    const [cartproduct, setCartProduct] = useState({
        productid:productid,
        color:"",
        size:"",
        quantity:1
    });

    function handleColorSize(e, prop){
        const newData = {...cartproduct};
        newData[prop] = e.target.value;
        setCartProduct(newData);
    }

    function addToCart(e){
        e.preventDefault();
        if(product.varieties.length != 0){
            if(cartproduct.color === ""){
                toast.error('Please Select Color', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if(cartproduct.size === ""){
                toast.error('Please Select Size', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else{
                addproducttocart(e);
            }
        }
        else{
            addproducttocart(e);
        }
    }

    function addproducttocart(e){
        e.preventDefault();
        let products = new Array();
        if(localStorage.getItem("products") != null)
            products= JSON.parse(localStorage.getItem("products"));
        
        let added = false;
        for(let i = 0; i < products.length; i++){
            let product = products[i];
            if(product.productid === cartproduct.productid && product.color === cartproduct.color && product.size === cartproduct.size){
                    products[i]["quantity"] = parseInt(cartproduct["quantity"]);
                    added = true;
            }
        }
        if(!added){
            toast.success('Product added to Cart', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            products.push(cartproduct);
            
            //dispatch(actions.addQuantity(1));
        }
        else{
            toast.warning('Product already added to Cart', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        localStorage.setItem("products", JSON.stringify(products));
    }
    function setIncCount(e){
        
        const newData = {...cartproduct};
        newData["quantity"] = parseInt(newData["quantity"]) + 1;
         setCartProduct(newData);

    }
    function setDecCount(e){
        if(cartproduct.quantity >1){
            const newData = {...cartproduct};
            newData["quantity"] = parseInt(newData["quantity"]) - 1;
            setCartProduct(newData);
        }
         
    }

    

    useEffect(() => {
        axios.post("https://react-ecomm-mern.herokuapp.com/product/get", { data: { id: productid } }).then((res) => {
            setProduct(res.data.data);
            setPrice(res.data.data.price);
            setMRP(res.data.data.mrp);

            let tempcolors = [];
            let tempsizes = [];
            res.data.data.varieties.map((variety)=>{
                if(tempcolors.indexOf(variety.color) == -1){
                    tempcolors.push(variety.color);
                }
                if(tempsizes.indexOf(variety.size) == -1){
                    tempsizes.push(variety.size);
                }
            })
            setColors(tempcolors);
            setSizes(tempsizes);

        })
    }, [productid]);
    
    if(product != null){
    return (
        <div>
            <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4"> <img id="main-image" src={"https://react-ecomm-mern.herokuapp.com/" + product.imagepath} width="250" /> </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-4">
                                        <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">Orianz</span>
                                            <h5 className="text-uppercase">{product.description}</h5>
                                            <div className="price d-flex flex-row align-items-center"> <span className="act-price">{price.toFixed(2)}</span>
                                                <div className="ml-2"> <small className="dis-price"><del>{mrp.toFixed(2)}</del></small>  </div>
                                            </div>
                                        </div>
                                        <p className="about">{product.specification}</p>
                                        <div className="sizes mt-3">
                                            <h6 className="text-uppercase mt-2">Size  </h6>
                                            {
                                                sizes.map((size) => {
                                                    return (
                                                        <>
                                                          
                                                           <label style={{border:"2px solid black"}} className='btn'><input type="radio" name="size" value={ size } onChange={(e)=>handleColorSize(e, 'size')}  />{ size }</label>
                                                           <ToastContainer />
                                                        </>
                                                    )
                                                })}
                                        </div>
                                        <div className="sizes">
                                            <h6 className="text-uppercase mt-2">Color </h6> 
                                            {
                                                colors.map((color) => {
                                                    return (
                                                        <>
                                                           <label className='btn' style={{ backgroundColor: color,width:"70px" }}><input  type="radio" name="color"  value={ color } onChange={(e)=>handleColorSize(e, 'color')} /></label>
                                                           <ToastContainer />
                                                        </>
                                                    )
                                                })}
                                        </div>

                                        <div className='mt-2'>
                                            <Button className='mr-2' onClick={(e)=>setDecCount(e)} >-</Button>
                                            <input style={{width:"40px",textAlign:"center"}} type='number' min="1" value={cartproduct.quantity} />                                            <Button className='ml-2' onClick={(e)=>setIncCount(e)} >+</Button>
                                        </div>
                                        <div className="cart mt-4 align-items-center"> <button onClick={(e)=>{ addToCart(e) }} className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
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
    else{
        return(
            <div>Loading</div>
        )
    }

}

export default SingleProduct
