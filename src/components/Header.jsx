import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Wallet, User, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { cartCount, toggleCart } = useCart();
  const { walletBalance, user } = useApp();
  const navigate = useNavigate();
  
  const placeholders = [
    "Search 'vegetables'",
    "Search 'fruits'",
    "Search 'snacks'",
    "Search 'milk and dairy'",
    "Search 'beverages'"
  ];
  const [phIndex, setPhIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-items?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/all-items');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {/* Location & Menu */}
            <div className="flex items-center gap-3">
              <button className="p-1"><Menu size={24} className="text-gray-800" /></button>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-primary">sort it.</h1>
                <div className="flex items-center text-xs text-gray-600 font-bold gap-1 mt-0.5 max-w-[150px]">
                  <MapPin size={12} className="text-primary flex-shrink-0" />
                  <span className="truncate">Home - 123 sort it. Ave</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-4">
              <Link to="/profile" className="p-1"><User size={24} className="text-gray-800" /></Link>
              <button onClick={toggleCart} className="p-1 relative scale-110">
                <ShoppingCart size={24} className="text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="relative w-full h-11 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner flex items-center px-3 gap-2">
            <Search size={18} className="text-gray-400" />
            <form className="relative flex-1 h-full" onSubmit={handleSearch}>
              <AnimatePresence mode="wait">
                {!searchQuery && (
                <motion.div
                  key={phIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center text-gray-400 text-sm font-medium pointer-events-none"
                >
                  {placeholders[phIndex]}
                </motion.div>
                )}
              </AnimatePresence>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-sm text-gray-800 font-medium z-10 relative bg-opacity-0"
              />
            </form>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {/* Logo & Location */}
          <div className="flex items-center gap-8 border-r border-gray-100 pr-6">
            <Link to="/">
              <span className="font-extrabold text-3xl tracking-tight text-primary">sort it.</span>
            </Link>
            <div className="flex flex-col cursor-pointer group">
              <div className="flex items-center text-sm text-gray-800 font-bold gap-1 group-hover:text-primary transition-colors">
                <span className="truncate max-w-[200px]">Home - 123 sort it. Ave, Metro...</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative h-12 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner flex items-center px-4 gap-3">
            <Search size={20} className="text-gray-400" />
            <form className="relative flex-1 h-full" onSubmit={handleSearch}>
              <AnimatePresence mode="wait">
                {!searchQuery && (
                <motion.div
                  key={phIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center text-gray-400 text-sm font-medium pointer-events-none"
                >
                  {placeholders[phIndex]}
                </motion.div>
                )}
              </AnimatePresence>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-sm text-gray-800 font-medium z-10 relative bg-opacity-0"
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6 pl-2 text-gray-700">
            <Link to="/wallet" className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">
              <Wallet size={22} className="text-secondary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight block pt-1">Wallet</span>
              </div>
            </Link>

            <Link to="/profile" className="flex items-center flex-col justify-center hover:text-primary transition-colors">
              <User size={24} />
              <span className="text-[10px] font-bold mt-1">Profile</span>
            </Link>

            <button 
              onClick={toggleCart} 
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl font-bold hover:bg-secondary-hover transition-colors shadow-lg shadow-secondary/20"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 ? (
                <span>{cartCount} Items</span>
              ) : (
                <span>My Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
