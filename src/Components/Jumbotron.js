import React from 'react'

const Jumbotron = (props) => {
  return (
    <div>
    <div className="jumbotron">
    <h1>{props.title}</h1>
    <p>{props.order}</p>
    </div>
    </div>
  )
}

export default Jumbotron