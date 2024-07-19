import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Profilepage from './components/OtherExamples/Profilepage';
import Settingspage from './components/OtherExamples/Settingspage';
import ErrorPage from './components/OtherExamples/ErrorPage';
import Contents from './components/OtherExamples/Contents';
import Signup from './components/Cognito/Signup';
import Login from './components/Cognito/Login';
import ChangePassword from './components/Cognito/ChangePassword';
import { Account } from './components/Cognito/Account';
import Homepage from './components/OtherExamples/Homepage';
import ChangeEmail from './components/Cognito/ChangeEmail';
import Conformation from './components/Cognito/Conformation';

const App = () => {
  return (
    <Account>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/settings" element={<Settingspage />} />
          <Route path="/content/:id" element={<Contents />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/changeEmail" element={<ChangeEmail />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/conformation" element={<Conformation />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Account>
  );
};

export default App;
