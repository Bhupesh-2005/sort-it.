import { ArrowLeft, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Wallet() {
  const { transactions } = useApp();

  const getStatusColor = (type) => type === 'credit' ? 'text-green-600' : 'text-gray-900';
  const getIcon = (type) => type === 'credit' ? <ArrowDownLeft size={20} className="text-green-600" /> : <ArrowUpRight size={20} className="text-red-500" />;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top App Bar */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Wallet</h1>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Transaction History */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-gray-400" /> Recent Transactions
          </h3>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-medium">No transactions yet.</div>
            ) : (
              transactions.map((txn) => (
                <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100`}>
                      {getIcon(txn.type)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{txn.desc}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className={`font-black ${getStatusColor(txn.type)}`}>
                    {txn.type === 'credit' ? '+' : '-'}${txn.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
