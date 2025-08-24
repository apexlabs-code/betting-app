
'use client'
 
import { useState, useEffect } from 'react'
// import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window?.MSStream
    );

    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator?.standalone === true
    );

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstallable(false);
      setIsStandalone(true);
      setShowPopup(false);
      alert('ऐप सफलतापूर्वक इंस्टॉल हो गया! 🎉');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowInstructions(true);
      return;
    }

    if (!installPrompt) return;

    try {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
    } finally {
      setInstallPrompt(null);
      setIsInstallable(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowInstructions(false);
  };

  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      {(isInstallable || isIOS) && (
        <button 
          onClick={() => setShowPopup(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
        >
          <span className="text-2xl">📱</span>
          ऐप इंस्टॉल करें
        </button>
      )}

      {/* Popup/Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInUp">
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-xl font-bold"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center p-8 pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-3xl">📱</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">हमारा ऐप इंस्टॉल करें</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                हमारे Progressive Web App के साथ बेहतरीन अनुभव पाएं
              </p>
            </div>

            {/* Benefits */}
            <div className="px-8 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">क्यों इंस्टॉल करें?</h3>
              <div className="space-y-3">
                {[
                  { icon: '⚡', text: 'तेज़ लोडिंग और बेहतर प्रदर्शन' },
                  { icon: '📳', text: 'अपडेट्स के लिए पुश नोटिफिकेशन' },
                  { icon: '📱', text: 'ऑफलाइन काम करता है' },
                  { icon: '🏠', text: 'होम स्क्रीन से आसान पहुंच' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="text-gray-700 text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Install Actions */}
            <div className="p-8 pt-0">
              {!showInstructions ? (
                <div className="space-y-3">
                  {/* Android/Desktop Install */}
                  {isInstallable && !isIOS && (
                    <button 
                      onClick={handleInstallClick}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">⬇️</span>
                      अभी इंस्टॉल करें
                    </button>
                  )}

                  {/* iOS Install */}
                  {isIOS && (
                    <button 
                      onClick={handleInstallClick}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">📋</span>
                      निर्देश दिखाएं
                    </button>
                  )}

                  <button 
                    onClick={closePopup}
                    className="w-full py-3 text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    बाद में
                  </button>
                </div>
              ) : (
                /* iOS Instructions */
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📱</span>
                    iOS में इंस्टॉल करें
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
                        <span>नीचे <strong>Share बटन</strong> 📤 पर टैप करें</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
                        <span>नीचे स्क्रॉल करें और <strong>&quot;Add to Home Screen&quot;</strong> ➕ पर टैप करें</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
                        <span>ऊपरी दाएं कोने में <strong>&quot;Add&quot;</strong> पर टैप करें</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                        <span>ऐप आपकी होम स्क्रीन पर दिखाई देगा! 🎉</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowInstructions(false)}
                      className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-200"
                    >
                      समझ गया!
                    </button>
                    <button 
                      onClick={closePopup}
                      className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
                    >
                      बंद करें
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
export default InstallPrompt;