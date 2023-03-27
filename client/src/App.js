import './App.css';
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Home />
      <main>
        {/* <Routes>
          <Route path="/" element={<Home />} />
        </Routes> */}
      </main>
    </div>
  );
}

export default App;
