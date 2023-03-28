import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Home = () => {

    const location = useLocation()
    const [allPosts, setAllPosts] = useState([])
    const [ user, setUser] = useState({})

    const getUser = async () => {
            let res = await axios.get(`http://localhost:3001/api/user/${location.state.email}`)
        console.log(res, 'here');
        setUser(res.data)
    }


    const getAllPosts = async () => {
        try {
            let res = await axios.get('http://localhost:3001/api/post')
            // console.log(res.data);
            setAllPosts(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPosts()
        getUser()
    }, [])
        
  return (
    <div>
        <div>
            {user.username} {user.email}
        </div>

      <div>
        {allPosts && allPosts.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((post) =>(
            <Link
            to={`/postdetails/${post.id}`}
            key={post.id}
            state={post}
            className="postLink">
                <h2 className="postTitle">{post.name}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Home