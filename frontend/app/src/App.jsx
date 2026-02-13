import './App.css'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<CreatePost/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
