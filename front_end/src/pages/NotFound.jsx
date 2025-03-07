import React from 'react'
import './not.css'
import { NavLink } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='not-found'>The Page is not found  <NavLink to='/'><p>Back To Home</p> </NavLink></div>
  )
}
export default NotFound