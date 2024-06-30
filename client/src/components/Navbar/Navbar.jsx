import React, { useContext, useState } from 'react';
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import { addCategory, getUser } from '../../context/authContext/apiCalls';

export default function Navbar({ setCategory }) {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [isModal, setIsModal] = useState(false);
  const [newCategory, setNewCategory] = useState();

  const categoryOptions = user.categories.sort((a, b) => a.localeCompare(b)) || [];

  const navigateToHome = () => {
    navigate('/')
  }
  const navigateToFavorites = () => {
    navigate('/favorites')
  }
  const navigateToAccount = () => {
    navigate('/account')
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "addCategory") {
      setIsModal(true);
    } else {
      setCategory(value);
    }
  };

  const handleNewCategory = async () => {
    if (newCategory) {
      await addCategory(user, newCategory, dispatch);
      const userId = user?._id;
      await getUser(userId, dispatch);
      setIsModal(false);
    } else {
      alert("Fill the blank!");
    }
  };

  const closeModal = () => {
    setIsModal(false);
    setCategory(null);
  };

  return (
    <div className='navbar'>
        <div className="navbar-left">
          <label className='navbar-label'>SmartSquare</label>
          <label className='navbar-label' onClick={navigateToHome}>Ask a Question</label>
        </div>
        <div className="navbar-mid">
          <select 
            className='navbar-menu' 
            name='category'
            id="category"
            onChange={handleSelect}
          >
            <option value={"null"}>
              CATEGORIES
            </option>
            {categoryOptions?.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
            <option value={"addCategory"}>
              Add Category
            </option>
          </select>
        </div>
        <div className="navbar-right">
          <label className='navbar-label' onClick={navigateToFavorites}>Favorites</label>
          <label className='navbar-label profile-menu'>Profile
            <div className='drop-menu'>
              <span onClick={navigateToAccount}>Account</span>
              <hr className='drop-menu-sperator'/>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </label>
        </div>
        {isModal && (
          <div className="modal">
            <div className="modal-box">
              <label className='modal-title'>Add New Category</label>
              <input type="text" className='modal-input' placeholder='Category Name' spellCheck="false" onChange={handleChange} />
              <div className="modal-btns">
                <button className="modal-btn" onClick={closeModal}>Exit</button>
                <button className="modal-btn" onClick={handleNewCategory}>Add</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
