import { useState, useEffect, React } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import UserPosts from '../components/UserPosts'
import moment from 'moment'
import LightRailStations from '../components/LightRailStations'

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
            <div className="header">
                <div className="row justify-content-start">
                    <div className="col-4">
                        <h5>{user.username}</h5>
                    </div>
                    <div className='col-5'>
                        <h3>StopSpotter: Your Crowd-Sourced Transit Issue Reporter</h3>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row align-items-start' id='columnholder'>
                    <div className='col-4' id='column'>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Create Post
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <CreatePost userId={id} getAllPosts={getAllPosts} />
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h3 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        {user.username}'s Posts
                                    </button>
                                </h3>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        < UserPosts user={user} userId={id} getAllPosts={getAllPosts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6' id='column'>
                        {allPosts && allPosts.sort((b, a) => new Date(...a.updatedAt.split('/')) - new Date(...b.updatedAt.split('/'))).map((post) => (
                            <div className='container' id='container2'>
                                <div className='row justify-content-start w-100' id="post">
                                    <div className='p-3 border bg-light w-100 row mb-3'>                        
                                        <Link
                                            to={`/postdetails/${post.id}`}
                                            key={post.id}
                                            state={post}
                                            className="postLink">

                                            <h2 className="postTitle">{post.name}</h2>
                                        </Link>
                                        <p>{moment((post.updatedAt)).format("dddd, Do MMM YYYY, h:mm A")}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-2' id='column'>
                    <LightRailStations />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 