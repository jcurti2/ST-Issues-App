import './App.css';
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PostDetails from './pages/PostDetails'
// import CreatePost from './components/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/postdetails/:id" element={<PostDetails />} />
          {/* <Route path="create-post" element={<CreatePost />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
