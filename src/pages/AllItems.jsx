import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// Comprehensive mock database
const MOCK_PRODUCTS = [
  { id: 'v1', category: 'Vegetables', name: 'Fresh Onion (Pyaz)', price: 0.49, oldPrice: 0.59, weight: '1 kg', popular: true, img: '/images/product_onion.png' },
  { id: 'v2', category: 'Vegetables', name: 'Tomato (Tamatar) - Hybrid', price: 0.39, weight: '500 g', popular: true, img: '/images/product_tomato.png' },
  { id: 'v3', category: 'Vegetables', name: 'Potato (Aloo)', price: 0.59, oldPrice: 0.69, weight: '1 kg', popular: false, img: '/images/product_potato.png' },
  { id: 'v4', category: 'Vegetables', name: 'Coriander Leaves (Dhaniya)', price: 0.15, weight: '100 g', popular: false, img: '/images/product_coriander.png' },
  { id: 'f1', category: 'Fruits', name: 'Organic Bananas', price: 0.79, weight: '1 kg', popular: true, img: '/images/product_banana.png' },
  { id: 'f2', category: 'Fruits', name: 'Crisp Red Apples', price: 1.49, oldPrice: 1.79, weight: '1 kg', popular: true, img: '/images/product_apple.png' },
  { id: 's1', category: 'Snacks', name: 'Lays India\'s Magic Masala Chips', price: 0.25, weight: '50 g', popular: true, img: '/images/product_lays.png' },
  { id: 's2', category: 'Snacks', name: 'Kurkure Masala Munch', price: 0.25, weight: '90 g', popular: false, img: '/images/product_kurkure.png' },
  { id: 's3', category: 'Snacks', name: 'Doritos Nacho Cheese', price: 0.69, oldPrice: 0.79, weight: '130 g', popular: true, img: '/images/product_doritos.png' },
  { id: 'd1', category: 'Dairy', name: 'Amul Taaza Milk', price: 0.35, weight: '500 ml', popular: true, img: '/images/product_milk.png' },
  { id: 'dr1', category: 'Drinks', name: 'Thums Up', price: 0.49, weight: '750 ml', popular: true, img: '/images/product_drink.png' }
];

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Snacks', 'Dairy', 'Drinks'];

export default function AllItems() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high'

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen pt-4 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl mt-2 font-extrabold text-gray-900 tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory === 'All' ? 'All Items' : activeCategory)}
          </h1>
          
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm text-sm font-medium">
              <ArrowUpDown size={16} className="text-gray-500 mr-2" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-gray-800"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar / Topbar Categories */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={18} /> Categories
              </h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500 font-medium">
                No items found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
