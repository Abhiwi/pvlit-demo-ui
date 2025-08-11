// // // import React from 'react';
// // // import { Home, Users, Folder, BarChart2, BookOpen, Stethoscope } from 'lucide-react';

// // // const Sidebar = () => {
// // //   return (
// // //     <div className="w-64 h-screen bg-[#15212d] text-white">
// // //       <div className="p-6">
// // //         <h1 className="text-2xl font-bold">DeepForrest</h1>
// // //       </div>
      
// // //       <nav className="mt-6">
// // //         <ul>
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/" className="flex items-center">
// // //               <Home className="mr-3" size={20} />
// // //               <span>Home</span>
// // //             </a>
// // //           </li>
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/admin" className="flex items-center">
// // //               <Users className="mr-3" size={20} />
// // //               <span>Admin</span>
// // //             </a>
// // //           </li>
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/cases" className="flex items-center">
// // //               <Folder className="mr-3" size={20} />
// // //               <span>Cases</span>
// // //             </a>
// // //           </li>
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/dashboard" className="flex items-center">
// // //               <BarChart2 className="mr-3" size={20} />
// // //               <span>Dashboard</span>
// // //             </a>
// // //           </li>
// // //           {/* New added menu items */}
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/literature-review" className="flex items-center">
// // //               <BookOpen className="mr-3" size={20} />
// // //               <span>Literature Review</span>
// // //             </a>
// // //           </li>
// // //           <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// // //             <a href="/medical-review" className="flex items-center">
// // //               <Stethoscope className="mr-3" size={20} />
// // //               <span>Medical Review</span>
// // //             </a>
// // //           </li>
// // //         </ul>
// // //       </nav>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;
// // import React from 'react';
// // import { Home, Users, Folder, BarChart2, BookOpen, Stethoscope } from 'lucide-react';

// // const Sidebar = () => {
// //   return (
// //     <div className="flex flex-col h-screen">
// //       {/* Fixed Header */}
// //       <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-[#14242c] text-white h-16 px-6">
// //   <div className="flex items-center">
// //     <img src="/logodark.png" alt="Logo" className="h-12 w-auto mr-4" />
// //   </div>
// // </header>

// //       {/* Main content with sidebar */}
// //       <div className="flex pt-16 h-full">
// //         {/* Sidebar */}
// //         <div className="w-64 h-full bg-[#14242c] text-white">
// //           <nav className="mt-6">
// //             <ul>
// //               <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// //                 <a href="/" className="flex items-center">
// //                   <Home className="mr-3" size={20} />
// //                   <span>Home</span>
// //                 </a>
// //               </li>

// //               <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// //                 <a href="/cases" className="flex items-center">
// //                   <Folder className="mr-3" size={20} />
// //                   <span>Cases</span>
// //                 </a>
// //               </li>
// //               <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// //                 <a href="/dashboard" className="flex items-center">
// //                   <BarChart2 className="mr-3" size={20} />
// //                   <span>Upload</span>
// //                 </a>
// //               </li>
// //               <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// //                 <a href="/literature-review" className="flex items-center">
// //                   <BookOpen className="mr-3" size={20} />
// //                   <span>Literature Review</span>
// //                 </a>
// //               </li>
// //               <li className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
// //                 <a href="/medical-review" className="flex items-center">
// //                   <Stethoscope className="mr-3" size={20} />
// //                   <span>Medical Review</span>
// //                 </a>
// //               </li>
// //             </ul>
// //           </nav>
// //         </div>
        
   
       
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React from 'react';
// import { Home, Folder, BarChart2, BookOpen, Stethoscope } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//   const { user } = useAuth();

//   // Define accessible routes based on roleId
//   const getAccessibleRoutes = () => {
//     if (!user) return [];
//     const routes = [
//       { path: '/', label: 'Home', icon: Home },
//     ];

//     if (user.roleId === 1) {
//       routes.push(
//         { path: '/cases', label: 'Cases', icon: Folder },
//         { path: '/dashboard', label: 'Upload', icon: BarChart2 },
//         { path: '/literature-review', label: 'Literature Review', icon: BookOpen }
//       );
//     } else if (user.roleId === 2) {
//       routes.push({ path: '/medical-review', label: 'Medical Review', icon: Stethoscope });
//     }

