import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPosts = ({posts,handleUpdate,editBody,setEditBody, editTitle, setEditTitle}) => {
    const {id} = useParams();
    const post= posts.find(post=> (post.id).toString() ===  id);

    useEffect(()=>{
        if (post) {
            setEditBody(post.title)
            setEditBody(post.body)
        }

        
    },[post, setEditBody,setEditTitle])

    
    return (
        <main className="NewPost">
        {
            editTitle && 
            <>
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={()=>handleUpdate(post.id)}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            </>
        }
        </main>
    )
}

export default EditPosts