import './App.css'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<CreatePost/>}/>
        <Route path='/about' element={<h1>about page</h1>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
