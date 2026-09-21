function ProductCard({ product, onAddToCart }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  const imageBaseUrl = API_BASE_URL.replace('/api', '');

  return (
    <div className="product-card">
      {product.imageUrl && (
        <img
          src={`${imageBaseUrl}${product.imageUrl}`}
          alt={product.name}
          className="product-image"
        />
      )}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-price">₹{product.price.toFixed(2)}</span>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={!product.available}
        >
          {product.available ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;