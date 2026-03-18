import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col h-[280px] w-[160px] md:w-[200px] flex-shrink-0 relative group">
      {product.oldPrice && (
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-xl z-10">
          {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
        </div>
      )}
      
      {/* Image — fixed height */}
      <div className="h-[140px] md:h-[150px] p-2 flex items-center justify-center relative bg-gray-50/50 shrink-0">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
        />
      </div>

      {/* Content — fills remaining height and pins footer to bottom */}
      <div className="p-3 flex flex-col flex-1 min-h-0">
        {/* Title area with fixed height so all cards align */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <span className="text-[11px] text-gray-500 truncate mt-0.5">
          {product.weight || '1 pack'}
        </span>

        {/* Price + Add button pinned to bottom */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-900">${product.price}</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>

          {quantity === 0 ? (
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-600 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-colors uppercase"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-green-600 text-white rounded-lg shadow-sm font-bold h-[30px] w-[70px] overflow-hidden">
              <button 
                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, -1); }}
                className="w-1/3 flex items-center justify-center hover:bg-green-700 transition h-full"
              >
                <Minus size={14} />
              </button>
              <span className="w-1/3 text-center text-xs">{quantity}</span>
              <button 
                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, 1); }}
                className="w-1/3 flex items-center justify-center hover:bg-green-700 transition h-full"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
