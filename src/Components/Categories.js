import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink,Link } from 'react-router-dom';

const Categories = () => {
  let [datas, setData] = useState([]);

  function load(){
    axios.post("http://localhost:8081/productcategory/list").then((res)=>{
      setData(res.data.data);
    })
  }

  
  useEffect(()=>{
    load();
  },[])
  const navStyle = ({isActive}) =>{
		return{
			color : isActive ? '#88c8bc' : '',
			position : isActive ? 'relative' : '',
		}
	}

  function deletecategory(e, id){
    e.preventDefault();
    axios.post("http://localhost:8081/productcategory/delete", {data:{id:id}}).then((res)=>{
      load();
    })
  }
  return (
    <div className='container'>
      <div className='breadcrumbs'>
        <p className='bread'>
          <span> <NavLink style={navStyle}  to="/administrator"> Administrator </NavLink></span>/
          <span>Categories</span> 
          </p>
      </div>
      <h1>Categories</h1>
      <div className='text-right'>
      <Link to="/administrator/category" className='btn btn-primary'>Add Category</Link>
      </div>
      <table className='table table-bordered table-stripped'>
        <tr>
          <th>Action</th>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
        {
          datas.map((data)=>{
            return(
              <>
              <tr>
                <td>
                  <Link className="btn btn-primary " to={"/administrator/category/" + data._id }>Edit</Link>
                  <button className="btn btn-danger" onClick={(e)=>deletecategory(e, data._id)} >Delete</button>
                </td>
                <td>{data.srno}</td>             
                <td>{data.name}</td>
                <td><img src={ "http://localhost:8081/" + data.imagepath} style={{height:'70px'}} /></td>
              </tr>
              </>
            )
          })
        }
      </table>
    </div>
  )
}

export default Categories