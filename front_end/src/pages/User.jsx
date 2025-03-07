import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import MenuOptions from './MenuOptions.jsx';
const User = () => {
    const [listIsHover,setListIsHover]=useState(false);
    const [menuOption,setMenuOption]=useState(false);
    const [hover,setHover]=useState(null);
    const [deleteDiary,setDeleteDiary]=useState(false);
    const [userName,setUserName]=useState('');
    const [userData, setUserData] = useState([{
        text:'',
        createdAt: ''
    }]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [error, setError] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                nav('/login');
                return;
            }
            try {
                const response = await axios.get('https://how-was-your-day.onrender.com/tellme/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [nav]);

    const deleteHandler=async(diaryId)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            nav('/login');
            return;
        }
        try {
           const response= await axios.delete('http://localhost:5000/tellme/delete', {
                headers: { Authorization: `Bearer ${token}` },
                data: { diaryId }
            });
            alert(response.data.message);
            const res = await axios.get('http://localhost:5000/tellme/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(res.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }   
    }
    const handleUserName=async()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            nav('/login');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5000/tellme/user_name', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserName(response.data.name);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    }
    handleUserName();
    const textHandler = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
          nav('/login');
          return;
      }
      try {
          await axios.post('http://localhost:5000/tellme/text', {text }, { 
              headers: { Authorization: `Bearer ${token}` }
          });
          setText('');
          const res = await axios.get('http://localhost:5000/tellme/user', {
              headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(res.data);
      } catch (error) {
          setError(error.response ? error.response.data.message : error.message);
      }
  };
    return (
        <div className='user-page'>
            <nav className='user-nav'>
                <li className='menu' onClick={()=>{setMenuOption(!menuOption)}}>
               <FontAwesomeIcon icon={faBars} /></li>
                <a href="#report"><li className='tell-me'>How was your day ?</li></a>
                <li className='fire'><FontAwesomeIcon icon={faFire} /></li>
            </nav>
            {menuOption&&
            <MenuOptions/>
            }
        <div className =' u' onClick={()=>{setMenuOption(false)}}>
            <div className='profile'>
                <div className='user-profile'>
                  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt=''/>
                    <h4 className='user-name'>{userName}</h4>
                </div>
                <p>Welcome to Tell Me <mark><b>{userName}</b></mark> This user-friendly application encourages individuals to engage in daily
                     reflection through diary writing. Its primary purpose is to provide a safe space for users to document their
                      thoughts and experiences. By inviting users to write about their daily lives, Tell Me promotes self-awareness, 
                      helping individuals track their emotional changes over time. The app serves as a personal journal while offering
                       insights that highlight patterns and progress, empowering users to understand their growth.
                     With Tell Me, you can cultivate a habit of reflection and celebrate your achievements on your personal journey.</p>
             </div>
            {loading ? (
                <h1 >Loading...</h1>
            ) : (
                <div className='main-body'>
                    <h5>Here are your diary what you write before </h5>
                    <ul>{error && <h1 style={{ color: 'red' }}>{error}</h1>}
                        {userData.map((entry, index) => (
                            <li key={index} onMouseEnter={()=>{setListIsHover(true);setHover(index)}} onMouseLeave={()=>{setListIsHover(false);setHover(null);setDeleteDiary(false)}}>
                                <div className='entry-header'>     
                                <p>Date  : {entry.createdAt.slice(0, 10)}</p>
                                {
                                    (listIsHover&&hover===index)&&
                                 <div className='delete-edit-icons'>
                                    { deleteDiary &&
                                    <div className='delete-cancel'>
                                        <button onDoubleClick={()=>deleteHandler(entry._id)}>Delete</button>
                                        <button onClick={()=>setDeleteDiary(false)}>Cancel</button>
                                    </div>
                                    }
                                    <FontAwesomeIcon icon={faTrash}title ="Delete" onClick={()=>setDeleteDiary(true)}/>
                                     <FontAwesomeIcon icon={faPenToSquare} title="Edit"/>
                                 </div> 
                                }                          
                                </div>
                              <p className='message'> {entry.text}</p>  </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <h1 style={{ color: 'red', padding :'10px', textAlign:'center' }}>{error}</h1>}
            <form onSubmit={textHandler} className='write-diary'>
                <textarea
                    placeholder='Write your daily report'id="report" required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit"><FontAwesomeIcon icon={faArrowRight} title="save diary" /></button>
            </form>
          <p className='foot'>Fop any queries or feedback, reach out to us at: <a href="http://www.lezih2500@gmail.com">contact@tellme.com</a></p>           
          </div>
         </div>
    );
};
export default User;