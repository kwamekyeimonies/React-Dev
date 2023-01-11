import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import NewPost from "./components/NewPost";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import Parent from "./components/Parent";
import PostPage from "./components/PostPage";
import {format} from 'date-fns';
import Layout from './components/Layout';
import api from "./api/posts";

const App = () => {
  
  const [search,setSearch] = useState("")
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [postBody, setPostBody] = useState("")
  const [postTitle,setPostTitle] = useState("")
  const [editTitle,setEditTitle] = useState("");
  const [editBody,setEditBody] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const response = await api.get('/posts');

        setPosts(response.data)
      }
      catch(err){

        if (err.response) {
           //Not in the 200 Response Range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
        }
        else{
          console.log(`Error: ${err.message} `)
        }
       
      }
    }

    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResults = posts.filter((post)=> ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase())
    // || ((post.body).toLowerCase()).includes(search.toLowerCase())
    )

    setSearchResults(filteredResults.reverse())

  },[posts,search])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMM dd,yyyy pp');
    const newPost = {id, title:postTitle, dateTime, body: postBody};
    try{
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleUpdate = async(id) =>{
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMM dd,yyyy pp');
    const newPost = {id, title:editTitle, dateTime, body: editBody};

    try{
      const response = await api.put(`/post/${id}`, updatedPost)
      setPosts(posts.map((post)=> post.id === id ? {...response.data} : post))
      setEditTitle("")
      setEditBody("")
      navigate("/");
    }
    catch(err){
      console.log(`Err: ${err.message}`)
    }

  }


  const handleDelete=async(id) =>{
    try{
      await api.delete(`/api/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList)
      navigate('/');
    }
    catch(err){
      console.log(`Err: ${err.message}`)
    }
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
