import React from 'react'
import { useState, useEffect} from 'react'
import Client from '../api'

const UpdatePost = ({userPost, getUserPosts, getAllPosts}) => {

        const initialState = {
            name: '',
            content: ''
        }
    
        const [formState, setFormState] = useState(initialState)

        const handleChange = (event) => {
            setFormState({...formState, [event.target.id]: event.target.value })
        }
    
        const handleSubmit = async (event) => {
            event.preventDefault()
            await Client.put(`/api/post/${userPost.id}`, formState)
            setFormState(initialState)
            getUserPosts()
            getAllPosts()
        }

  return (
    <div>{userPost &&
      <form onSubmit={handleSubmit} className="form">
                <div className='mb-3'>
                    <input
                        placeholder="Title"
                        id="name"
                        type="text"
                        onChange={handleChange}
                        value={formState.name}
                    />
                </div>
                <div className='mb-3'>
                    <input
                        placeholder="Content"
                        id="content"
                        type="text"
                        onChange={handleChange}
                        value={formState.content}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Update Post</button>
        </form>}
    </div>
  )
}

export default UpdatePost
