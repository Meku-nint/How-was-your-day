import React, { useState } from 'react';
import NavBar from './NavBar.jsx';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAuthentication = () => {
  const [types, setTypes] = useState("password");
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/createAccount');
  };
  const forgetHandler = () => {
    navigate('/forget');
  };
  const loginHandler = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/tellme/login', loginData);
      setResponse(res.data.message);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/user');
      }
    } catch (error) {
      setResponse(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className='login-page'>
      <NavBar />
      <div className='form'>
        <form className='input-forms' onSubmit={handleSubmitLogin}>
          <input 
            type='email' 
            placeholder='✉️ Email' 
            name="email" 
            value={loginData.email} 
            onChange={loginHandler} 
            required 
            autoComplete="email"
          />
          <input 
            type={types} 
            onMouseEnter={() => { setTypes("text") }} 
            onMouseLeave={() => { setTypes("password") }} 
            placeholder='🔑Password' 
            name="password" 
            value={loginData.password} 
            onChange={loginHandler} 
            required 
            autoComplete="current-password" 
          />
          <p>{response}</p>
          <button type='submit'className='login-button'>Login</button>
          <div className='forget-create'>
            <p onClick={forgetHandler}>Forgot Password?</p>
            <p onClick={navigateHandler}>Create an Account</p>
          </div>
        </form>
      </div>
      <footer className='footer'>
        © {new Date().getFullYear()} Tell me. All rights reserved.
      </footer>
    </div>
  );
}
export default LoginAuthentication;