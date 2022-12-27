import React, { useState } from 'react'
import Additem from './Components/Additem'
import Content from './Components/Content'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SearchItem from './Components/SearchItem'

const App = () => { 
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("ShoppingList")) || [
    {
        id:1,
        checked:true,
        item:"First Item"
    },
    {
        id:2,
        checked:false,
        item:"Second Item"
    },
    {
        id:3,
        checked:false,
        item:"Item 3"
    }
])

const [newItem, setNewItem] = useState('');
const [search,setSearch] = useState(" ");

const setAndSaveItems = (newItems)=>{
  setItems(newItems)
  localStorage.setItem("ShoppingList",JSON.stringify(newItems))
}

const addItem =(item)=>{
  const id = items.length ? items[items.length-1].id+1 : 1
  const myNewItem = {id, checked:false , item}
  const listItems= [...items,myNewItem]
  setAndSaveItems(listItems)
}

const handleCheck = (id) =>{
  // console.log(`key: ${id}`)
  const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item)
  setAndSaveItems(listItems)

}

const handleDelete = (id) =>{
  // console.log(id)
  const listItems = items.filter((item)=> item.id !== id);
  console.log(listItems)
 setAndSaveItems(listItems)
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if (!newItem) return;
  addItem(newItem)
  setNewItem('')
  console.log(newItem)

}


  return (
    <div className='App'> 
      <Header title="Training Session" />
      <Additem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
      <Content 
      items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  )
}

export default App
