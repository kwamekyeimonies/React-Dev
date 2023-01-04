import React, { useEffect, useState } from 'react'
import Form from './components/Form';
import List from './components/List';

const App = () => {

    const API_URL = 'https://jsonplaceholder.typicode.com/';
    const [reqType, setReqType] = useState('users');
    const [items,setItems] = useState([])
    const [fetchError,setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        const fetchitems = async()=>{
            try{
                const response = await fetch(`${API_URL}${reqType}`)
                if (!response.ok) throw Error("Did not receive the expected Data from the Server")
                const data = await response.json()
                console.log(data)
                setItems(data)
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
            (async()=> await fetchitems())()
        },2000)
        // fetchitems();

    },[reqType])

  return (
   <div className='App'>
    {
        isLoading && <p>Loading Data from Server.....</p>
    }
    {
        fetchError && <p style={{color:'red'}}>{`Error:${fetchError}`} </p>
    }
    {
        !fetchError && !isLoading && <>
        <Form reqType={reqType} setReqType={setReqType}     />
        <List items={items} />
        </>
    }
   </div>
  )
}

export default App