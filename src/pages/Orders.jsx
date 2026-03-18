import { ArrowLeft, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Orders() {
  const { orders } = useApp();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top App Bar */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Your Orders</h1>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Box size={64} className="mb-4 text-gray-300" />
            <p className="text-lg font-bold text-gray-500">No orders yet</p>
            <p className="text-sm font-medium mt-1">Start shopping to see your orders here.</p>
            <Link to="/" className="mt-6 btn btn-secondary px-8">Browse Groceries</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider rounded">
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 font-bold mt-2">
                      {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-gray-400">Order ID: {order.id}</p>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-xl border border-gray-100 flex-shrink-0 bg-gray-50 p-1">
                      <img src={item.img} alt="item" className="w-full h-full object-contain mix-blend-multiply" />
                      <span className="absolute -bottom-2 -right-2 bg-gray-800 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-14 h-14 rounded-xl border border-gray-100 flex-shrink-0 bg-gray-50 flex items-center justify-center font-bold text-sm text-gray-500">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary font-extrabold py-2 rounded-xl text-sm transition-colors border border-primary/20">
                    Track Order
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-extrabold py-2 rounded-xl text-sm transition-colors border border-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
