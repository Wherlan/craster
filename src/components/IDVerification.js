import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export function IDVerification({ user, onVerify }) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyClick = () => {
    setIsVerifying(true);
    
    // Simulate ID.me verification process
    // In production, this would redirect to ID.me OAuth flow
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 2000);
  };

  if (user.kycVerified) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <CheckCircle size={32} className="text-green-400" />
          <div>
            <h3 className="font-bold text-green-300 mb-1">Identity Verified</h3>
            <p className="text-green-300/70 text-sm">Your identity has been verified via ID.me. You are eligible for tax-free gifting.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <AlertCircle size={32} className="text-yellow-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-bold text-yellow-300 mb-1">Identity Verification Required</h3>
          <p className="text-yellow-300/70 text-sm mb-4">
            To qualify for tax-free gifting on our platform, we require identity verification through ID.me. This is a quick and secure process.
          </p>
          <div className="space-y-2 mb-4 text-sm text-yellow-300/60">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
              <span>Verify your identity in just 2-3 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
              <span>Secure verification via ID.me</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
              <span>Ensures tax-compliant gifting</span>
            </div>
          </div>
          <button
            onClick={handleVerifyClick}
            disabled={isVerifying}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-bold py-2 px-6 rounded-lg transition-all"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                Verify with ID.me
                <ExternalLink size={16} />
              </>
            )}
          </button>
        </div>
      </div>
      <p className="text-xs text-yellow-300/50 italic">
        Note: In production, this will redirect to ID.me's secure verification service. Your personal information is never stored on our servers.
      </p>
    </div>
  );
}
