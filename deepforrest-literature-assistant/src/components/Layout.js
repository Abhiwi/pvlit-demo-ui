// import React from 'react';
// import Sidebar from './Sidebar';

// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen bg-darkblue">



//       <Sidebar />
//       <div className="flex-1 overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-darkblue">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;