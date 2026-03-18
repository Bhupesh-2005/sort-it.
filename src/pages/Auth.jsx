import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight,
  ShoppingBag, CheckCircle, Apple, Chrome, AlertCircle
} from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* ─── Floating decorative blobs ─── */
function Blob({ className }) {
  return <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />;
}

/* ─── Input field with animated label ─── */
function FloatingInput({ id, label, type = 'text', icon: Icon, value, onChange, error, rightEl }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 bg-white/70 backdrop-blur-sm border-2 rounded-2xl px-4 py-3 transition-all duration-200 ${
          error
            ? 'border-red-400 shadow-red-100 shadow-md'
            : focused
            ? 'border-secondary shadow-green-100 shadow-md'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Icon size={18} className={`flex-shrink-0 transition-colors duration-200 ${focused ? 'text-secondary' : 'text-gray-400'}`} />
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={`absolute left-0 transition-all duration-200 pointer-events-none select-none font-medium ${
              lifted ? 'text-[10px] top-0 text-secondary' : 'text-sm top-1/2 -translate-y-1/2 text-gray-500'
            }`}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full bg-transparent outline-none text-gray-800 font-medium text-sm ${lifted ? 'pt-3' : 'pt-1'}`}
            autoComplete="off"
          />
        </div>
        {rightEl}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 mt-1 ml-4 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ─── Social sign-in buttons ─── */
function SocialBtn({ icon: Icon, label, color }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${color}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

/* ─── Perks listed on the left panel ─── */
const PERKS = [
  { emoji: '🛒', text: 'Smart cart & wishlists' },
  { emoji: '💳', text: 'Exclusive member deals' },
  { emoji: '📦', text: 'Real-time order tracking' },
  { emoji: '🔒', text: 'Safe & secure payments' },
];

export default function Auth() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useApp();
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Redirect if already logged in on mount
  useEffect(() => {
    if (isLoggedIn && !submitted) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate, submitted]);

  // Render-time guard for the redirect to allow success animation to play
  if (isLoggedIn && !submitted) return null;

  /* Form state */
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setAuthError('');
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  /* Basic validation */
  function validate() {
    const errs = {};
    if (mode === 'signup' && !form.name.trim()) errs.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (mode === 'signup' && !/^\d{10}$/.test(form.phone.replace(/\D/g, '')))
      errs.phone = 'Enter a valid 10-digit phone number';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (mode === 'signup' && form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      if (mode === 'login') {
        const result = login(form.email, form.password);
        if (!result.success) {
          setAuthError(result.error);
          return;
        }
      }
      setSubmitted(true);
      setTimeout(() => navigate('/'), 1400);
    }
  }

  function switchMode(m) {
    setMode(m);
    setErrors({});
    setAuthError('');
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', password: '', confirm: '' });
  }

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-[#f0faf5] via-white to-[#fffbea] relative overflow-hidden">
      {/* Background blobs */}
      <Blob className="w-96 h-96 bg-secondary top-[-80px] left-[-80px]" />
      <Blob className="w-80 h-80 bg-primary top-1/3 right-[-60px]" />
      <Blob className="w-64 h-64 bg-secondary bottom-[-40px] left-1/3" />

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] bg-gradient-to-br from-secondary to-[#145c38] p-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-[-80px] left-[-40px] w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-white/[0.03]" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingBag size={22} className="text-secondary" strokeWidth={2.5} />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">sort it.</span>
        </div>

        {/* Hero text */}
        <div className="z-10 space-y-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-extrabold text-white leading-tight"
            >
              Everything<br />
              <span className="text-primary">you need,</span><br />
              delivered.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-4 text-white/70 text-lg leading-relaxed"
            >
              Join thousands of happy customers who shop smarter with sort it.
            </motion.p>
          </div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-3"
          >
            {PERKS.map((p) => (
              <motion.li
                key={p.text}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 text-white/80 font-medium"
              >
                <span className="text-xl">{p.emoji}</span>
                {p.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Footer quote */}
        <p className="z-10 text-white/40 text-sm">© 2026 sort it. · Smart Shopping Simplified</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
              <ShoppingBag size={18} className="text-primary" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-secondary">sort it.</span>
          </div>

          {/* Tab switcher */}
          <div className="bg-gray-100/80 backdrop-blur-sm p-1.5 rounded-2xl flex mb-8">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                  mode === m
                    ? 'bg-white text-secondary shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Success overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md z-50 rounded-3xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <CheckCircle size={72} className="text-secondary mb-4" strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {mode === 'login' ? 'Welcome back!' : 'Account created!'}
                </h2>
                <p className="text-gray-500 mt-2">Taking you to the shop…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form card */}
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/60 border border-white p-8 relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-gray-400 text-sm mb-7">
              {mode === 'login'
                ? 'Welcome back! Enter your details to continue.'
                : "Start your sort it. journey today \u2014 it\u2019s free!"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Auth error banner */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm font-medium"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {authError}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {mode === 'signup' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FloatingInput
                      id="name"
                      label="Full Name"
                      icon={User}
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingInput
                id="email"
                label="Email Address"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={set('email')}
                error={errors.email}
              />

              <AnimatePresence initial={false}>
                {mode === 'signup' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FloatingInput
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      icon={Phone}
                      value={form.phone}
                      onChange={set('phone')}
                      error={errors.phone}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingInput
                id="password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                icon={Lock}
                value={form.password}
                onChange={set('password')}
                error={errors.password}
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="text-gray-400 hover:text-secondary transition-colors flex-shrink-0"
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <AnimatePresence initial={false}>
                {mode === 'signup' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FloatingInput
                      id="confirm"
                      label="Confirm Password"
                      type={showConfirm ? 'text' : 'password'}
                      icon={Lock}
                      value={form.confirm}
                      onChange={set('confirm')}
                      error={errors.confirm}
                      rightEl={
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="text-gray-400 hover:text-secondary transition-colors flex-shrink-0"
                          tabIndex={-1}
                        >
                          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-secondary font-semibold hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                className="w-full bg-gradient-to-r from-secondary to-[#145c38] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-shadow duration-300 text-base mt-2"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social buttons */}
            <div className="flex gap-3">
              <SocialBtn
                icon={Chrome}
                label="Google"
                color="border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              />
              <SocialBtn
                icon={Apple}
                label="Apple"
                color="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              />
            </div>

            {/* Terms */}
            {mode === 'signup' && (
              <p className="text-center text-xs text-gray-400 mt-5">
                By creating an account you agree to our{' '}
                <span className="text-secondary font-semibold cursor-pointer hover:underline">Terms</span>{' '}
                &amp;{' '}
                <span className="text-secondary font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
