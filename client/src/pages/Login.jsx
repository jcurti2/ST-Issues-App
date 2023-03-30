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
        const res = await axios.post(`http://localhost:3001/api/user/login`, formState)

        console.log(res.data);
        if(res && Object.keys(res.data).length && res.data.email == formState.email)
        {
            navigate(`/home/${res.data.id}`)
        } else {
            alert('Incorrect Email')
            setFormState(initialState)
        }
    }


  return (
    <div>
    <div className='container justify-content-center'>
        <div className='container mb-2'><form onSubmit={handleSubmit} className="form">
            <h2>Login</h2>
                {/* <input
                    placeholder="Username"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.username}
                /> */}
                <div className='mb-2'><input
                    placeholder="Email"
                    id="email"
                    type="text"
                    onChange={handleChange}
                    value={formState.email}
                /></div>
                <p>Guest: guest@guest.com</p>
                <button type="submit" className="btn btn-light">Submit</button>
        </form></div>
      <button type="submit" className="btn btn-light" onClick={()=>{navigate('/register')}}>Register</button>
    </div>
    </div>
  )
}

export default Login