//     return routes;
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-[#14242c] text-white h-16 px-6">
//         <div className="flex items-center">
//           <img src="/logodark.png" alt="Logo" className="h-12 w-auto mr-4" />
//         </div>
//       </header>

//       <div className="flex pt-16 h-full">
//         <div className="w-64 h-full bg-[#14242c] text-white">
//           <nav className="mt-6">
//             <ul>
//               {getAccessibleRoutes().map((route) => (
//                 <li key={route.path} className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer">
//                   <a href={route.path} className="flex items-center">
//                     <route.icon className="mr-3" size={20} />
//                     <span>{route.label}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useState } from 'react';
// import { Home, Folder, BarChart2, BookOpen, Stethoscope } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const routes = [
//     { path: '/', label: 'Home', icon: Home, allowedRoles: [1, 2] },
//     { path: '/cases', label: 'Cases', icon: Folder, allowedRoles: [1] },
//     { path: '/dashboard', label: 'Upload', icon: BarChart2, allowedRoles: [1] },
//     { path: '/literature-review', label: 'Literature Review', icon: BookOpen, allowedRoles: [1] },
//     { path: '/medical-review', label: 'Medical Review', icon: Stethoscope, allowedRoles: [2] }
//   ];

//   const handleNavigation = (path, allowedRoles) => {
//     if (user && allowedRoles.includes(user.roleId)) {
//       setError('');
//       navigate(path);
//     } else {
//       setError('Access Denied: You do not have permission to access this page.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-[#14242c] text-white h-16 px-6">
//         <div className="flex items-center">
//           <img src="/logodark.png" alt="Logo" className="h-12 w-auto mr-4" />
//         </div>
//       </header>
//       <div className="flex pt-16 h-full">
//         <div className="w-64 h-full bg-[#14242c] text-white">
//           {error && (
//             <div className="px-6 py-2 bg-red-600 text-white text-sm">
//               {error}
//             </div>
//           )}
//           <nav className="mt-6">
//             <ul>
//               {routes.map((route) => (
//                 <li
//                   key={route.path}
//                   className="px-6 py-3 hover:bg-[#1e2b3a] cursor-pointer"
//                   onClick={() => handleNavigation(route.path, route.allowedRoles)}
//                 >
//                   <div className="flex items-center">
//                     <route.icon className="mr-3" size={20} />
//                     <span>{route.label}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Home, Folder, BarChart2, BookOpen, Stethoscope, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const routes = [
    { path: '/', label: 'Home', icon: Home, allowedRoles: [1, 2] },
    { path: '/cases', label: 'Cases', icon: Folder, allowedRoles: [1] },
   
    { path: '/literature-review', label: 'Literature Review', icon: BookOpen, allowedRoles: [1] },
    { path: '/medical-review', label: 'Medical Review', icon: Stethoscope, allowedRoles: [2] },
  ];

  const handleNavigation = (path, allowedRoles) => {
    if (user && allowedRoles.includes(user.roleId)) {
      setError('');
      navigate(path);
    } else {
      setError('Access Denied: You do not have permission to access this page.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Failed to log out. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Filter routes based on user's roleId
  const filteredRoutes = user ? routes.filter((route) => route.allowedRoles.includes(user.roleId)) : [];

  return (
    <div className="flex flex-col h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-[#fff] text-white h-16 px-6">
        <div className="flex items-center">
          <img src="/emcurelogo.jpg" alt="Logo" className="h-12 w-auto mr-4" />
        </div>
      </header>
      <div className="flex pt-16 h-full">
        <div className="w-64 h-full bg-[#14242c] text-white">
          {error && (
            <div className="px-6 py-2 bg-red-600 text-white text-sm">
              {error}
            </div>
          )}
          <nav className="mt-6">
            <ul>
              {filteredRoutes.map((route) => (
                <li
                  key={route.path}
                  className="px-6 py-3 hover:bg-[#1e293b] cursor-pointer"
                  onClick={() => handleNavigation(route.path, route.allowedRoles)}
                >
                  <div className="flex items-center">
                    <route.icon className="mr-3" size={20} />
                    <span>{route.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          {/* Logout Button */}
          <div
            className="mt-auto px-6 py-3 hover:bg-[#1e293b] cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <LogOut className="mr-3" size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;