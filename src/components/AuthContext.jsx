import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  const handleUserRegistration = (user) => {
    setRegisteredUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, user];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers)); 
      return updatedUsers;
    });
    setUserData(user);
  };

  const handleLogin = (email, password) => {
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
      setUserData(user);
    } else {
      throw new Error('Invalid credentials'); 
    }
  };

  const handleLogout = () => {
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ registeredUsers, userData, handleUserRegistration, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};