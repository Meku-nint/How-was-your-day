import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css';
import { useState } from 'react';
const NavBar = () => {
  const [active,setActive] = useState('home');
  return (
    <div className='navigation-page'>
          <nav className='navigation-bar'>
            <div className='navigation-list'>
                 <ul>
                    <NavLink to='/'>
                    <li onClick={()=>setActive('home')}className={active==='home'?'active':null}><i className="fas fa-home"></i>   Home</li>
                    </NavLink>
                    <li onClick={()=>setActive('about')} className={active==='about'?'active':null}>
                      <a href='#about'>About</a></li>
                  <li onClick={()=>setActive('contact')} className={active==='contact'?'active':null}>
                    <a href='#contact'>Contact</a></li>
                    <NavLink to='login'>
                      <li onClick={()=>setActive('login')} className={active==='login'?'active':null}>Login</li>
                      </NavLink>
                 </ul>
            </div>
        </nav>
    </div>
  )
}
export default NavBar