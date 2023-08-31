import React from 'react'
import "./button.css"
const SelectButton = ({children , onClick , selected}) => {
  return (
    <span
    onClick={onClick}
    className='btn'
    >{children}</span>
  )
}

export default SelectButton