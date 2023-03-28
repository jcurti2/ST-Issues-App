import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    let navigate = useNavigate()

    const initialState = {
        // username: '',
        email: ''
    }

    const [formState, setFormState] = useState(initialState)

    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await axios.get(`http://localhost:3001/api/user/${formState.email}`)
        // console.log(res.data);
        if(res && Object.keys(res.data).length && res.data.email == formState.email)
        {
            navigate('/home', { state: { email: res.data.email, } })
        } else {
            alert('Incorrect Email')
            setFormState(initialState)
        }
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className="form">
            <h1 >Login</h1>
                {/* <input
                    placeholder="Username"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.username}
                /> */}
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

export default Login
