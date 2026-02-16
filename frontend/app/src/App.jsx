import './App.css'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import EditPost from './pages/EditPost';
import Profile from './pages/Profile'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/feed' element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
        <Route path='/CreatePost' element={<ProtectedRoute><CreatePost/></ProtectedRoute>
        }/>
        <Route path='/Profile' element={<ProtectedRoute><Profile/></ProtectedRoute>
        }/>
        <Route path="/update-post/:id" element={<ProtectedRoute><EditPost/></ProtectedRoute>} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
