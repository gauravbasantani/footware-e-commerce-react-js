import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';


const SingleProduct = () => {
    let { productid } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios.post("http://localhost:8081/product/get", { data: { id: productid } }).then((res) => {
            setProduct(res.data.data);
        })
    }, [productid]);
    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4"> <img id="main-image" src={"http://localhost:8081/" + product.imagepath} width="250" /> </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-4">
                                        <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">Orianz</span>
                                            <h5 className="text-uppercase">{product.description}</h5>
                                            <div className="price d-flex flex-row align-items-center"> <span className="act-price">{product.price}</span>
                                                <div className="ml-2"> <small className="dis-price">{product.mrp}</small>  </div>
                                            </div>
                                        </div>
                                        <p className="about">{product.specification}</p>
                                        <div className="sizes mt-5">
                                            <h6 className="text-uppercase">Size</h6> {product.size}
                                        </div>
                                        <div className="sizes mt-5">
                                            <h6 className="text-uppercase">Color</h6> {product.color}
                                        </div>
                                        <div className="cart mt-4 align-items-center"> <button className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
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

export default SingleProduct
