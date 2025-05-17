import React, { createContext, useState, useContext, useEffect } from 'react';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
      const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);
      const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userType'));


      useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        const storedUserData = localStorage.getItem('userData');
        if (storedUserType) {
          setUserType(storedUserType);
          setIsAuthenticated(true);
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        } else {
          setIsAuthenticated(false);
        }
      }, []);

      const login = (type, details = {}) => {
        localStorage.setItem('userType', type);
        localStorage.setItem('userData', JSON.stringify(details));
        setUserType(type);
        setUserData(details);
        setIsAuthenticated(true);
      };

      const logout = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('userData');
        setUserType(null);
        setUserData(null);
        setIsAuthenticated(false);
      };

      return (
        <AuthContext.Provider value={{ userType, userData, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };