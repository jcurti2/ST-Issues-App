import { useState, useEffect, React } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import UserPosts from '../components/UserPosts'

const Home = () => {

    const location = useLocation()
    const [allPosts, setAllPosts] = useState([])
    const [user, setUser] = useState({})
    const { id } = useParams()

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
            <div class="header">
                <div class="row justify-content-start">
                    <div class="col-4">
                        <h2>{user.username}</h2>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row align-items-start'>
                    <div className='col-3'>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Create Post
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <CreatePost userId={id} getAllPosts={getAllPosts} />
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        User Posts
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        < UserPosts user={user} userId={id} getAllPosts={getAllPosts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        {allPosts && allPosts.sort((b, a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((post) => (
                            <div className='container'>
                                <div className='row justify-content-start'>
                                    <div className='p-3 border bg-light w-50 row'>
                                        <p>{post.createdAt}</p>
                                        <Link
                                            to={`/postdetails/${post.id}`}
                                            key={post.id}
                                            state={post}
                                            className="postLink">

                                            <h2 className="postTitle">{post.name}</h2>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 