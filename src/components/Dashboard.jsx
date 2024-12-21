import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, handleLogout } = useAuth(); 

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('ru-RU', options).replace(',', '');
  };

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate('/login'); 
  };

  return (
    <div className="flex justify-center items-start min-h-screen px-4"> 
      <div className="prose p-6 bg-white rounded w-full max-w-xl">
        <div className="flex justify-between items-center mb-2"> 
          <p className="text-lg font-bold">Hello, {userData ? userData.email : 'Guest'}!</p>
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className={`mr-4 text-black hover:text-blue-600 no-underline ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
            >
              About Me
            </Link>
            <Link 
              to="/notes" 
              className={`mr-4 text-black hover:text-blue-600 no-underline ${location.pathname === '/notes' ? 'font-bold' : ''}`}
            >
              Notes
            </Link>
            <button 
              onClick={handleLogoutClick} 
              className="text-black hover:text-blue-600 focus:outline-none"
            >
              Log Out
            </button>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold mb-2">About Me</h2> 

        {userData ? (
          <>
            <p className="text-center text-lg font-bold">Email: {userData.email}</p>
            <p className="text-center text-lg">{`Registration Date: ${formatDate(userData.registrationDate)}`}</p>
            <div className="text-center mt-2"> 
              <Link to="/notes" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Go to Notes
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;