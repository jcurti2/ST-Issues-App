import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../api'

const Login = () => {
    let navigate = useNavigate()

    const initialState = {
        // username: '',
        email: ''
    }

    const [formState, setFormState] = useState(initialState)

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await Client.post(`/api/user/login`, formState)

        if (res && Object.keys(res.data).length && res.data.email == formState.email) {
            navigate(`/home/${res.data.id}`)
        } else {
            alert('Incorrect Email')
            setFormState(initialState)
        }
    }


    return (
        <div>
            <div className='container justify-content-center align-items-center vw-100 vh-100 d-flex'>
                <div className='container mb-2'><form onSubmit={handleSubmit} className="form">
                    <h2>Login</h2>
                    <div className='mb-2'><input
                        placeholder="Email"
                        id="email"
                        type="text"
                        onChange={handleChange}
                        value={formState.email}
                    /></div>
                    <p>Guest: guest@guest.com</p>
                    <button type="submit" className="btn btn-light mb-2">Submit</button>

                </form>
                    <button type="submit" className="btn btn-light" onClick={() => { navigate('/register') }}>Register</button>
                </div>

            </div>
        </div>
    )
}

export default Login
