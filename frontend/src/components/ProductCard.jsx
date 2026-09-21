function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      {product.imageUrl && (
        <img
          src={`http://localhost:8080${product.imageUrl}`}
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