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
import CartBar from './components/CartBar';

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

        {/* Global app shell */}
        <Route
          path="/*"
          element={
            <div className="app-layout bg-gray-50 min-h-screen flex flex-col">
              <Header />
              <main className="main-content pb-20 flex-grow">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/all-items" element={<AllItems />} />
                  <Route path="/support" element={<Support />} />
                  
                  {/* Protected routes */}
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/addresses" element={<ProtectedRoute><AddressBook /></ProtectedRoute>} />
                  <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                  
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <Cart />
              <CartBar />
              <InstallPrompt />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
