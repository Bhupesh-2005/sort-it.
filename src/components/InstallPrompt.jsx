import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Check if app is already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(standalone);

    // If on iOS and not standalone, we can optionally show the prompt instructions.
    // However, let's delay showing the prompt directly for iOS so it's not annoying, or show it after a custom delay.
    if (ios && !standalone) {
      const iosPromptShown = sessionStorage.getItem('iosInstallPromptShown');
      if (!iosPromptShown) {
        setTimeout(() => setIsVisible(true), 3000);
      }
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // For Android/Desktop, we show the prompt when the event fires
      setIsVisible(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Just close it for iOS since they have to use the share menu manually
      closePrompt();
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    closePrompt();
  };

  const closePrompt = () => {
    if (isIOS) {
      sessionStorage.setItem('iosInstallPromptShown', 'true');
    }
    setIsVisible(false);
  };

  // Do not show if already in standalone app
  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto min-w-[320px] bg-surface text-text p-4 rounded-xl border border-primary/30 shadow-2xl z-50 flex items-center justify-between"
        >
          <div className="flex-1">
            <h3 className="font-bold text-sm md:text-base mb-1 text-text">Install SortIt App</h3>
            {isIOS ? (
              <p className="text-xs md:text-sm text-text-muted font-medium">
                Tap the <span className="font-bold text-primary">Share</span> button at the bottom and select <span className="font-bold text-text">'Add to Home Screen'</span>.
              </p>
            ) : (
              <p className="text-xs md:text-sm text-text-muted font-medium">Add to your home screen for a fast experience.</p>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {!isIOS && (
              <button
                onClick={handleInstallClick}
                className="bg-primary hover:bg-primary-hover text-text p-2.5 rounded-lg flex items-center justify-center transition-colors shadow-md font-bold"
                title="Install App"
              >
                <Download size={20} />
              </button>
            )}
            <button
              onClick={closePrompt}
              className="text-text-muted hover:text-text p-2 hover:bg-black/5 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
