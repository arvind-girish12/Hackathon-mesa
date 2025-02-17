import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import route components
import Login from './pages/login/index'
import Signup from './pages/signup/index'
import Dashboard from './pages/dashboard/index'
import Onboarding from './pages/onboarding/index'
// import Session from './routes/Session'
// import Chat from './routes/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        {/* <Route path="/session" element={<Session />} />
        <Route path="/chat" element={<Chat />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
