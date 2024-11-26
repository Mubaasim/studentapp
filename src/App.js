import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Layout from './components/Layout';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
import UserDetails from './components/userdetails/UserDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/userdetails" element={<UserDetails />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
