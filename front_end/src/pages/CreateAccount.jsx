import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import './create.css';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [types, setType] = useState('password');
    const [code, setCode] = useState("");
    const [verify, setVerify] = useState(false);
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        user_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [signupResponse, setSignupResponse] = useState("");

    const signupHandler = (event) => {
        const { name, value } = event.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    const verificationCodeHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/tellme/verify', { code });
            setSignupResponse(res.data.message);
        } catch (error) {
            if (error.response) {
                setSignupResponse(error.response.data.message);
            } else {
                setSignupResponse("An error occurred. Please try again.");
            }
        }
    };

    const handleSubmitSignup = async (event) => {
        event.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/tellme/signup', signupData);
            setSignupResponse(res.data.message);
            setVerify(true);
        } catch (error) {
            if (error.response) {
                setSignupResponse(error.response.data.message);
            } else {
                setSignupResponse("An error occurred. Please try again.");
            }
        }
    };

    const navigateHandler = () => {
        navigate('/login');
    };

    return (
        <div className='create-body'>
            <NavBar />
            {!verify &&
                <form className='input-forms' onSubmit={handleSubmitSignup}>
                    <div>
                        <input
                            type='text'
                            placeholder='Full name'
                            name="user_name"
                            value={signupData.user_name}
                            onChange={signupHandler}
                            minLength={1}
                            maxLength={30}
                            required
                            autoComplete="name" // Added autoComplete
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            name="email"
                            value={signupData.email}
                            onChange={signupHandler}
                            required
                            autoComplete="email" // Added autoComplete
                        />
                        <input
                            type={types}
                            onMouseEnter={() => setType('text')}
                            onMouseLeave={() => setType('password')}
                            placeholder='Password'
                            name="password"
                            value={signupData.password}
                            onChange={signupHandler}
                            maxLength={20}
                            minLength={6}
                            required
                            autoComplete="new-password" // Added autoComplete
                        />
                        <input
                            type={types}
                            onMouseEnter={() => setType('text')}
                            onMouseLeave={() => setType('password')}
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            value={signupData.confirmPassword}
                            onChange={signupHandler}
                            maxLength={20}
                            minLength={6}
                            required
                            autoComplete="new-password" // Added autoComplete
                        />
                        <p className='response'>{signupResponse}</p>
                        <button type='submit'>Create an Account</button>
                        <div className='forget-create'>
                            <p onClick={navigateHandler} style={{ cursor: 'pointer' }}>I have already an Account</p>
                        </div>
                    </div>
                </form>
            }
            {
                verify &&
                <form onSubmit={verificationCodeHandler}>
                    <div className='verification'>
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            name="verification_code"
                            value={code} required
                            onChange={(e) => { setCode(e.target.value) }}
                            autoComplete="off" // Disable autocomplete for verification code input
                        />
                        <p className='response'>{signupResponse}</p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            }
            <footer className='footer'>
                © {new Date().getFullYear()} Tell me. All rights reserved.
            </footer>
        </div>
    );
};

export default CreateAccount;