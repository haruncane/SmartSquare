import React, { useState } from 'react';
import './welcomePage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const WelcomePage = () => {
  const [selection, setSelection] = useState(0);

  const handleSelection = (e) => {
    setSelection(e);
  };

  return (
    <div className='welcomePage'>
        <div className="welcome-box">
            <div className="title-box">
                <label className='welcome-tittle'>SmartSquare</label>
            </div>
            <div className="selection-box">
              {selection === 0 && 
                <>
                  <button className='welcome-btn' onClick={() => handleSelection(1)}>LOGIN</button>
                  <button className='welcome-btn' onClick={() => handleSelection(2)}>REGISTER</button>
                </>
              }
              {selection === 1 && <LoginForm />}
              {selection === 2 && <RegisterForm />}
            </div>
        </div>
    </div>
  )
}

export default WelcomePage;