import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Wallet, ShoppingBag, MapPin, CreditCard, HelpCircle, ChevronRight, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const MENU_ITEMS = [
    { name: 'Your Orders', icon: ShoppingBag, path: '/orders', desc: 'Track, return, or buy things again' },
    { name: 'Wallet', icon: Wallet, path: '/wallet', desc: 'Transaction history' },
    { name: 'Address Book', icon: MapPin, path: '/addresses', desc: 'Edit, add or remove addresses' },
    { name: 'Saved Payments', icon: CreditCard, path: '/payments', desc: 'Manage saved cards & UPI' },
    { name: 'Customer Support', icon: HelpCircle, path: '/support', desc: 'FAQs & Contact Us' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Info */}
      <div className="bg-white border-b border-gray-100 px-4 py-8 shadow-sm">
        <div className="container mx-auto max-w-2xl flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon size={32} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {MENU_ITEMS.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path} 
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <item.icon size={22} className="text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-[15px]">{item.name}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>

        {/* Log Out Button */}
        <button onClick={handleLogout} className="w-full mt-6 bg-white border border-red-100 p-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 text-red-500 transition-colors group font-bold">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Log Out
        </button>
      </div>
    </div>
  );
}
