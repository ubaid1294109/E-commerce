const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchProducts(category = 'All', search = '') {
  const params = new URLSearchParams();

  if (category && category !== 'All') {
    params.append('category', category);
  }

  if (search) {
    params.append('search', search);
  }

  const response = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/api/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}
