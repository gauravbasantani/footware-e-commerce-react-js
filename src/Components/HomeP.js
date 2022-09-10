import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import imgg1 from '../images/item-1.jpg';
// import imgg2 from '../images/item-2.jpg';
// import imgg3 from '../images/item-3.jpg';
// import imgg4 from '../images/item-4.jpg';
// import imgg5 from '../images/item-5.jpg';
// import imgg6 from '../images/item-6.jpg';
// import imgg7 from '../images/item-7.jpg';
// import imgg8 from '../images/item-8.jpg';
// import imgg9 from '../images/item-9.jpg';
// import imgg10 from '../images/item-10.jpg';
// import imgg11 from '../images/item-11.jpg';
// import imgg12 from '../images/item-12.jpg';
// import imgg13 from '../images/item-13.jpg';
// import imgg14 from '../images/item-14.jpg';
// import imgg15 from '../images/item-15.jpg';
// import imgg16 from '../images/item-16.jpg';

const HomeP = (props) => {
	const [data, setData] = useState([]

	)

	useEffect(() => {
		axios.post("https://react-ecomm-mern.herokuapp.com/productcategory/list", { data: { pcid: "" } }).then((res) => {
			setData(res.data.data);
		})
	}, [])

	return (
		<div>



			<div className="colorlib-product">
				<div className="container" >
					<div className="row m-2 mb-2 py-2" >
						<div className="mx-auto offset-sm-2 text-center colorlib-heading">
							<h2>{props.title}</h2>
						</div>


						{
							data.map((e) => {

								return (
									<div className="col-lg-6 py-2 text-center" >
										<div className="product-entry border " >
											<Link to={"/products/"+e._id} href=""  className="prod-img">
												<img src={"https://react-ecomm-mern.herokuapp.com/" + e.imagepath} className="img-fluid" alt="Free html5 bootstrap 4 template" />
											</Link>
											<div className="desc">
												<h2><a href="">{e.name}</a></h2>

											</div>
										</div>
									</div>
								)

							})
						}


					</div>
				</div>

			</div>
		</div>

	)
}

export default HomeP