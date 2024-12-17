import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {useState, useEffect } from 'react';
import './App.css';
//import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const createUser =  async (user) => {
          const requestBody = user

          const result = await fetch("http://127.0.0.1:8080/api/auth/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          }) 
        } 
  

  return (
   <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/register" element={<RegisterPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App;
