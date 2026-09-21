import { useState } from 'react';
import { ordersAPI } from '../services/api';

function CartModal({ isOpen, onClose, cart, onUpdateQuantity, onRemove, total }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentScreenshot(file);
  };

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      setError('Please fill in all customer details');
      return;
    }

    if (!paymentScreenshot) {
      setError('Please upload payment screenshot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('customerName', customerName);
      formData.append('customerPhone', customerPhone);
      formData.append('customerAddress', customerAddress);
      formData.append('items', JSON.stringify(cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      }))));
      formData.append('totalAmount', total);
      formData.append('paymentMethod', 'PhonePay');
      formData.append('paymentScreenshot', paymentScreenshot);

      await ordersAPI.create(formData);
      setOrderPlaced(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
        setPaymentScreenshot(null);
        setOrderPlaced(false);
      }, 3000);
    } catch (error) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Your Cart</h2>
        
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <strong>Total: ₹{total.toFixed(2)}</strong>
            </div>

            {!showPaymentQR && !orderPlaced && (
              <button
                className="proceed-payment-btn"
                onClick={() => setShowPaymentQR(true)}
              >
                Proceed to Payment
              </button>
            )}

            {showPaymentQR && !orderPlaced && (
              <div className="payment-section">
                <h3>Payment via PhonePay</h3>
                
                <div className="qr-section">
                  <p>Scan the QR code to pay ₹{total.toFixed(2)}</p>
                  <div className="qr-placeholder">
                    {/* Add your PhonePay QR code image here */}
                    <img 
                      src="/phonepay-qr.png" 
                      alt="PhonePay QR Code"
                      className="qr-code"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="qr-fallback" style={{display: 'none'}}>
                      <p>PhonePay QR Code</p>
                      <p>Place your QR code image at: public/phonepay-qr.png</p>
                    </div>
                  </div>
                </div>

                <div className="customer-details">
                  <h4>Customer Details</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="form-input"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="form-input"
                    rows="3"
                  />
                </div>

                <div className="payment-proof">
                  <h4>Upload Payment Screenshot</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  {paymentScreenshot && (
                    <p className="file-selected">Selected: {paymentScreenshot.name}</p>
                  )}
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            )}

            {orderPlaced && (
              <div className="order-success">
                <h3>Order Placed Successfully!</h3>
                <p>Thank you for your order. We will contact you shortly.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;