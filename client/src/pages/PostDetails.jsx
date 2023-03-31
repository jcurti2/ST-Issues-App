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
        let res = await axios.get(`http://localhost:3001/api/comment/${id}`)
        console.log(res.data, 'comment');
        setComments(res.data)
    }

    const getOnePost = async () => {
        let res = await axios.get(`http://localhost:3001/api/post/${id}`)
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
        await axios.post(`http://localhost:3001/api/comment/${onePost.userId}/${onePost.id}`, formState)
        setFormState(initialState)
        getComments()
    }


    useEffect(() => {
        getOnePost()
        getComments()
    }, [])
    return (
        <div>
            {/* create comment, will need to pass id(postId) and userId into comment, then fill out form */}
            <h4 className='postInDetails'>{onePost.name} </h4>
            <p>{onePost.content}</p>
            {moment((onePost.updatedAt)).format("dddd, Do MMM YYYY, h:mm A")}

            <form onSubmit={handleSubmit} className="form">
                <h3></h3>
                {/* <input
                    placeholder="Comment Title"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.name}
                /> */}
                <div className='mb-2'><input
                    placeholder="Add Comment"
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                /></div>
                <button type="submit" className="btn btn-success">Create Comment</button>
            </form>
                <button type='submit' onClick={()=>{navigate(-1)}}>Back</button>
            {comments && comments.sort((b, a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((comment) => (
                <div key={comment.id} className='card border-primary mb-3 w-50'>
                    <div class="card-body text-dark">
    <h5 class="card-title">{moment((comment.updatedAt)).format("dddd, Do MMM YYYY, h:mm A")}</h5>
    <p class="card-text">{comment.content}</p>
  </div>
                </div>
            ))}
        </div>
    )
}

export default PostDetails
