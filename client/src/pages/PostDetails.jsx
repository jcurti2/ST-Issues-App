import {React, useState, useEffect} from 'react'
import axios from "axios"
import {useLocation, useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {

     const {id} = useParams()

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
            setFormState({...formState, [event.target.id]: event.target.value })
        }
    
        const handleSubmit = async (event) => {
            event.preventDefault()
            // console.log(userId);
            await axios.post(`http://localhost:3001/api/comment/${onePost.userId}/${onePost.id}`, formState)
            setFormState(initialState)
        }


        useEffect(() => {
            getOnePost()
            getComments()
        }, [])
  return (
    <div>
    {/* create comment, will need to pass id(postId) and userId into comment, then fill out form */}
      {onePost.name} 
      {onePost.content}
      {onePost.createdAt}
     
      <form onSubmit={handleSubmit} className="form">
            <h3></h3>
                {/* <input
                    placeholder="Comment Title"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={formState.name}
                /> */}
                <input
                    placeholder="Add Comment"
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                />
                <button type="submit" className="submitButton">Submit</button>
        </form>
        {comments && comments.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((comment) => ( 
        <div key={comment.id} className="comment">{comment.content}</div>
      ))}
    </div>
  )
}

export default PostDetails
