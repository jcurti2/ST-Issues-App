import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../api'

const CreatePost = ({ userId, getAllPosts }) => {

    let navigate = useNavigate()

    const initialState = {
        name: '',
        content: ''
    }

    const [formState, setFormState] = useState(initialState)
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await Client.post(`/api/post/${userId}`, formState)
        setFormState(initialState)
        getAllPosts()
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
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
        </div>
    )
}

export default CreatePost
