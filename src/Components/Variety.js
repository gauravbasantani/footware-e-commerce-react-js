import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

const Variety = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [productname, setProductName] = useState("");
    const [varieties, setVarieties] = useState([]);
    const [variety, setVariety] = useState({
        color: '',
        size: '',
        mrp: 0,
        price: 0,
    })

    useEffect(() => {
        load();
    }, [])

    function load() {
        setVariety({
            color: '',
            size: '',
            mrp: 0,
            price: 0,

        });
        axios.post("https://react-ecomm-mern.herokuapp.com/product/get", { data: { id: id } }).then((res) => {
            setVarieties(res.data.data.varieties);
            setProductName(res.data.data.name);
            console.log(varieties);
        })
    }


    function deleteProductVariety(e, dvariety) {
        e.preventDefault();
        if(window.confirm("Sure to delete?")){
            axios.post("https://react-ecomm-mern.herokuapp.com/product/deletevariety", { data: { id: id, variety: dvariety } }).then((res) => {
                load();
            })
        }
    }

    function saveVariety(e) {
        e.preventDefault();
        axios.post("https://react-ecomm-mern.herokuapp.com/product/savevariety", { data: { id: id, variety: variety } }).then((res) => {
            load();
        });
    }


    function handle(e) {
        const newData = { ...variety };
        newData[e.target.id] = e.target.value;
        setVariety(newData);
    }

    return (
        <div>
            <div className='breadcrumbs'>
                <p className='bread'>
                    <span> <NavLink to=""> Administrator </NavLink></span>/
                    <span><NavLink to="/administrator/products"> Products </NavLink></span> /<span>Variety </span>
                </p>
                <h1 className='text-center my-3 display-4'>Product : {productname}</h1>
            </div>
            <div className='container'>
                <div className='row'>

                    <div className='col-lg-8'>
                        <label for="color" className='pb-2'>Color</label>
                        <input type="color" className="form m-2 py-2" value={variety.color} id="color" onChange={(e) => handle(e)} /><br></br>
                        {/* </div> */}
                        <label for="size">Size</label>
                        <input type="text" className="form-control" value={variety.size} id="size" onChange={(e) => handle(e)} />
                        <label for="mrp">MRP</label>
                        <input type="number" className="form-control" value={variety.mrp} id="mrp" onChange={(e) => handle(e)} />
                        <label for="price">Price</label>
                        <input type="number" className="form-control" value={variety.price} id="price" onChange={(e) => handle(e)} />
                        <Link to="" onClick={(e) => saveVariety(e)} className="btn btn-primary py-2">Save</Link>
                    </div>
                </div>
            </div>

            <div className='container'>
                <table className='table table-bordered table-stripped'>
                    <tr>
                        <th>Action</th>
                        <th>Colour</th>
                        <th>Size</th>
                        <th>Mrp</th>
                        <th>Price</th>
                    </tr>
                    {
                        varieties.map((data) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                        <button className="btn btn-danger" onClick={(e)=>deleteProductVariety(e, data)} >Delete</button>
                                        </td>
                                        <td style={{ backgroundColor:data.color}}>{data.color}</td>
                                        <td>{data.size}</td>
                                        <td>{ parseFloat(data.mrp).toFixed(2) }</td>
                                        <td>{ parseFloat(data.price).toFixed(2) }</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default Variety