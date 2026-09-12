import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { fetchCategories, fetchProducts } from './api'
import Header from './components/Header'
import CategoryCard from './components/CategoryCard'
import ProductCard from './components/ProductCard'

const fallbackCategories = ['All', 'Women', 'Men', 'Accessories', 'Home']

const promoCards = [
  { title: 'Free shipping', text: 'On orders over $75', icon: '✈' },
  { title: 'Easy returns', text: '30-day hassle-free', icon: '↺' },
  { title: 'Secure payment', text: 'Protected checkout', icon: '✓' },
]

const collections = [
  { title: 'Spring Edit', subtitle: 'Fresh layers & soft tones', accent: 'warm' },
  { title: 'Urban Essentials', subtitle: 'Built for everyday movement', accent: 'cool' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(fallbackCategories)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(activeCategory, searchTerm),
          fetchCategories(),
        ])

        setProducts(productsData)
        setCategories(['All', ...categoriesData])
      } catch (error) {
        console.error('Failed to load data:', error)
        setProducts([])
        setCategories(fallbackCategories)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [activeCategory, searchTerm])

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)

      return matchesSearch
    })
  }, [products, searchTerm])

  const handleAddToCart = () => {
    setCartCount((count) => count + 1)
  }

  return (
    <div className="page-shell">
      <Header cartCount={cartCount} />

      <main>
        <section className="hero" id="new">
          <div className="hero-copy">
            <p className="eyebrow">Modern essentials</p>
            <h1>Upgrade your everyday style.</h1>
            <p className="hero-text">
              Discover premium fashion, home upgrades, and smart accessories curated for a life
              that feels polished and effortless.
            </p>

            <div className="cta-row">
              <button className="primary-button" type="button">
                Shop Collection
              </button>
              <button className="secondary-button" type="button">
                Explore Deals
              </button>
            </div>

            <div className="stats-row">
              <div>
                <strong>25K+</strong>
                <span>Happy shoppers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>2 day</strong>
                <span>Fast dispatch</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card main-panel">
              <div className="mini-pill">Trending now</div>
              <div className="product-preview">
                <div className="preview-figure" aria-hidden="true" />
                <div className="preview-info">
                  <span className="preview-label">Featured drop</span>
                  <h3>Vela Lounge Set</h3>
                  <p>$128</p>
                </div>
              </div>
            </div>
            <div className="visual-card floating-card card-one">
              <span>New Season</span>
              <strong>30% off</strong>
            </div>
            <div className="visual-card floating-card card-two">
              <span>Best seller</span>
              <strong>4.9 stars</strong>
            </div>
          </div>
        </section>

        <section className="promo-strip">
          {promoCards.map((promo) => (
            <div key={promo.title} className="promo-item">
              <div className="promo-icon" aria-hidden="true">
                {promo.icon}
              </div>
              <div>
                <h4>{promo.title}</h4>
                <p>{promo.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="category-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Browse by style</p>
              <h2>Popular categories</h2>
            </div>
            <a href="#">View all</a>
          </div>

          <div className="category-grid">
            {categories
              .filter((category) => category !== 'All')
              .map((category) => (
                <button
                  key={category}
                  type="button"
                  className="category-card"
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="category-image" aria-hidden="true" />
                  <strong>{category}</strong>
                  <small>Explore</small>
                </button>
              ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated picks</p>
              <h2>Featured products</h2>
            </div>
            <div className="product-controls">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
              />
              <div className="filter-chips">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={activeCategory === category ? 'chip active' : 'chip'}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-grid">
            {loading ? (
              <p className="status-message">Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p className="status-message">No products found for this search.</p>
            )}
          </div>
        </section>

        <section className="collection-section" id="collections">
          {collections.map((collection) => (
            <article key={collection.title} className={`collection-card ${collection.accent}`}>
              <div>
                <p className="eyebrow">Collection</p>
                <h3>{collection.title}</h3>
                <p>{collection.subtitle}</p>
              </div>
              <button type="button">Shop now</button>
            </article>
          ))}
        </section>

        <section className="newsletter-section" id="journal">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h2>Get style drops and exclusive offers.</h2>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" aria-label="Email address" />
            <button type="submit">Join now</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="brand-name">Stellar Market</p>
          <span>Curated for modern living.</span>
        </div>
        <div className="footer-links">
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Support</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  )
}

export default App
