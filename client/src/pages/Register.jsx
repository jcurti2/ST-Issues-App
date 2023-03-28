import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    let navigate = useNavigate()

    const initialState = {
        username: '',
        email: ''
    }

    const [formState, setFormState] = useState(initialState)
    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(`http://localhost:3001/api/user/`, formState)
        setFormState(initialState)
        await navigate('/')
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className="form">
            <h1 >Register</h1>
                <input
                    placeholder="Username"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.username}
                />
                <input
                    placeholder="Email"
                    id="email"
                    type="text"
                    onChange={handleChange}
                    value={formState.email}
                />
                <button type="submit" className="submitButton">Submit</button>
        </form>
      
    </div>
  )
}

export default Register
