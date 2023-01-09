import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import Parent from "./components/Parent";
import PostPage from "./components/PostPage";
import {format} from 'date-fns'
import Layout from './components/Layout';



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
  const [postBody, setPostBody] = useState("")
  const [postTitle,setPostTitle] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    const filteredResults = posts.filter((post)=> ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase())
    // || ((post.body).toLowerCase()).includes(search.toLowerCase())
    )

    setSearchResults(filteredResults.reverse())

  },[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMM dd,yyyy pp');
    const newPost = {id, title:postTitle, dateTime, body: postBody};
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('');
    setPostBody('');
    navigate('/')
  }

  const handleDelete=(id) =>{
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList)
    navigate('/');
  }
  
  
  return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
