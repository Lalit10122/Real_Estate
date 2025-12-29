import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'
import LogIn from './pages/LogIn'
import Property from './pages/Property'

const App = () => {
  return (
    <div className='md:px-4 '>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route path='/property/:propertyid' element={<Property/>}/>
      </Routes>
      <Footer/>
    </div>
  ) 
}

export default App
