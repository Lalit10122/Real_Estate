import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProtectedRoute = ({ children, requireSeller = false }) => {
  const { isAuthenticated, isBuyer, loading } = useContext(AuthContext)

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Redirect to home if route requires seller but user is buyer
  if (requireSeller && isBuyer) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute