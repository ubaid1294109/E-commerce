function Header({ cartCount }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">S</div>
        <div>
          <p className="brand-name">Stellar</p>
          <span className="brand-tag">Market</span>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#new">New In</a>
        <a href="#shop">Shop</a>
        <a href="#collections">Collections</a>
        <a href="#journal">Journal</a>
      </nav>

      <div className="nav-actions">
        <button className="nav-link-button" type="button">
          Search
        </button>
        <button className="nav-link-button" type="button">
          Account
        </button>
        <button className="cart-button" type="button">
          Cart <span>{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
