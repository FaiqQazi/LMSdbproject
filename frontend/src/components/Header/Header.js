import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/adminAction';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to update the current time every second
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    // Set an interval to update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Initialize the time when the component mounts
    updateTime();

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that useEffect runs only once on mount

  const headingStyles = {
    color: 'blue',
    fontSize: '24px',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  };

  return (
    <div className="header">
      <div className="time">{currentTime}</div>
      <h1 style={headingStyles}>NUST</h1>
      <div className="header-right">
        <button className="logout" onClick={logoutHandler}>
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Header;
