import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InstallPrompt from './components/InstallPrompt';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './components/Cart';
import AllItems from './pages/AllItems';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Orders from './pages/Orders';
import AddressBook from './pages/AddressBook';
import Payments from './pages/Payments';
import Support from './pages/Support';
import Auth from './pages/Auth';
import { useApp } from './context/AppContext';

/* Redirects unauthenticated users to /login */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp();
  // Also check localStorage synchronously — the React state may not have propagated
  // yet right after login() sets it and navigate('/') fires in the same tick.
  const lsLoggedIn = localStorage.getItem('sortit_logged_in') === 'true';
  return (isLoggedIn || lsLoggedIn) ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes — fullscreen, no header/cart */}
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Protected app shell */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout bg-gray-50 min-h-screen flex flex-col">
                <Header />
                <main className="main-content pb-20 flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-items" element={<AllItems />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/addresses" element={<AddressBook />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
                <Cart />
                <InstallPrompt />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
