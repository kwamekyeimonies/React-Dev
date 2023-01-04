import React, { useState } from 'react'
import ItemList from './ItemList'

const Content = ({items,handleCheck, handleDelete}) => {

    // const handleNameChange = () =>{
    //     const names = ["Teankorang","Matilda","Ayisu","Fiadjo"]
    //     const random_index = Math.floor(Math.random()* 4);
    //     console.log(random_index)
    //     setName(names[random_index])
    // }

    // const handleClick = () =>{
    //     setCount(count + 1)
    //     console.log(count);
    // }

    // const handle_Click=(name)=>{
    //     console.log(`${name} was Clicked`)
    // }

    // const handle_Click3=(e)=>{
    //     console.log(e.target.innerText)
    // }

  return (
    <>
      {
        items.length ? (
           <ItemList   items={items} handleCheck={handleCheck} handleDelete={handleDelete}  />
        ) :
        (
            <p style={{
                marginTop:'2rem'
            }}>Your List is empty</p>
        )
      }
    </>
  )
}

export default Content
