import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartBar() {
  const { cartCount, cartTotal, toggleCart, isCartOpen } = useCart();
  const { installPrompt, installDismissed, isInstalled, showInstallHint, isIOS } = useApp();

  const isInstallVisible = (showInstallHint || (installPrompt && !installDismissed)) || (isIOS && !isInstalled && !installDismissed);

  if (cartCount === 0 || isCartOpen || isInstallVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 md:pb-4 pointer-events-none">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={toggleCart}
          className="bg-secondary text-white p-4 rounded-2xl shadow-[0_-8px_30px_rgba(30,127,79,0.3)] flex items-center justify-between cursor-pointer pointer-events-auto active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="font-extrabold text-sm leading-tight">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
              <p className="text-[11px] font-bold opacity-90 uppercase tracking-wider">in your cart</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <p className="font-black text-lg leading-tight tracking-tight">${cartTotal.toFixed(2)}</p>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-primary">Extra Charges May Apply</p>
            </div>
            <div className="flex items-center gap-1 font-black bg-white/10 px-3 py-2 rounded-xl text-sm">
              View Cart <ChevronRight size={16} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
