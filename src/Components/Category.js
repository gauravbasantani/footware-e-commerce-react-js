// import { Button } from 'bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Category = () => {

    const navigate = useNavigate();    

    const [data, setData] = useState({
        id:'',
        name:'',
        srno:'',
        image: '',        
    })   

    let { id } = useParams();

    useEffect(()=>{
        if(id !== null)
        {
          axios.post('http://localhost:8081/productcategory/get/', {data:{id:id}})
            .then((response) => {
              const newData = {...data};
              newData["id"] = response.data.data._id;
              newData["name"] = response.data.data.name;
              newData["srno"] = response.data.data.srno;
              setData(newData);
            })
        }
      }, []);

    

    function handle (e){        
        //let newData = {...data};
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
        axios.post("http://localhost:8081/productcategory/save",{data:{
            id: data.id === null ? "" : data.id,
            name: data.name,
            image : data.image,
            srno: data.srno
        }}).then(res=>{
            navigate('/administrator/categories');
        })
    }
    return (
        <div>
            <div className='breadcrumbs'>
                <p className='bread'>
                    <span> <NavLink to=""> Administrator </NavLink></span>/
                    <span><NavLink to=""> Categories </NavLink></span> /<span>category</span>
                </p>
            </div>
            <h1 className='text-center my-3 display-4'>Category</h1>
            <hr className='w-25 mx-auto' />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className="form-group my-4">
                            <label for="name">Product Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e)=>handle(e)} id="name" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                            <form>
                                <div className="form-group my-3">
                                    <label for="image">Image</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={(e)=>handle(e)} id="image" />
                                </div>
                            </form>
                        </div>
                        <div className="form-group my-4">
                            <label for="srno">Sr No</label>
                            <input className="form-control" type="number" min="1" value={data.srno} id="srno" onChange={(e)=>handle(e)} />
                        </div>
                        <Link to="" onClick={(e)=>submit(e)} className="btn btn-primary">Save</Link>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Category;