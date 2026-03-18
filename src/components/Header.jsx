import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Wallet, User, ShoppingCart, ChevronDown, Menu, Download, X, ShoppingBag } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { cartCount, toggleCart } = useCart();
  const { walletBalance, user, isLoggedIn, installPrompt, installDismissed, isInstalled, triggerInstall, isIOS } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const placeholders = [
    "Search 'vegetables'",
    "Search 'fruits'",
    "Search 'snacks'",
    "Search 'milk and dairy'",
    "Search 'beverages'"
  ];
  const [phIndex, setPhIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Clear search query when navigating away from AllItems
  useEffect(() => {
    if (!location.pathname.startsWith('/all-items')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim()) {
      navigate(`/all-items?search=${encodeURIComponent(q.trim())}`, { replace: true });
    } else {
      navigate('/all-items', { replace: true });
    }
  };

  const handleSearchFocus = () => {
    if (!location.pathname.startsWith('/all-items')) {
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
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu size={24} className="text-gray-800" />
              </button>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-primary">sort it.</h1>
                <div className="flex items-center text-[11px] text-gray-500 font-bold gap-1 mt-0.5">
                  <MapPin size={10} className="text-primary flex-shrink-0" />
                  <span className="truncate max-w-[120px]">Home - 123 sort it. Ave</span>
                  <ChevronDown size={12} />
                </div>
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-4">
              <Link to="/profile" className="p-1 text-gray-800" title={isLoggedIn ? 'Profile' : 'Sign In'}>
                <User size={24} />
              </Link>
              {/* Persistent install button (mobile) */}
              {!isInstalled && installDismissed && (installPrompt || isIOS) && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={triggerInstall}
                  title="Install App"
                  className="p-1 relative"
                >
                  <Download size={22} className="text-primary" />
                </motion.button>
              )}
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
            <div className="relative flex-1 h-full">
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
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full h-full bg-transparent outline-none text-sm text-gray-800 font-medium z-10 relative bg-opacity-0"
              />
            </div>
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
            <div className="relative flex-1 h-full">
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
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full h-full bg-transparent outline-none text-sm text-gray-800 font-medium z-10 relative bg-opacity-0"
              />
            </div>
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
              <span className="text-[10px] font-bold mt-1">{isLoggedIn ? 'Profile' : 'Sign In'}</span>
            </Link>

            {/* Persistent install button (desktop) */}
            {!isInstalled && installDismissed && (installPrompt || isIOS) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={triggerInstall}
                title="Install App"
                className="flex items-center gap-1.5 text-sm font-bold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors"
              >
                <Download size={16} /> Add to home screen
              </motion.button>
            )}

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

      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-gradient-to-br from-secondary to-[#145c38] text-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-extrabold text-2xl tracking-tight text-primary">sort it.</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg leading-tight">{isLoggedIn ? user.name : 'Welcome Guest'}</p>
                    <p className="text-xs text-white/60">{isLoggedIn ? user.phone : 'Sign in to track orders'}</p>
                  </div>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Menu</p>
                  <div className="space-y-1">
                    {[
                      { icon: MapPin, label: 'Home', path: '/' },
                      { icon: Search, label: 'Browse All Items', path: '/all-items' },
                      { icon: Wallet, label: 'Wallet', path: '/wallet' },
                      { icon: ShoppingCart, label: 'My Orders', path: '/orders' },
                      { icon: User, label: isLoggedIn ? 'My Profile' : 'Sign In / Sign Up', path: '/profile' },
                      { icon: MapPin, label: 'Address Book', path: '/addresses' },
                      { icon: Download, label: 'Customer Support', path: '/support' }
                    ].map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors font-bold text-gray-700"
                      >
                        <item.icon size={20} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-100">
                {!isInstalled && (
                  <button 
                    onClick={() => { setIsMenuOpen(false); triggerInstall(); }}
                    className="w-full bg-primary/10 text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                  >
                    <Download size={18} /> Add to home screen
                  </button>
                )}
                <p className="text-center text-[10px] text-gray-400 mt-4">© 2026 sort it. · v1.2.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
