import { useState } from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Home, Briefcase, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AddressBook() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({ title: '', address: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (newAddress.title && newAddress.address) {
      addAddress({ ...newAddress, isDefault: addresses.length === 0 });
      setIsAdding(false);
      setNewAddress({ title: '', address: '' });
    }
  };

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('home')) return <Home size={20} className="text-green-600" />;
    if (t.includes('work') || t.includes('office')) return <Briefcase size={20} className="text-blue-600" />;
    return <Map size={20} className="text-orange-600" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 relative">
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-900" />
          </Link>
          <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Saved Addresses</h1>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="text-primary font-bold flex items-center gap-1 text-sm bg-primary/10 px-3 py-1.5 rounded-lg">
            <Plus size={16} /> Add New
          </button>
        )}
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        {isAdding ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Add New Address</h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Address Title (e.g. Home, Work)</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newAddress.title}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Home"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Complete Address</label>
                <textarea 
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Street Name, Area, City, State, Pincode"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[100px] resize-none"
                  required
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-primary text-gray-900 font-bold hover:bg-primary-hover py-3 rounded-xl transition-colors shadow-sm">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <MapPin size={64} className="mb-4 text-gray-300" />
                <p className="text-lg font-bold text-gray-500">No addresses found</p>
                <p className="text-sm font-medium mt-1">Add a delivery address to checkout faster.</p>
                <button onClick={() => setIsAdding(true)} className="mt-6 btn btn-secondary px-8">Add Address</button>
              </div>
            ) : (
              addresses.map((addr) => (
                <div 
                  key={addr.id} 
                  className={`bg-white p-5 rounded-2xl shadow-sm border transition-colors ${addr.isDefault ? 'border-primary shadow-primary/5' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1">{getIcon(addr.title)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">{addr.title}</h3>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-primary/20 text-yellow-800 font-black px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-[250px]">{addr.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-5 pt-4 border-t border-gray-50">
                    {!addr.isDefault && (
                      <button 
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs font-bold text-primary hover:text-primary-hover transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      onClick={() => deleteAddress(addr.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors ml-auto flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
