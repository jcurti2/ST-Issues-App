import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    let navigate = useNavigate()

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
        await axios.post(`http://localhost:3001/api/post/${userId}`, formState)
        setFormState(initialState)
        await navigate('/')
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className="form">
            <h1 >Create Post</h1>
                <input
                    placeholder="Name"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.name}
                />
                <input
                    placeholder="Location"
                    id="location"
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
