import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

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
            await axios.put(`http://localhost:3001/api/post/${userPost.id}`, formState)
            setFormState(initialState)
            getUserPosts()
            getAllPosts()
        }

  return (
    <div>{userPost &&
      <form onSubmit={handleSubmit} className="form">
                <input
                    placeholder="Title"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.name}
                />
                <input
                    placeholder="Content"
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                />
                <button type="submit" className="submitButton">Submit</button>
        </form>}
    </div>
  )
}

export default UpdatePost
