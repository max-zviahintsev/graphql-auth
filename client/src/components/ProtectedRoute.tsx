import { Navigate, Outlet } from 'react-router'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { authorizedUser, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!authorizedUser) return <Navigate to='/login' replace />

  return <Outlet />
}

export default ProtectedRoute
