import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AppContext = createContext();

/* ── Hardcoded credentials ── */
const CREDENTIALS = [
  { email: 'demo@sortit.com',  password: 'sorit123', name: 'Demo User',  phone: '+91 9876543210' },
  { email: 'admin@sortit.com', password: 'admin123', name: 'Admin User', phone: '+91 9000000001' },
];

export function AppProvider({ children }) {
  // ── Auth state ──
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sortit_logged_in') === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sortit_user');
    return saved ? JSON.parse(saved) : { name: 'Guest User', phone: '+91 9876543210' };
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('sortit_wallet');
    return saved ? JSON.parse(saved) : 500.00;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('sortit_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 'TXN-1', type: 'credit', amount: 500.00, date: new Date().toISOString(), desc: 'Welcome Bonus' }
    ];
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('sortit_addresses');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Home', address: '123 sort it. Ave, Metro City', isDefault: true }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sortit_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // ── PWA Install ──
  const [installPrompt, setInstallPrompt] = useState(null);  // deferred prompt event
  const [installDismissed, setInstallDismissed] = useState(false); // banner was closed
  const [showInstallHint, setShowInstallHint] = useState(false); // manually show install UI
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const [isInstalled, setIsInstalled] = useState(() =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
  );

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const triggerInstall = async () => {
    if (isIOS) {
      setShowInstallHint(true);
      setInstallDismissed(false);
      return;
    }
    if (!installPrompt) {
      setShowInstallHint(true);
      setInstallDismissed(false);
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
    setInstallDismissed(false);
  };

  const dismissInstall = () => {
    setInstallDismissed(true);
    setShowInstallHint(false);
  };

  // Persist state
  useEffect(() => localStorage.setItem('sortit_logged_in', String(isLoggedIn)), [isLoggedIn]);
  useEffect(() => localStorage.setItem('sortit_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('sortit_wallet', JSON.stringify(walletBalance)), [walletBalance]);
  useEffect(() => localStorage.setItem('sortit_transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('sortit_addresses', JSON.stringify(addresses)), [addresses]);
  useEffect(() => localStorage.setItem('sortit_orders', JSON.stringify(orders)), [orders]);

  // Auth actions
  const login = (email, password) => {
    const match = CREDENTIALS.find(
      (c) => c.email === email.trim().toLowerCase() && c.password === password
    );
    if (match) {
      setUser({ name: match.name, phone: match.phone });
      setIsLoggedIn(true);
      localStorage.setItem('sortit_logged_in', 'true');
      localStorage.setItem('sortit_user', JSON.stringify({ name: match.name, phone: match.phone }));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ name: 'Guest User', phone: '+91 9876543210' });
    localStorage.removeItem('sortit_logged_in');
  };

  const addMoney = (amount) => {
    setWalletBalance(prev => prev + amount);
    setTransactions(prev => [
      { id: `TXN-${Date.now()}`, type: 'credit', amount, date: new Date().toISOString(), desc: 'Added via Card' },
      ...prev
    ]);
  };

  const deductMoney = (amount, desc = 'Purchase') => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
      setTransactions(prev => [
        { id: `TXN-${Date.now()}`, type: 'debit', amount, date: new Date().toISOString(), desc },
        ...prev
      ]);
      return true;
    }
    return false;
  };

  const addAddress = (addressObj) => {
    setAddresses(prev => [...prev, { ...addressObj, id: Date.now().toString() }]);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const placeOrder = (cartItems, total) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      items: cartItems,
      total,
      date: new Date().toISOString(),
      status: 'Processing',
      address: addresses.find(a => a.isDefault)?.address || 'No Address'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, login, logout,
      user, setUser,
      walletBalance, addMoney, deductMoney, transactions,
      addresses, addAddress, deleteAddress, setDefaultAddress,
      orders, placeOrder,
      searchQuery, setSearchQuery,
      installPrompt, installDismissed, isInstalled, triggerInstall, dismissInstall,
      showInstallHint, setShowInstallHint, isIOS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
