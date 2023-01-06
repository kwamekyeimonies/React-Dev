import React from 'react';
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
  return (
    <div className='App'>   
      <Header />
      <Navbar />    
      <Routes>
        <Route path='/' element={<Home  />} />  
        <Route path='/post' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage  />} />
        <Route path='/about' element={<About  />}   />
        <Route path='/*' element={<Missing  />}   />
      </Routes>     
      <Footer />
    </div>
  )
}

export default App
