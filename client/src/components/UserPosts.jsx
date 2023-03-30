//will need to create user page or populate userPost at the bottom of dashboard, get all posts by userId, map over and add update button
import {React, useState, useEffect} from 'react'
import axios from 'axios'
import UpdatePost from './UpdatePost'

const UserPosts = ({userId, getAllPosts, user}) => {

    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async () => {
        let res = await axios.get(`http://localhost:3001/api/post/userposts/${userId}`)
        // console.log(res.data, 'posts');
        setUserPosts(res.data)
    }

    const deleteUserPost = async (userPost) => {
        await axios.delete(`http://localhost:3001/api/post/${userPost.id}`)
        getUserPosts()
    }

    useEffect(() => {
        getUserPosts()
    }, [])

    

  return (
    <div>
        <h3>{user.username} Posts</h3>
      {userPosts && userPosts.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((userPost) => ( 
        <div key={userPost.id} className="comment">
            <h4>{userPost.name}</h4> 
            <p>{userPost.content}</p>

            <UpdatePost userPost={userPost} getUserPosts={getUserPosts} getAllPosts={getAllPosts} />
            

            <button type="delete" className="btn btn-danger" onClick={()=>{deleteUserPost(userPost)}}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default UserPosts
