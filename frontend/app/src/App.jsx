import './App.css'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/CreatePost' element={<ProtectedRoute><CreatePost/></ProtectedRoute>
        }/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
