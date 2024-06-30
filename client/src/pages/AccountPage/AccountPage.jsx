import React, { useContext } from 'react';
import './accountPage.css';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../context/authContext/AuthContext';
import { deleteUser } from './../../context/authContext/apiCalls';

const AccountPage = () => {
  const { dispatch } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = () => {
    const userId = user?._id;
    const isConfirmed = window.confirm("Are you sure you want to DELETE the user?");
    if (isConfirmed && userId) {
      deleteUser(userId, dispatch);
    }
  };
    
  return (
    <div className='accountPage'>
        <Navbar />
        <div className="account-box">
            <label className='account-title'>ACCOUNT DETAILS</label>
            <hr className='account-line' />
            <div className='account-info'>
              <label className='account-label'>First Name:</label>
              <label className='account-label'>{user?.firstName}</label>
              <label className='account-label'>Last Name:</label>
              <label className='account-label'>{user?.lastName}</label>
              <label className='account-label'>Email:</label>
              <label className='account-label'>{user?.email}</label>
            </div>
            <hr className='account-line' />
            <button className='account-delete-btn' onClick={handleDelete}>Delete Account</button>
        </div>
    </div>
  )
}

export default AccountPage;