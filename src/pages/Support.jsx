import { ArrowLeft, MessageCircle, HelpCircle, FileText, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top App Bar */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Customer Support</h1>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        
        {/* Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <MessageCircle size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">How can we help you today?</h2>
          <p className="text-sm text-gray-600 font-medium">We usually respond within 2 minutes during operational hours.</p>
          
          <button className="mt-6 w-full bg-primary hover:bg-primary-hover text-gray-900 font-extrabold py-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
            <MessageCircle size={18} /> Chat with Us
          </button>
        </div>

        {/* FAQ Categories */}
        <h3 className="font-bold text-gray-900 mb-4 px-1">Help Topics</h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          
          <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <HelpCircle size={20} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">Recent Order Issues</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Missing items, late delivery, cancellations</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <Wallet size={20} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">Payments & Refunds</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Refund status, wallet balance, failed transactions</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">Terms & Policies</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Return policy, terms of service</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
