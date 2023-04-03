//will need to create user page or populate userPost at the bottom of dashboard, get all posts by userId, map over and add update button
import {React, useState, useEffect} from 'react'
// import axios from 'axios'
import UpdatePost from './UpdatePost'
import Client from '../api'

const UserPosts = ({userId, getAllPosts, user}) => {

    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async () => {
        let res = await Client.get(`/api/post/userposts/${userId}`)
        // console.log(res.data, 'posts');
        setUserPosts(res.data)
    }

    const deleteUserPost = async (userPost) => {
        await Client.delete(`/api/post/${userPost.id}`)
        getUserPosts()
    }

    useEffect(() => {
        getUserPosts()
    }, [])

    

  return (
    <div>
        <div className='container'>
        <div >
        <h4>{user.username} Posts</h4>
        </div></div>
      {userPosts && userPosts.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((userPost) => ( 
        <div key={userPost.id} className="comment">
            <h5>{userPost.name}</h5> 
            <p>{userPost.content}</p>

            <UpdatePost userPost={userPost} getUserPosts={getUserPosts} getAllPosts={getAllPosts} />
            

            <img 
            id="deletePost" 
            className="btn btn-danger mb-2" 
            onClick={()=>{deleteUserPost(userPost)}} 
            alt="trash icon"
            src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
            />
        </div>
      ))}
    </div>
  )
}

export default UserPosts
