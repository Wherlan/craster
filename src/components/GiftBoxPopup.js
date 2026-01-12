import React, { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';

export function GiftBoxPopup({ giveaway, onNavigateToGiveaways, onClose }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!giveaway) return;

    const updateTimer = () => {
      const now = new Date();
      const drawDate = new Date(giveaway.drawDate);
      const diff = drawDate - now;

      if (diff <= 0) {
        setTimeLeft('Draw Ended');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval);
  }, [giveaway]);

  if (!giveaway) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-24 pb-24">
      <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/20 max-w-xs w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Product Image or Gift Box Animation */}
        <div className="flex justify-center mb-4">
          {giveaway.image ? (
            <div className="w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
              <img 
                src={giveaway.image} 
                alt={giveaway.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Floating animation */}
              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
                .gift-float {
                  animation: float 3s ease-in-out infinite;
                }
              `}</style>
              <div className="gift-float bg-gradient-to-br from-red-500 to-red-700 rounded-2xl w-20 h-20 flex items-center justify-center shadow-2xl">
                <Gift size={48} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-1">{giveaway.name}</h2>
          <p className="text-white/60 text-sm mb-3">{giveaway.description}</p>
          <div className="bg-white/5 rounded-xl p-3 mb-4">
            <div className="text-2xl font-bold text-green-400 mb-1">${giveaway.value}</div>
            <p className="text-xs text-white/60">Prize Value</p>
          </div>

          {/* Special Recognition Banner */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-2 mb-3 border border-yellow-500/30">
            <p className="text-xs font-semibold text-yellow-300">🎉 EXCLUSIVE TESLA AWARD</p>
            <p className="text-xs text-white/70 mt-1">$450K Cash + iPhone 17 Pro Max + Tesla Vehicle</p>
          </div>

          {/* Timer */}
          <div className="bg-[#111111] rounded-xl p-3 mb-3">
            <p className="text-white/60 text-xs mb-2">Draw In</p>
            {typeof timeLeft === 'string' ? (
              <div className="text-lg font-bold text-red-400">{timeLeft}</div>
            ) : timeLeft ? (
              <div className="flex justify-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60">D</div>
                </div>
                <div className="text-white/40 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60">H</div>
                </div>
                <div className="text-white/40 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60">M</div>
                </div>
                <div className="text-white/40 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60">S</div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Participants */}
          <div className="mb-3">
            <p className="text-white/60 text-xs mb-1">Total Participants</p>
            <p className="text-lg font-bold">{giveaway.totalParticipants.toLocaleString()}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNavigateToGiveaways}
          className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-white/90 transition-all text-sm"
        >
          Enter This Giveaway
        </button>

        <p className="text-xs text-white/40 text-center mt-2">
          Select to enter the exclusive giveaway
        </p>
      </div>
    </div>
  );
}

export default GiftBoxPopup;
