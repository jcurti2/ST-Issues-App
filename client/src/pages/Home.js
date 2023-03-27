import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [allPosts, setAllPosts] = useState([])

    const getAllPosts = async () => {
        try {
            let res = await axios.get('http://localhost:3001/api/post')
            console.log(res.data);
            setAllPosts(res.data)
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
        {allPosts && allPosts.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((post) =>(
            <div key={post.id} className="postLink">
                <h2 className="postTitle">{post.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Home