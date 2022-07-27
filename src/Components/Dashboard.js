import React from 'react'
import Jumbotron from './Jumbotron';

const Dashboard = (props) => {
  let order = 29;
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>

            <Jumbotron title="Orders" order={order} />
            <Jumbotron title="Products" order={order} />
          </div>
          <div className='col-lg-6'>
            <Jumbotron title="Categories" order={order} />
            <Jumbotron title="Hello" order={order} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard