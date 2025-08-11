// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import LoginPage from './components/LoginPage';
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Cases from './pages/Cases';
// import Dashboard from './pages/Dashboard';
// import LiteratureReview from './pages/LiteratureReview';
// import MedicalReview from './pages/MedicalReview';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, user, loading } = useAuth();
//   if (loading) return <div>Loading...</div>;
//   if (!isAuthenticated || !user) return <Navigate to="/login" />;
//   if (allowedRoles && !allowedRoles.includes(user.roleId)) return <Navigate to="/" />;
//   return children;
// };

// const AppRoutes = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/" element={<ProtectedRoute allowedRoles={[1, 2]}><Layout><Home /></Layout></ProtectedRoute>} />
//           <Route path="/cases" element={<ProtectedRoute allowedRoles={[1]}><Layout><Cases /></Layout></ProtectedRoute>} />
//           <Route path="/dashboard" element={<ProtectedRoute allowedRoles={[1]}><Layout><Dashboard /></Layout></ProtectedRoute>} />
//           <Route path="/literature-review" element={<ProtectedRoute allowedRoles={[1]}><Layout><LiteratureReview /></Layout></ProtectedRoute>} />
//           <Route path="/medical-review" element={<ProtectedRoute allowedRoles={[2]}><Layout><MedicalReview /></Layout></ProtectedRoute>} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default AppRoutes;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Dashboard from './pages/Dashboard';
import LiteratureReview from './pages/LiteratureReview';
import MedicalReview from './pages/MedicalReview';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleId)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const RootRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Redirect to /login if not authenticated, otherwise to /home
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootRoute />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cases"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <Layout>
                  <Cases />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/literature-review"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <Layout>
                  <LiteratureReview />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-review"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <Layout>
                  <MedicalReview />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;