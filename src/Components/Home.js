import React from 'react'
// import { useLocation } from 'react-router';
import Sale from './Sale';
import Carousel from './Carousel'
import HomeP from './HomeP'


const Home = () => {
  return (
    <div>
  
      <Carousel />
      <div className="colorlib-intro">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2 className="intro">It started with a simple idea: Create quality, well-designed products that I wanted myself.</h2>
            </div>
          </div>
        </div>
      </div>
      <HomeP title='Best Sellers' />
      <div className="row">
					<div className="col-md-12 text-center">
						<p><a href="" className="btn btn-primary btn-lg">Shop All Products</a></p>
					</div>
				</div>
    </div>
  )
}

export default Home