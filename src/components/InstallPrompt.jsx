import { useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function InstallPrompt() {
  const { installPrompt, installDismissed, isInstalled, triggerInstall, dismissInstall, showInstallHint, isIOS } = useApp();

  // For Android/Desktop: Show if native prompt is available OR if manually triggered
  const showAndroidBanner = !isIOS && !isInstalled && (installPrompt || showInstallHint) && !installDismissed;
  
  // For iOS: Show if manually triggered OR if it's a new session hint
  const showIOSHint = isIOS && !isInstalled && (showInstallHint || (!installDismissed && !sessionStorage.getItem('iosInstallPromptShown')));

  const handleClose = () => {
    if (isIOS) sessionStorage.setItem('iosInstallPromptShown', 'true');
    dismissInstall();
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {(showAndroidBanner || showIOSHint) && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto min-w-[320px] bg-white text-gray-800 p-4 rounded-2xl border border-primary/30 shadow-2xl z-50 flex items-center justify-between gap-4"
        >
          <div className="flex-1">
            <h3 className="font-bold text-sm md:text-base mb-1">Install sort it. App</h3>
            {isIOS ? (
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                Tap <span className="font-bold text-primary">Share</span> then <span className="font-bold text-gray-700">'Add to Home Screen'</span>.
              </p>
            ) : (
              <p className="text-xs md:text-sm text-gray-500 font-medium">Add to your home screen for a faster experience.</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isIOS && (
              <button
                onClick={triggerInstall}
                className="bg-primary hover:bg-primary/90 text-gray-900 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-md"
              >
                <Download size={16} /> Add to home screen
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
