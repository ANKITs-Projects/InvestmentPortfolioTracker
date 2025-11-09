import React from 'react'

const PopUpformater = ({children}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl'>{children}</div>
  )
}

export default PopUpformater