//will need to create user page or populate userPost at the bottom of dashboard, get all posts by userId, map over and add update button
import {React, useState, useEffect} from 'react'
import axios from 'axios'

const UserPosts = ({userId}) => {

    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async () => {
        let res = await axios.get(`http://localhost:3001/api/post/userposts/${userId}`)
        console.log(res.data, 'posts');
        setUserPosts(res.data)
    }

    useEffect(() => {
        getUserPosts()
    }, [])

    

  return (
    <div>
      
    </div>
  )
}

export default UserPosts
