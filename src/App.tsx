// src/App.tsx
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './layouts/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import Projects from './pages/Projects'
import Notes from './pages/Notes';
import ProjectSolution from './pages/ProjectSolution'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          
          {/* Protected routes */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resources" element={<Resources />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:faculty/:semester/:projectId" element={<ProjectSolution />} />
            <Route path="notes" element={<Notes />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App