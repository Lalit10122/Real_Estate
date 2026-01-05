import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Dashboard = () => {
  const {isBuyer} = useContext(AuthContext)
  return (
    <div>
      Dashboard
      {isBuyer?<p>hello</p>:'kkkk'}
    </div>
  )
}

export default Dashboard
