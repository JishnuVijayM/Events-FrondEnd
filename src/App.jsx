import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Index from './pages/layout/Index';
import AuthLayout from './pages/auth/AuthLayout';
import ForgotPassword from './pages/auth/ForgotPassword';
import Resetpassword from './pages/auth/Resetpassword';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Toaster />

      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<Resetpassword />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute token={token}>
              <Index />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;