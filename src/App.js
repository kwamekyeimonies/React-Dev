import React, { useEffect, useState } from 'react'
import Additem from './Components/Additem'
import apiRequest from './Components/ApiRequest'
import Content from './Components/Content'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SearchItem from './Components/SearchItem'

const App = () => { 

  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('');
  const [search,setSearch] = useState(" ");
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

// const setAndSaveItems = (newItems)=>{
//   setItems(newItems)
//   localStorage.setItem("ShoppingList",JSON.stringify(newItems))
// }

const addItem =async(item)=>{
  const id = items.length ? items[items.length-1].id+1 : 1
  const myNewItem = {id, checked:false , item}
  const listItems= [...items,myNewItem]
  setItems(listItems)

  const postOptions = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(myNewItem)
  }

  const result = await apiRequest(API_URL,postOptions)
  if (result) setFetchError(result);
}

const handleCheck = async(id) =>{
  // console.log(`key: ${id}`)
  const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item)
  setItems(listItems)

  const myItem = listItems.filter((item)=> item.id === id);
  const updateOptions = {
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked: myItem[0]}.checked)
  };

  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, updateOptions)
  if (result) setFetchError(result)
}

const handleDelete = async(id) =>{
  // console.log(id)
  const listItems = items.filter((item)=> item.id !== id);
  console.log(listItems)
 setItems(listItems)

 const deleteOptions = {
  method:'DELETE',
 }
 const reqUrl = `${API_URL}/${id}`
 const result = await apiRequest(reqUrl, deleteOptions)

 if (result) setFetchError(result)

}

const handleSubmit=(e)=>{
  e.preventDefault()
  if (!newItem) return;
  addItem(newItem)
  setNewItem('')
  console.log(newItem)

}

// useEffect(()=>{
//   localStorage.setItem("ShoppingList",JSON.stringify(newItem))
// },[items])

useEffect(()=>{
 const fetchItem = async()=>{
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw Error("Did not receive expedted data");
    const listItems = await response.json();
    console.log(listItems)
    setItems(listItems)
    setFetchError(null)
  }
  catch(err){
    setFetchError(err.message)
  }
  finally{
    setIsLoading(false)
  }
 }

 setTimeout(()=>{
  (async()=> await fetchItem())();
 },2000)
// fetchItem()
},[])

  return (
    <div className='App'> 
      <Header title="Training Session" />
      <Additem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items......</p>}
        {
          fetchError  && <p style={{color:'red'}}>{`Error : ${fetchError}`} </p>
        }
        {
          !fetchError && !isLoading && <Content 
          items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />
        }
      </main>
      <Footer length={items.length} />
    </div>
  )
}

export default App
