import React from 'react';
import './menu.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const MenuOptions = () => {
    const [fromServer,setFromServer]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const [edit, SetEdit] = useState(false);
    const [name, setName] = useState('');
    const [deleted, setDelete] = useState(false);
    const deleteAccountHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios.delete("https://how-was-your-day.onrender.com/tellme/deleteAccount", {
            headers: { Authorization: `Bearer ${token}` },
            data: { password },
        }).then((response) => {
            setFromServer(response.data.message);
            navigate('/login');
        }).catch((error) => {
            setFromServer(error.response.data.message);
        });
    };

    const passwordEditHandler = (e) => {
        if(newPassword!==confirmPassword){
            return alert('the password is not match');
        }
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios.post("https://how-was-your-day.onrender.com/tellme/changePassword", { password, newPassword }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            setFromServer(response.data.message);
        }).catch((error) => {
            setFromServer(error.response.data.message);
        });
        setConfirmPassword('');
        setPassword('');
        setNewPassword('');
    };

    const nameEditHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios.post('https://how-was-your-day.onrender.com/tellme/changeName', { name, password }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            setFromServer(response.data.message);
        }).catch((error) => {
            setFromServer(error.response.data.message);
        });
        setName('');
        setPassword('');
    };
    return (
        <div className='main-menu'>
            <div className='menu-list'>
                <ul className='menu-options'>
                    <li onClick={() => { SetEdit(true); setDelete(false) }}>Edit profile</li>
                    <li onDoubleClick={() => { navigate('/login') }}>Logout</li>
                    <li onClick={() => { setDelete(true); SetEdit(false); }}>Delete Account</li>
                </ul>
            </div>
            {
                edit &&
                <div className='edit-profile-form'>
                <span>{fromServer}</span>
            <div className='set-time'>
            {setTimeout(() => {
                  setFromServer('');
                },10000)}
            </div>
               <div className='edit-profile'>
                        <p onClick={() => { SetEdit(false); setDelete(false) }} style={{ justifyContent: 'right', paddingBottom: '10px', display: 'flex', cursor: 'pointer' }}>❌</p>
                        <details>
                            <summary>Change password</summary>
                            <form className='edit-form' onSubmit={passwordEditHandler}>
                                <input
                                    type='password'
                                    placeholder='Enter your old password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='current-password'
                                    required
                                />
                                <input
                                    type='password'
                                    placeholder='Enter your new password'
                                    value={newPassword}
                                    name='newPassword'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoComplete='off'
                                    required
                                />
                                <input
                                    type='password'
                                    placeholder='Confirm password'
                                    autoComplete='off'
                                    value={confirmPassword}
                                    name='confirmPassword'
                                    required
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                                <button type="submit">Save</button>
                            </form>
                        </details>
                        <details>
                            <summary>Change Your Name</summary>
                            <form className='edit-form' onSubmit={nameEditHandler}>
                                <input
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    name='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='current-password'
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Enter your new name'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete='off'
                                    required
                                />
                                <button type='submit'>Save</button>
                            </form>
                        </details>
                        <details>
                            <summary>Change profile picture</summary>
                            <form className='edit-form'>
                                <input
                                    type='file'
                                    autoComplete='off'
                                    required
                                />
                                <button type="submit">Save</button>
                            </form>
                        </details>
                    </div>
                </div>
            }
            {
                deleted &&
                <form className='delete-form' onSubmit={deleteAccountHandler}>
                    <div className='delete-account'>
                        <p onClick={() => { SetEdit(false); setDelete(false) }} style={{ justifyContent: 'right', paddingBottom: '10px', display: 'flex', cursor: 'pointer' }}>❌</p>
                        <input
                            placeholder='Enter your password'
                            required
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='current-password'
                        />
                        <p>Check the checkbox if you are sure to delete your account <input type="checkbox" required /></p>
                        <button type="submit" className='delete-button'>Delete</button>
                    </div>
                </form>
            }
        </div>
    );
};
export default MenuOptions;
