import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink,Link,  } from 'react-router-dom';

const Categories = () => {
  let [datas, setData] = useState([]);

  function load(){
    axios.post("https://react-ecomm-mern.herokuapp.com/product/list", {data:{pcid:""}}).then((res)=>{
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

  function deleteproduct(e, id){
    e.preventDefault();
    axios.post("https://react-ecomm-mern.herokuapp.com/product/delete", {data:{id:id}}).then((res)=>{
      load();
    })
  }

  return (
    <div className='container'>
      <div className='breadcrumbs'>
        <p className='bread'>
          <span> <NavLink style={navStyle}  to="/administrator"> Administrator </NavLink></span>/
          <span>Products</span> 
          </p>
      </div>
      <h1>Products</h1>
      <div className='text-right'>
      <Link to="/administrator/product" className='btn btn-primary'>Add Product</Link>
      </div>
      <table className='table table-bordered table-stripped'>
        <tr>
          <th>Action</th>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Varieties</th>
        </tr>
        {
          datas.map((data)=>{
            return(
              <>
              <tr>
                <td>
                <Link className="btn btn-primary " to={"/administrator/product/" + data._id }>Edit</Link>
                  <button className="btn btn-danger" onClick={(e)=>deleteproduct(e, data._id)} >Delete</button>
                </td>
                <td>{data._id}</td>             
                <td>{data.name}</td>
                <td><img src={ "https://react-ecomm-mern.herokuapp.com/" +data.imagepath} style={{ height:'80px' }} /></td>
                <td>
                  <Link className='btn btn-warning' to={"/administrator/product/varieties/" + data._id }>{data.varieties.length}</Link>
                </td>
                {/* <td><img src={ "https://react-ecomm-mern.herokuapp.com/" + data.imagepath} style={{height:'70px'}} /></td> */}
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