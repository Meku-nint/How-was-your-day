import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount.jsx';
import Homepage from './pages/HomePage.jsx';
import LoginAuthentication from './pages/LoginAuthentication.jsx';
import NotFound from './pages/NotFound.jsx';
import User from './pages/User.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/login' element={<LoginAuthentication />} />
          <Route path='/user'element={<User/>}/>
          <Route path='/forget'element={<ForgotPassword/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;