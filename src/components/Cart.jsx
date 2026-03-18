import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, MapPin, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Cart() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, cartTotal, setCartItems } = useCart();
  const { walletBalance, deductMoney, addresses, placeOrder } = useApp();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState('');

  const defaultAddress = addresses.find(a => a.isDefault);
  const deliveryFee = cartTotal > 0 ? 1.99 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    setCheckoutError('');
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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 shadow-2xl z-50 flex flex-col border-l border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm z-10">
              <h2 className="text-xl font-extrabold flex items-center gap-2 text-gray-900">
                <ShoppingBag size={20} className="text-primary" /> My Cart
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} className="text-gray-900" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Delivery Address Banner */}
              {cartItems.length > 0 && (
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-xl mt-0.5"><MapPin size={18} className="text-primary" /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Delivery To</p>
                    {defaultAddress ? (
                      <p className="text-sm font-bold text-gray-900 leading-tight">{defaultAddress.title} - <span className="font-medium text-gray-600 truncate inline-block max-w-[150px] align-bottom">{defaultAddress.address}</span></p>
                    ) : (
                      <p className="text-sm font-bold text-red-500 cursor-pointer" onClick={() => { toggleCart(); navigate('/addresses'); }}>Add a delivery address</p>
                    )}
                  </div>
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
                  <ShoppingBag size={64} className="mb-4 opacity-30 text-primary" />
                  <p className="text-xl font-bold text-gray-500">Your cart is empty.</p>
                  <p className="text-sm font-medium mt-1">Looks like you haven't added anything yet.</p>
                  <button onClick={toggleCart} className="mt-6 text-primary hover:text-primary-hover font-bold bg-primary/10 px-6 py-2 rounded-xl">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 p-1 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{item.name}</h3>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">{item.weight}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="font-extrabold text-gray-900 text-sm">${item.price}</p>
                          <div className="flex items-center bg-green-600 text-white rounded-lg shadow-sm font-bold h-[28px] w-[70px] overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-1/3 flex items-center justify-center hover:bg-green-700 transition">
                              <Minus size={14} />
                            </button>
                            <span className="w-1/3 text-center text-[10px]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-1/3 flex items-center justify-center hover:bg-green-700 transition">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bill Details */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-2">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Bill Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Item Total</span>
                      <span className="font-medium text-gray-800">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-gray-800">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2 font-black text-gray-900">
                      <span>Grand Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] relative">
                {checkoutError && (
                  <div className="absolute -top-12 left-4 right-4 bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg text-center animate-bounce">
                    {checkoutError}
                  </div>
                )}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#18A058] hover:bg-[#158C4D] text-white py-3.5 rounded-xl text-lg font-extrabold shadow-sm shadow-[#18A058]/20 transition-colors flex items-center justify-between px-6 mt-2"
                >
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm">${grandTotal.toFixed(2)}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold">Total</span>
                  </div>
                  <span className="flex items-center gap-2">Login to Proceed <ChevronRight size={18} /></span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
