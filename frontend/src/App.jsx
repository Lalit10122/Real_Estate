import React from 'react'
import { Route, Routes } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import LogIn from './pages/LogIn'
import Register from './pages/Register'

// Buyer Pages
import Home from './pages/Home'
import Search from './pages/Search'
import Property from './pages/Property'
import Profile from './pages/Profile'

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard'
import MyProperties from './pages/seller/MyProperties'
import AddProperty from './pages/seller/AddProperty'
import EditProperty from './pages/seller/EditProperty'

const App = () => {
  return (
    <AuthProvider>
      <div className='md:px-4'>
        <Header />
        <Routes>
          {/* Auth Routes - Public */}
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />

          {/* Buyer Routes - Public */}
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/property/:propertyid' element={<Property />} />
          
          {/* Profile - Protected (Any authenticated user) */}
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Seller Routes - Protected (Sellers only) */}
          <Route 
            path='/seller/dashboard' 
            element={
              <ProtectedRoute requireSeller={true}>
                <SellerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/seller/my-properties' 
            element={
              <ProtectedRoute requireSeller={true}>
                <MyProperties />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/seller/add-property' 
            element={
              <ProtectedRoute requireSeller={true}>
                <AddProperty />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/seller/edit-property/:id' 
            element={
              <ProtectedRoute requireSeller={true}>
                <EditProperty />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App