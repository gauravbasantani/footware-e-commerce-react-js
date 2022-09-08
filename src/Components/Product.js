import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom'

const Product = () => {
    const [data, setData] = useState({
        id: '',
        pcid: '',
        name: '',
        description: '',
        specification: '',
        mrp: 0,
        price: 0,
        varieties: [],
        instock: 'Yes',
        isactive: 'Yes',
        image: '',
        
    });
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        // alert(id)
        if(id !== null)
        {
          axios.post('https://react-ecomm-mern.herokuapp.com/product/get/', {data:{id:id}})
            .then((response) => {
              const newData = {...data};
              newData["id"] = response.data.data._id;
              newData["pcid"] = response.data.data.pcid;
              newData["name"] = response.data.data.name;
              newData["description"] = response.data.data.description;
              newData["specification"] = response.data.data.specification;
              newData["mrp"] = response.data.data.mrp;
              newData["price"] = response.data.data.price;
              newData["varieties"] = response.data.data.varieties;
              newData["instock"] = response.data.data.instock;
              newData["isactive"] = response.data.data.isactive;
              setData(newData);
              console.log(response.data.data);
            })
        }
      }, []);

    let [categories, setCategories] = useState([]);

    useEffect(()=>{
      axios.post("https://react-ecomm-mern.herokuapp.com/productcategory/list").then((res)=>{
        setCategories(res.data.data);
      })
    }, [])

    function handle(e){
        if(e.target.id === "image"){
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{
              if(reader.result != null)
              {
                const newData = {...data};
                newData[e.target.id] = reader.result.toString();
                setData(newData);
              }
            }
        }
        else{
            const newData = {...data};
            newData[e.target.id] = e.target.value;
            setData(newData);
        }
    }
    function submit(e){
        e.preventDefault();
        axios.post("https://react-ecomm-mern.herokuapp.com/product/save",{data:data}).then(res=>{
            navigate('/administrator/products');
        })
    }
    // function submit(e){
    //     e.preventDefault();
    //     console.log(data);
    //     axios.post("https://react-ecomm-mern.herokuapp.com/product/save",{data:data}).then(res=>{
    //         console.log(res.data);
    //         //navigate('/administrator/products');
    //     })
    // }
    return (
        <div>
            <div className='breadcrumbs'>
                <p className='bread'>
                    <span> <NavLink to=""> Administrator </NavLink></span>/
                    <span><NavLink to="/administrator/products"> Products </NavLink></span> /<span>Product</span>
                </p>

            </div>
            <h1 className='text-center my-3 display-4'>Product</h1>
            <hr className='w-25 mx-auto' />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className="form-group my-4">
                            <label for="name">Product Name</label>
                            <input type="text" className="form-control"  onChange={(e)=>handle(e)}  value={data.name} id="name" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                            <label for="pcid">Category</label>
                            <select className='form-control' onChange={(e)=>handle(e)}  value={data.pcid} id="pcid">
                                <option value="">Category</option>
                            {
                                categories.map((category)=>{
                                    return(
                                        <option value={ category._id }>{ category.name }</option>
                                    )})
                            }
                            </select>                            
                            <div className="form-group my-3">
                                <label for="image">Image</label>
                                <input type="file" accept="image/*"  onChange={(e)=>handle(e)}  className="form-control" id="image" />
                            </div>
                        </div>
                        <div className="form-group my-4">
                            <label for="description">Description</label>
                            <input className="form-control" type="text"  onChange={(e)=>handle(e)}  value={data.description} id="description" />
                        </div>
                        <div className="form-group my-4">
                            <label for="specification">Specification</label>
                            <input className="form-control" type="text"  onChange={(e)=>handle(e)}  value={data.specification} id="specification" />
                        </div>
                        <div className="form-group my-4">
                            <label for="mrp">MRP</label>
                            <input className="form-control" type="number"  onChange={(e)=>handle(e)}  value={data.mrp} id="mrp" />
                        </div>
                        <div className="form-group my-4">
                            <label for="price">Price</label>
                            <input className="form-control" type="number"  onChange={(e)=>handle(e)}  value={data.price} id="price" />
                        </div>
                        <Link to="" onClick={(e)=>submit(e)} className="btn btn-primary">Save</Link>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Product