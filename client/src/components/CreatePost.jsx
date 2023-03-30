import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreatePost = ({userId, getAllPosts}) => {
    
    // let navigate = useNavigate()

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
        // console.log(userId);
        await axios.post(`http://localhost:3001/api/post/${userId}`, formState)
        setFormState(initialState)
        getAllPosts()
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className="form">
            <h2 >Create Post</h2>
                <input
                    placeholder="Name"
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
        </form>
      
    </div>
  )
}

export default CreatePost
