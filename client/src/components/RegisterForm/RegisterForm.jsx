import React, { useContext, useState } from 'react';
import './registerForm.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { register } from '../../context/authContext/apiCalls';

const RegisterForm = () => {
  const [user, setUser] = useState({});
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleRegister = () => {
    const password = user.password;
    const rePassword = user.rePassword;
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    if (password === rePassword) {
      register({ email, password, firstName, lastName }, dispatch);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className='register-box'>
      <form className="register-form">
        <label className='register-label'>First Name</label>
        <label className='register-label'>Password</label>
        <input className='register-input' type="text" onChange={handleChange} name="firstName"/>
        <input className='register-input' type="password" onChange={handleChange} name="password"/>
        <label className='register-label'>Last Name</label>
        <label className='register-label'>Re-Enter Password</label>
        <input className='register-input' type="text" onChange={handleChange} name="lastName"/>
        <input className='register-input' type="password" onChange={handleChange} name="rePassword"/>
        <label className='register-label'>Email</label>
        <div></div>
        <input className='register-input' type="text" onChange={handleChange} name="email"/>
        <div></div>
      </form>
        <button className='register-btn' onClick={handleRegister}>Register</button>
    </div>
  )
}

export default RegisterForm;