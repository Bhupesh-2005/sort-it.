import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, MapPin, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, cartTotal, setCartItems } = useCart();
  const { addresses, placeOrder, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState('');

  const defaultAddress = addresses.find(a => a.isDefault);
  const deliveryFee = cartTotal > 0 ? 1.99 : 0;
  const grandTotal = cartTotal + deliveryFee;

  // Senior Frontend Fix: Body Scroll Lock
  useEffect(() => {
    if (isCartOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    setCheckoutError('');
    if (!isLoggedIn) {
      toggleCart();
      navigate('/login');
      return;
    }
    if (!defaultAddress) {
      setCheckoutError('Please add a delivery address.');
      setTimeout(() => { toggleCart(); navigate('/addresses'); }, 1500);
      return;
    }
    
    placeOrder(cartItems, grandTotal);
    setCartItems([]);
    toggleCart();
    navigate('/orders');
  };

  const removeItem = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      updateQuantity(id, -item.quantity);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white z-[70] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.1)] overscroll-none"
          >
            {/* Header - Sticky */}
            <div className="flex-none flex items-center justify-between p-5 bg-white border-b border-gray-100 shadow-sm z-10">
              <div>
                <h2 className="text-xl font-extrabold flex items-center gap-2 text-gray-900">
                  <ShoppingBag size={22} className="text-secondary" /> My Cart
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
              </div>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-50 rounded-full transition-colors group">
                <X size={24} className="text-gray-400 group-hover:text-gray-900" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto bg-gray-50/30 custom-scrollbar">
              <div className="p-4 flex flex-col gap-4">
                {/* Delivery Address Banner */}
                {cartItems.length > 0 && (
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3 transition-all hover:shadow-md">
                    <div className="bg-secondary/10 p-2.5 rounded-xl mt-0.5"><MapPin size={20} className="text-secondary" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Delivering To</p>
                      {defaultAddress ? (
                        <p className="text-sm font-bold text-gray-900 leading-tight truncate">
                          {defaultAddress.title} - <span className="font-medium text-gray-500">{defaultAddress.address}</span>
                        </p>
                      ) : (
                        <p className="text-sm font-bold text-red-500 cursor-pointer" onClick={() => { toggleCart(); navigate('/addresses'); }}>Add a delivery address</p>
                      )}
                    </div>
                  </div>
                )}

                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag size={48} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-[200px]">Looks like you haven't added anything to your cart yet.</p>
                    <button onClick={toggleCart} className="mt-8 bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary-hover transition-all shadow-lg shadow-secondary/20">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items Section with localized scrolling constraint */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50 max-h-[60vh] overflow-y-auto overscroll-contain">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 hover:bg-gray-50/50 transition-colors group">
                          <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 p-2 flex-shrink-0 relative overflow-hidden">
                            <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="flex-1 flex flex-col py-0.5">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight flex-1">{item.name}</h3>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-[11px] text-gray-500 font-bold mt-1 uppercase tracking-tight">{item.weight}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-2">
                              <p className="font-black text-gray-900 text-base">${item.price}</p>
                              
                              <div className="flex items-center bg-secondary text-white rounded-xl shadow-sm font-black h-9 w-24 overflow-hidden border border-secondary shadow-lg shadow-secondary/10">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)} 
                                  className="flex-1 flex items-center justify-center hover:bg-black/10 transition h-full"
                                >
                                  <Minus size={14} strokeWidth={3} />
                                </button>
                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)} 
                                  className="flex-1 flex items-center justify-center hover:bg-black/10 transition h-full"
                                >
                                  <Plus size={14} strokeWidth={3} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bill Details */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-2">
                      <h3 className="font-extrabold text-gray-900 mb-4 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-secondary rounded-full"></div>
                        Bill Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-gray-500 font-bold">
                          <span className="flex items-center gap-2">Item Total</span>
                          <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-500 font-bold">
                          <span className="flex items-center gap-2">Delivery Fee</span>
                          <span className="text-green-600">${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2 font-black text-lg text-gray-900">
                          <span>Grand Total</span>
                          <span className="text-secondary">${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Safety Promise */}
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-xl text-blue-600 flex-shrink-0">
                        <ChevronRight size={18} />
                      </div>
                      <p className="text-[10px] font-bold text-blue-700 leading-tight">
                        Our delivery partners follow strict safety protocols and use sanitized kits for every delivery.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sticky Footer */}
            {cartItems.length > 0 && (
              <div className="flex-none p-5 bg-white border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.05)] relative z-20">
                {checkoutError && (
                  <div className="absolute -top-14 left-5 right-5 bg-red-500 text-white text-[11px] font-black py-2.5 px-4 rounded-xl shadow-xl text-center animate-bounce uppercase tracking-wider">
                    {checkoutError}
                  </div>
                )}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-secondary hover:bg-secondary-hover text-white py-4 rounded-2xl text-lg font-black shadow-xl shadow-secondary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-between px-6"
                >
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-base font-black">${grandTotal.toFixed(2)}</span>
                    <span className="text-[10px] uppercase tracking-widest font-black opacity-70">Proceed to Pay</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 pl-4 pr-3 py-1.5 rounded-xl text-sm uppercase tracking-widest">
                    Checkout <ChevronRight size={18} strokeWidth={3} />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
