function CategoryCard({ category, onSelect }) {
  return (
    <button
      key={category}
      type="button"
      className="category-card"
      onClick={() => onSelect(category)}
    >
      <span className="category-image" aria-hidden="true" />
      <strong>{category}</strong>
      <small>Explore</small>
    </button>
  )
}

export default CategoryCard
