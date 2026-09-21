import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    try {
      let response;
      if (filter === 'all') {
        response = await ordersAPI.getAll();
      } else if (filter === 'pending') {
        response = await ordersAPI.getByStatus('PENDING');
      } else if (filter === 'confirmed') {
        response = await ordersAPI.getByStatus('CONFIRMED');
      } else if (filter === 'delivered') {
        response = await ordersAPI.getByStatus('DELIVERED');
      } else if (filter === 'payment-pending') {
        response = await ordersAPI.getByPaymentStatus('PENDING');
      } else if (filter === 'payment-verified') {
        response = await ordersAPI.getByPaymentStatus('VERIFIED');
      }
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleUpdatePaymentStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updatePaymentStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await ordersAPI.delete(orderId);
        loadOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-management">
      <div className="page-header">
        <h1>Order Management</h1>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending Orders</option>
            <option value="confirmed">Confirmed Orders</option>
            <option value="delivered">Delivered Orders</option>
            <option value="payment-pending">Payment Pending</option>
            <option value="payment-verified">Payment Verified</option>
          </select>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-orders">No orders found</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id.substring(0, 8)}...</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhone}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="action-btn view-btn"
                      onClick={() => viewOrderDetails(order)}
                    >
                      View
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content order-details-modal">
            <button className="modal-close" onClick={closeOrderDetails}>×</button>
            <h2>Order Details</h2>
            
            <div className="order-details">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
              </div>

              <div className="detail-section">
                <h3>Order Items</h3>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>₹{item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items data available</p>
                )}
                <p className="order-total"><strong>Total: ₹{selectedOrder.totalAmount.toFixed(2)}</strong></p>
              </div>

              <div className="detail-section">
                <h3>Payment Information</h3>
                <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Status:</strong> {selectedOrder.paymentStatus}</p>
                {selectedOrder.paymentScreenshot && (
                  <div className="payment-screenshot">
                    <strong>Payment Screenshot:</strong>
                    <img
                      src={`http://localhost:8080${selectedOrder.paymentScreenshot}`}
                      alt="Payment Screenshot"
                      className="screenshot-image"
                    />
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>Update Status</h3>
                <div className="status-actions">
                  <div className="status-group">
                    <label>Order Status:</label>
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PREPARING">Preparing</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <div className="status-group">
                    <label>Payment Status:</label>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) => handleUpdatePaymentStatus(selectedOrder.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="VERIFIED">Verified</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;