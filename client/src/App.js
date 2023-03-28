import './App.css';
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PostDetails from './pages/PostDetails'
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="postdetails/:id" element={<PostDetails />} />
          <Route path="create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
