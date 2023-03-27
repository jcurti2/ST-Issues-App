import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [allPosts, setAllPosts] = useState([])

    const getAllPosts = async () => {
        try {
            let res = await axios.get('http://localhost:3001/api/post')
            console.log(res);
            setAllPosts(res.data.posts)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])
        




  return (
    <div>
      <div>
        {allPosts && allPosts.map((post) =>(
            <Link
            to={`/postDetails/${post.id}`}
            key={post.id}
            state={post}
            className="postLink"
            >
                <h2 className="postTitle">{post.name}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
