import { React, useState, useEffect } from 'react'
import axios from "axios"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const PostDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [onePost, setOnePost] = useState({})

    const getComments = async () => {
        let res = await axios.get(`/api/comment/${id}`)
        console.log(res.data, 'comment');
        setComments(res.data)
    }

    const getOnePost = async () => {
        let res = await axios.get(`/api/post/${id}`)
        console.log(res.data, 'here')
        setOnePost(res.data)
    }

    const initialState = {
        // name: '',
        content: ''
    }

    const [formState, setFormState] = useState(initialState)
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(userId);
        await axios.post(`/api/comment/${onePost.userId}/${onePost.id}`, formState)
        setFormState(initialState)
        getComments()
    }


    useEffect(() => {
        getOnePost()
        getComments()
    }, [])
    return (
        <div>
            <div className='container'>

            <div className='container '>
            <div className='row justify-content-center'>
                        <div class="card-body text-dark width-100 card border-danger row mt-3 mb-3">
            <h4 className='postInDetails'>{onePost.name} </h4>
            <p>{onePost.content}</p>
            {moment((onePost.updatedAt)).format("dddd, Do MMM YYYY, h:mm A")}
            </div>
            </div>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <div className='mb-2'><input
                    placeholder="Add Comment"
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                /></div>
                <button type="submit" className="btn btn-dark mb-2">Create Comment</button>
            </form>
            <button type='submit' className="btn btn-dark mb-2" onClick={() => { navigate(-1) }}>Back</button>
            <div className='col-8 container'>
                {comments && comments.sort((b, a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((comment) => (
                
                    <div className='row justify-content-center'>
                        <div className="card-body text-dark width-100 card border-dark row mb-3 ">
                            <div key={comment.id}>
                            <h5 className="card-title">{moment((comment.updatedAt)).format("dddd, Do MMM YYYY, h:mm A")}</h5>
                            <p className="card-text">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                
            ))}
            </div>
            </div>
        </div>
    )
}

export default PostDetails
