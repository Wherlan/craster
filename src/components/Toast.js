import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function Toast({ id, message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: 'bg-green-500/20 border-green-500/30',
    error: 'bg-red-500/20 border-red-500/30',
    info: 'bg-blue-500/20 border-blue-500/30',
    warning: 'bg-yellow-500/20 border-yellow-500/30',
  }[type];

  const textColor = {
    success: 'text-green-300',
    error: 'text-red-300',
    info: 'text-blue-300',
    warning: 'text-yellow-300',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  }[type];

  return (
    <div className={`fixed top-6 right-6 max-w-sm z-50 flex items-start gap-3 p-4 rounded-xl border ${bgColor} backdrop-blur-sm animate-in slide-in-from-right`}>
      <Icon size={20} className={textColor} />
      <div className="flex-1 text-sm text-white">{message}</div>
      <button
        onClick={onClose}
        className="text-white/60 hover:text-white transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-0 right-0 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto mb-2">
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
