import {React, useState, useEffect} from 'react'
import Client from '../api'


const PostCreator = ({post}) => {
    const [postCreator, setPostCreator] = useState()

    const getPostCreator = async () => {
        let res = await Client.get(`/api/user/${post.userId}`)
        console.log(res.data.username);
        setPostCreator(res.data.username)
    }

    useEffect(() => {
        getPostCreator()
    }, [])

  return (
    <div>
      {postCreator}
    </div>
  )
}

export default PostCreator
