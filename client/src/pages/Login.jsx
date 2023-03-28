// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import PageOne from '../components/PageOne'
// import axios from 'axios'


// const Home = () => {

//   const [ownerName, setOwnerName] = useState('')
//   const navigate = useNavigate()


//   const submitClick = async (e) => {
//     e.preventDefault()
//     const res = await axios.get(`/api/ownername/${ownerName}`)
    
//     if (res && Object.keys(res.data).length && res.data.owner.name == ownerName) {
//       navigate('/page2', { state: { id: res.data.owner._id, } })
//     }
//     else {
//       const response = await axios.post('/api/owner/', {
//         "name": ownerName,
//         "money": "1000"
//       })
//       let ownerId = response.data.owner._id

//       navigate('/page2', { state: { id: ownerId, } })
//     }
//   }


//   const handleChange = (event) => {
//     setOwnerName(event.target.value)
//   }
//   return (
//     <div>
//       <PageOne submitClick={submitClick} handleChange={handleChange} ownerName={ownerName} />
//     </div>
//   )
// }

// export default Home

