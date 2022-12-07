import React from 'react'
import "./customButtons.css"
const CustomButtons = ({children,selected,onClick}) => {
  return (
    <div className='selectButton' style={{color: selected ? "white":"#005373",backgroundColor: selected ? "#005373":"",fontWeight:selected ? "700":"500"}} onClick={onClick}>{children}</div>
  )
}

export default CustomButtons