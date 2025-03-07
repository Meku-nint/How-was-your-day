import React from 'react'
import NavBar from './NavBar.jsx'
import './home.css'
const HomePage = () => {
  return (
    <div className='homePage'>
      <NavBar/>
        <div className='tellme'>
          <p>Track Your Progress, Elevate Your Potential</p>
        </div>
             <div className='images'>
                <img className='main-image' src="https://www.proofhub.com/articles/wp-content/uploads/2023/11/Productivity-Tools-That-Will-Make-Your-Life-Much-Easier.jpg" alt="Productivity Tools" width="100%"/>   
                <p className='overlay'>Productivity Tools That Will Make Your Life Much Easier</p>
            </div>
                <div className='tellme-header'><h3>How tell me helps you achieve your goals</h3></div>
        <div className='container'id='about'>
          <div className='use1'>
          <p><strong className='strong'>✅ Maximize Productivity</strong></p>
              <p>TellMe is more than just a task tracker. It’s a tool that helps you stay<strong > organized, plan your time efficiently, and eliminate distractions.</strong> The app empowers you to prioritize tasks based on importance, ensuring that you focus on what matters most. Whether you're managing work tasks, personal projects, or leisure activities, TellMe keeps you organized, motivated, and moving forward with a clear direction. Transform your intentions into tangible results by staying productive every day.</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUX_XOSWEjSUBsRdwdVeOTqpo_9OYAoxN-g&s"alt="the image isn't open"/>
              
          </div>
          <div className='use2'>
          <p><strong className='strong'>✅ Personalized Daily Reflection</strong></p>
              <p>Tell Me encourages you to reflect on your daily <strong>achievements, challenges, and learnings.</strong> Each day, you are prompted to log your <strong>activities, goals, and thoughts,</strong> allowing them to see patterns over time. This helps identify what's working and where improvements are needed. By reviewing the progress regularly, individuals can adjust their strategies, stay motivated, and ensure they are continuously moving toward their long-term goals.</p>
              <img src="https://cdn-galdm.nitrocdn.com/FeUhUqcwbVOIFttokEalirKPFGIsbFrt/assets/images/optimized/rev-6b9f79d/www.excelsoftcorp.com/wp-content/uploads/2024/01/grami.png"alt='grami' width="100%"/>
              
          </div>
          <div className='use3'>
          <p><strong className='strong'>✅ Task Prioritization and Focus</strong></p>
              <p>Tell Me allows you to break down your larger goals into <strong >smaller, actionable tasks that they can track daily.</strong>  The app helps prioritize tasks based on importance or deadlines, ensuring that users focus on what matters most. This feature helps reduce overwhelm and keeps individuals on track by ensuring they’re always working toward tasks that have the biggest impact on their goals.</p>
              <img src="https://media.licdn.com/dms/image/v2/D4D12AQGiuWHhvE0epw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1722258235345?e=2147483647&v=beta&t=5PXMhiOliX_bOJLN7YdpbK-H-tavEBpFzgbxfORJt9k"alt="task" width="100%"/>
          </div>
        </div>
        <footer className='footer'id ='contact'>
          <p>Fop any queries or feedback, reach out to us at: <a href="http://www.lezih2500@gmail.com">contact@tellme.com</a></p>
        </footer>
    </div>

  )
}
export default HomePage;