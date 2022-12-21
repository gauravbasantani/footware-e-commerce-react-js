import React, { useEffect, useState } from 'react';
import Sale from './Sale';
import imgc from '../images/cover-img-1.jpg';
import imgp1 from '../images/men.jpg'
import imgp2 from '../images/women.jpg';
import imgp3 from '../images/item-11.jpg';
import HomeP from '../Components/HomeP';
import Part1 from '../images/brand-1.jpg'
import Part2 from '../images/brand-2.jpg'
import Part3 from '../images/brand-3.jpg'
import Part4 from '../images/brand-4.jpg'
import Part5 from '../images/brand-5.jpg'
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const UProducts = () => {

  let categoryid = useParams().categoryid;
  const [category, setCategory] = useState({});
  let [products, setProducts] = useState([]);

  function load() {
    axios.post("https://node-gaurav-ecommerce.onrender.com/product/list", { data: { pcid: categoryid } }).then((res) => {
      setProducts(res.data.data);
    })
  }

  useEffect(() => {
    if (categoryid !== null) {
      axios.post('https://node-gaurav-ecommerce.onrender.com/productcategory/get', { data: { id: categoryid } })
        .then((response) => {
          setCategory(response.data.data);
        });

      load();
    }
  }, [categoryid]);
  if(category != null){
  return (
    <div>
      {/* <Sale/> */}
     
        <div className="container">
          
                <h2 className='text-center mt-4'>{category.name}</h2>
              
        </div>
     
      <div className="container ">
        <div className="row mx-auto mt-2">
          {
            products.map((e) => {
              return (
                <>
                  {/* <div className="col-lg-6 py-2 text-center">
                <div className="product-entry border">
                  <Link to='' href="" className="prod-img">
                    <img src={"https://node-gaurav-ecommerce.onrender.com/" + e.imagepath} className="img-fluid" alt="Free html5 bootstrap 4 template" />
                  </Link>
                  <div className="desc">
                    <h2><a href="">{e.name}</a></h2>

                  </div>
                </div>
              </div> */}
                  {/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{e.name}</h5>
    <p class="card-text">{e.price}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
                  
                    <div className='col-lg-4'>
                      <Card className='m-2 py-2 img-fluid' style={{ width: '18rem',  }}>
                        <Card.Img variant="top" style={{height:'250px'}} src={"https://node-gaurav-ecommerce.onrender.com/" + e.imagepath} />
                        <Card.Body>
                          <Card.Title>{e.name}</Card.Title>
                          <Card.Text>
                            {e.description}
                          </Card.Text>
                          <Card.Text>
                           &#8377; {e.price}
                          </Card.Text>
                          <Link className='btn btn-secondary' variant="primary" to={"/product/"+e._id }>View More</Link>
                        </Card.Body>
                      </Card>
                    </div>
                
                </>
              )
            })
          }
        </div>
        </div>
    </div>
  )
        }
        else{
          return(
            <div>Loading...</div>
          )
        }
}

export default UProducts