import React from 'react';
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



const Men = () => {
  return (
    <div>
	{/* <Sale/> */}
      <div className="breadcrumbs-two">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="breadcrumbs-img" style={{backgroundImage: `url(${imgc})`}}>
							<h2>Men's</h2>
						</div>
						<div className="menu text-center">
							<p><a href="#">New Arrivals</a> <a href="#">Best Sellers</a> <a href="#">Extended Widths</a> <a href="#">Sale</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
      <div className="colorlib-featured">
			<div className="container">
				<div className="row">
					<div className="col-sm-4 text-center">
						<div className="featured">
							<div className="featured-img featured-img-2" style={{backgroundImage: `url(${imgp1})`}}>
								<h2>Casuals</h2>
								<p><a href="#" className="btn btn-primary btn-lg">Shop now</a></p>
							</div>
						</div>
					</div>
					<div className="col-sm-4 text-center">
						<div className="featured">
							<div className="featured-img featured-img-2" style={{backgroundImage: `url(${imgp2})`}}>
								<h2>Dress</h2>
								<p><a href="#" className="btn btn-primary btn-lg">Shop now</a></p>
							</div>
						</div>
					</div>
					<div className="col-sm-4 text-center">
						<div className="featured">
							<div className="featured-img featured-img-2" style={{backgroundImage: `url(${imgp3})`}}>
								<h2>Sports</h2>
								<p><a href="#" className="btn btn-primary btn-lg">Shop now</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <HomeP title='View All Products' />
	<div className="colorlib-partner">
			<div className="container">
				<div className="row">
					<div className="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
						<h2>Trusted Partners</h2>
					</div>
				</div>
				<div className="row">
					<div className="col partner-col text-center">
						<img src={Part1} className="img-fluid" alt="Free html4 bootstrap 4 template"/>
					</div>
					<div className="col partner-col text-center">
						<img src={Part2} className="img-fluid" alt="Free html4 bootstrap 4 template"/>
					</div>
					<div className="col partner-col text-center">
						<img src={Part3} className="img-fluid" alt="Free html4 bootstrap 4 template"/>
					</div>
					<div className="col partner-col text-center">
						<img src={Part4} className="img-fluid" alt="Free html4 bootstrap 4 template"/>
					</div>
					<div className="col partner-col text-center">
						<img src={Part5} className="img-fluid" alt="Free html4 bootstrap 4 template"/>
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Men