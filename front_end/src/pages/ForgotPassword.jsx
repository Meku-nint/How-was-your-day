import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const [emailView,setEmailView]=useState(true);
    const [forgetResponse,setForgetResponse]=useState('');
    const [verificationCode,setVerificationCode]=useState('');
    const [newPassword,setPassword]=useState('');
    const navigate=useNavigate();
 const forgetCodeHandler=async(e)=>{
      e.preventDefault();
      try {
        const response=await axios.post("http://localhost:5000/tellme/verifyDelete",{verificationCode,newPassword});
        alert(response.data.message);
        navigate('/login');
    } catch (error) {
      alert(error.response.data.message);
    }
    }
 const forgetHandler=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post("http://localhost:5000/tellme/forget",{email});
            setForgetResponse(response.data.message);
            setEmailView(false);
        } catch (error) {
          setForgetResponse(error.response.data.message);
        }
    }
  return (
    <div className='login-page'>   
    <NavBar />
    { emailView&&
        <div className='form'>
        <form className='input-forms' onSubmit={forgetHandler}>
           <input type='email'placeholder='✉️ Enter your email'autoComplete='off' name='email'value={email} required onChange={(e)=>setEmail(e.target.value)}/>
           <p>{forgetResponse}</p>
          <button type='submit'>submit</button>
        </form>
      </div>
     }
      {!emailView&&
        <div className='form'>
        <form className='input-forms' onSubmit={forgetCodeHandler}>
            <p className='response'>{forgetResponse} </p>
            <input type='text'placeholder='Verification code'autoComplete='off'name='verificationCode'required value={verificationCode}onChange={(e)=>setVerificationCode(e.target.value)}/>
           <input type='text'placeholder='Your new password'autoComplete='off' name='newPassword'value={newPassword} required onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>reset password</button>
        </form>
      </div>
     }
    <footer className='footer'>
     ©  {new Date().getFullYear()}  Tell me. All rights reserved.
    </footer>
  </div>
  )
}
export default ForgotPassword