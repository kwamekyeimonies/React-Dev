import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({product,handleCheck, handleDelete}) => {
  return (
    <li key={product.id} className='item'>
        <input type="checkbox" onChange={()=>handleCheck(product.id)} checked={product.checked}    />
        <label style={(product.checked) ? {textDecoration:'line-through'} : null} onDoubleClick={()=>handleCheck(product.id)} >{product.item} </label>
        <FaTrashAlt
        onClick={()=> handleDelete(product.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${product.product}`}
        />
    </li>
  )
}

export default LineItem