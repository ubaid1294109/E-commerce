function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className={`product-visual ${product.color}`}>
        <span className="product-tag">{product.tag}</span>
      </div>

      <div className="product-details">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="rating">★ {product.rating}</span>
        </div>

        <h3>{product.name}</h3>

        <div className="price-row">
          <strong>${product.price}</strong>
          <span>${product.oldPrice}</span>
        </div>

        <button type="button" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
