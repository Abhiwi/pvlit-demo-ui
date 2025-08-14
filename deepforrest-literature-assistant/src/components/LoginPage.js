// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { motion } from 'framer-motion';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       await login(username, password);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !isLoading) {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
//         <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/literature-background.gif')", filter: "blur(2px)" }}></div>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md rounded-lg bg-white bg-opacity-90 p-8 shadow-xl z-20 backdrop-filter backdrop-blur-sm"
//       >
//         <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="mb-8 flex justify-center">
//           <img src="/logo11.png" alt="DeepForrest Logo" className="h-20" />
//         </motion.div>
//         <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8 text-center text-2xl font-bold" style={{ color: '#14242c' }}>
//           Welcome to Literature Assistant
//         </motion.h1>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             className="mb-6 rounded bg-red-50 p-3 text-red-700 border-l-4 border-red-500"
//           >
//             {error}
//           </motion.div>
//         )}
//         <div>
//           <div className="mb-6">
//             <label className="mb-2 block text-sm font-medium" style={{ color: '#14242c' }} htmlFor="username">Username</label>
//             <div className="relative">
//               <input
//                 id="username"
//                 type="text"
//                 className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:outline-none focus:ring"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Enter your username"
//               />
//               <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//           </div>
//           <div className="mb-8">
//             <label className="mb-2 block text-sm font-medium" style={{ color: '#14242c' }} htmlFor="password">Password</label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type="password"
//                 className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:outline-none focus:ring"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Password"
//               />
//               <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//           </div>
//           <motion.button
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             type="submit"
//             disabled={isLoading}
//             onClick={handleSubmit}
//             className="w-full rounded-md py-3 px-4 text-white font-medium transition-all duration-300 transform hover:scale-105"
//             style={{ backgroundColor: '#14242c' }}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Logging in...
//               </span>
//             ) : (
//               'Log In'
//             )}
//           </motion.button>
//         </div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="mt-8"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white bg-opacity-75 text-gray-500">Literature Assistant</span>
//             </div>
//           </div>
//           <div className="mt-6 flex justify-center space-x-6">
//             <div className="text-xs text-gray-600">Unlock knowledge</div>
//             <div className="text-xs text-gray-600">Discover insights</div>
//             <div className="text-xs text-gray-600">Transform research</div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F0F0F0] px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-sm sm:max-w-md rounded-xl bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#6F7D7D]/20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/logo11.png"
            alt="Pharmacovigilance Assistant Logo"
            className="h-14 sm:h-16"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 text-center text-xl sm:text-2xl font-semibold text-[#2A1F2D]"
        >
          Pharmacovigilance Assistant
        </motion.h1>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="mb-6 rounded-md bg-[#C8D96F]/10 p-3 text-[#2A1F2D] border-l-4 border-[#C8D96F] text-sm"
          >
            {error}
          </motion.div>
        )}
        <div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-medium text-[#6F7D7D]"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                className="w-full rounded-md border border-[#6F7D7D]/20 bg-white p-3 pl-11 text-[#2A1F2D] focus:border-[#1483F8] focus:ring-2 focus:ring-[#1483F8]/30 focus:outline-none transition-all duration-300 ease-in-out placeholder-[#6F7D7D]/50 text-sm sm:text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your username"
                aria-label="Username"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-[#6F7D7D]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <div className="mb-8">
            <label
              className="mb-2 block text-sm font-medium text-[#6F7D7D]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-[#6F7D7D]/20 bg-white p-3 pl-11 text-[#2A1F2D] focus:border-[#1483F8] focus:ring-2 focus:ring-[#1483F8]/30 focus:outline-none transition-all duration-300 ease-in-out placeholder-[#6F7D7D]/50 text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                aria-label="Password"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-[#6F7D7D]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full rounded-md bg-[#1483F8] py-3 px-4 text-white font-medium hover:bg-[#2A1F2D] focus:ring-2 focus:ring-[#1483F8]/40 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="text-sm font-medium text-[#6F7D7D]">
            Pharmacovigilance AI Assistant
          </div>
          <div className="mt-3 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
            <div className="text-xs text-[#6F7D7D]">Ensure Drug Safety</div>
            <div className="text-xs text-[#6F7D7D]">Monitor Adverse Events</div>
            <div className="text-xs text-[#6F7D7D]">Support Compliance</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;