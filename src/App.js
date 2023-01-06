import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import Parent from "./components/Parent";
import PostPage from "./components/PostPage";



const App = () => {
  
  const [search,setSearch] = useState("")
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [searchResults, setSearchResults] = useState([])

  const handleDelete=(id) =>{
    
  }

  return (
    <div className='App'>   
      <Header title="Tea Code Dev Blog" />
      <Navbar search={search} setSearch={setSearch} />    
      <Routes>
        <Route path='/' element={<Home posts={posts}  />} />  
        <Route path='/post' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path='/about' element={<About  />}   />
        <Route path='/*' element={<Missing  />}   />
      </Routes>     
      <Footer />
    </div>
  )
}

export default App
