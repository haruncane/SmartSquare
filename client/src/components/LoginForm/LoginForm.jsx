import React, { useContext, useState } from 'react';
import './loginForm.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apiCalls';

const LoginForm = () => {
  const [user, setUser] = useState({});
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  
  const handleLogin = () => {
    const email = user.email;
    const password = user.password;
    if (email && password) {
      login({ email, password }, dispatch);
    } else {
      alert("Please fill all the fields!");
    }
  };

  return (
    <div className='login-box'>
      <form className='login-form'>
        <label className='login-label'>Email</label>
        <label className='login-label'>Password</label>
        <input className='login-input' type="text" onChange={handleChange} name="email"/>
        <input className='login-input' type="password" onChange={handleChange} name="password"/>
      </form>
      <div className='login-btns'>
        <button className='login-btn'>Forgot Password</button>
        <button className='login-btn' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
};

export default LoginForm;