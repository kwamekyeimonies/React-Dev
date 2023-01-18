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
import EditPosts from './components/EditPosts';
import Navbar from './components/Navbar';
import Header from './components/Header';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

const App = () => {
  
  const [search,setSearch] = useState("")
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [postBody, setPostBody] = useState("")
  const [postTitle,setPostTitle] = useState("")
  const [editTitle,setEditTitle] = useState("");
  const [editBody,setEditBody] = useState("")
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

  // useEffect(()=>{
  //   const fetchPosts = async()=>{
  //     try{
  //       const response = await api.get('/posts');

  //       setPosts(response.data)
  //     }
  //     catch(err){

  //       if (err.response) {
  //          //Not in the 200 Response Range
  //       console.log(err.response.data)
  //       console.log(err.response.status)
  //       console.log(err.response.headers)
  //       }
  //       else{
  //         console.log(`Error: ${err.message} `)
  //       }
       
  //     }
  //   }

  //   fetchPosts();
  // },[])

  useEffect(()=>{
    setPosts(data);
  },[data] )

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
    const updatedPost = {id, title:editTitle, dateTime, body: editBody};

    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post=>post.id === id ? {...response.data} : post))
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
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList)
      navigate('/');
    }
    catch(err){
      console.log(`Err: ${err.message}`)
    }
  }
  
  
  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading} />}    />
          
        <Route exact path="/post" element={ <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}   />
         
        <Route path="/edit/:id" element={<EditPosts
            posts={posts}
            handleUpdate={handleUpdate}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />}     />
          
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />}    />
  
        <Route path="/about" element={About} />
        <Route path="*" element={Missing} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
