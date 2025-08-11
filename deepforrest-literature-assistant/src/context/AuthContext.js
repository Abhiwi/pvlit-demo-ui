// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await api.get('/verify');
//         setUser(response.data);
//         setIsAuthenticated(true);
//       } catch (err) {
//         console.error('Token verification failed:', err.response?.data || err.message);
//         setIsAuthenticated(false);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     verifyToken();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await api.post('/login', { username, password });
//       setUser(response.data);
//       setIsAuthenticated(true);
//       return true;
//     } catch (err) {
//       console.error('Login failed:', err.response?.data || err.message);
//       throw err;
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post('/logout');
//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (err) {
//       console.error('Logout failed:', err.response?.data || err.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get('/verify');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Token verification failed:', err.response?.data || err.message);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      setUser(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);