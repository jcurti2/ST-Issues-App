import { useState, useEffect, React } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import UserPosts from '../components/UserPosts'

const Home = () => {

    const location = useLocation()
    const [allPosts, setAllPosts] = useState([])
    const [ user, setUser] = useState({})
    const {id} = useParams()

    const getUser = async () => {
            
            let res = await axios.get(`http://localhost:3001/api/user/${id}`)
        console.log(res.data, 'here');
        setUser(res.data)
    }


    const getAllPosts = async () => {
        try {
            let res = await axios.get('http://localhost:3001/api/post')
            // console.log(res.data);
            setAllPosts(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPosts()
        getUser()
    }, [])
        
  return (
        
<div>
    <div className='container px-4'>
        <div className='row align-items-start'>
            <div className='col'>
            <div classname='userInfo'>{user.username} {user.email}</div>
            <div>
                <CreatePost userId={id} getAllPosts={getAllPosts}/>
            </div>
            </div>
            <div className='col'>
                {/* <div className=>  */}
            {allPosts && allPosts.sort((b,a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((post) =>(
                <div className='p-3 border bg-light'> 
                    <Link
                    to={`/postdetails/${post.id}`}
                    key={post.id}
                    state={post}
                    className="postLink">
                        <h2 className="postTitle">{post.name}</h2>
                    </Link> 
                </div>
            ))}
                {/* </div> */}
            </div>
            
            <UserPosts userId={id} getAllPosts={getAllPosts} />
            
        </div>
    </div>
</div>
  )
}

export default Home