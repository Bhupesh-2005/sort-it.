import { ArrowLeft, Clock, CreditCard, Wallet as WalletIcon, Smartphone, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Payments() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top App Bar */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Saved Payments</h1>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        
        {/* UPI Section */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <Smartphone size={16} /> UPI Linked Accounts
            </h2>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black italic">
                P
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">PhonePe UPI</p>
                <p className="text-xs text-gray-500 font-medium">Linked to XXXXXX1234</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </section>

        {/* Cards Section */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <CreditCard size={16} /> Credit & Debit Cards
            </h2>
            <button className="text-primary font-bold text-xs flex items-center gap-1">
              <Plus size={14} /> Add New Card
            </button>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <span className="font-black text-[10px] text-blue-800 tracking-tighter">VISA</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">HDFC Bank Credit Card</p>
                <p className="text-xs text-gray-500 font-medium">XXXX XXXX XXXX 4589</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
