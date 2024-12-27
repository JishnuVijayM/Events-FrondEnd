import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Index from './pages/layout/Index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Index />} />
    </Routes>
  );
}

export default App;
