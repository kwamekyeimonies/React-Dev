import React from 'react';
import LineItem from './LineItem';


const ItemList = ({items,handleCheck, handleDelete}) => {
  return (
    <ul>
    {
        items.map((product)=>(
            <LineItem key={product.id}   product={product} handleCheck={handleCheck} handleDelete={handleDelete} />
        ))
    }
    </ul>
  )
}

export default ItemList
