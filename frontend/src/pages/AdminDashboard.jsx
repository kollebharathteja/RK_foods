import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-menu">
        <Link to="/admin/products" className="admin-card">
          <h2>Product Management</h2>
          <p>Add, edit, and remove products</p>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <h2>Order Management</h2>
          <p>View and manage customer orders</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;