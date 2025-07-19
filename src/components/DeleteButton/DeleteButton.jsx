import React from 'react'


const DeleteButton = ({value}) => {
  return (
    <div className='ms-2'>
      <button className="btn btn-danger" onClick={value}>Delete</button>
    </div>
  )
}

export default DeleteButton