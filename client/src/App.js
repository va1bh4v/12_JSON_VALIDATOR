import logo from './logo.svg';
import './App.css';
import Loginpage from './components/LoginPage';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import SignupPage from './components/SignupPage';
import UserPage from './components/UserPage';
import ProjectPage from './components/ProjectPage';
import Stage5 from './components/stage5';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<Loginpage />} />
        <Route path="singup" element={<SignupPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="project" element={<ProjectPage />} />
        <Route path="stage5" element={<Stage5 />} />



      </Routes>
    </BrowserRouter>);
}


export default App;
