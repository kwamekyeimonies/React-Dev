import React from 'react'

const Footer = ({length}) => {
    const today_date = new Date()
  return (
   <footer>
    <p>{length} List {length <=1 ? "Item" : "Items"} </p>
   </footer>
  )
}

export default Footer
