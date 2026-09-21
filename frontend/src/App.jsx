import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/products" 
            element={isAuthenticated ? <ProductManagement /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/orders" 
            element={isAuthenticated ? <OrderManagement /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;