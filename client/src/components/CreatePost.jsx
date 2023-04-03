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
        await axios.post(`/api/post/${userId}`, formState)
        setFormState(initialState)
        getAllPosts()
    }


  return (
    <div>
        {/* <div className="container-sm"> */}
        <form onSubmit={handleSubmit} className="form">
            {/* <h2 >Create Post</h2> */}
                <div className='mb-2'><input
                    placeholder="Title"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.name}
                /></div>
                <div className='mb-2'><input
                    placeholder="Content"
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                /></div>
                <button type="submit" className="btn btn-primary">Post</button>
        </form>
        {/* </div> */}
      
    </div>
  )
}

export default CreatePost
