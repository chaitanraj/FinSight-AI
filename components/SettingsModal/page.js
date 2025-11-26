"use client"
import React from 'react';
import { X, Check } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from "@/context/AuthContext";

const SettingsModal = ({ onClose }) => {
  const { currency, setCurrency, currencies } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-53 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-slate-700/50 shadow-2xl shadow-emerald-500/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 cursor-pointer hover:text-white transition-colors hover:rotate-90 duration-300"
          >
            <X className="w-6 h-6 " />
          </button>
        </div>
        
        <div>
          <label className="block text-slate-300 text-lg font-medium mb-3">
            Preferred Currency
          </label>
          <p className="text-slate-400 text-sm mb-4">
            This will apply to all your expenses and reports
          </p>
          
          <div className="space-y-2">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  // Auto-close after selection (optional)
                  setTimeout(() => onClose(), 500);
                }}
                className={`w-full flex items-center cursor-pointer justify-between p-4 rounded-xl transition-all duration-300 ${
                  currency === c.code
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.symbol}</span>
                  <div className="text-left">
                    <div className="font-semibold">{c.code}</div>
                    <div className={`text-sm ${currency === c.code ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {c.name}
                    </div>
                  </div>
                </div>
                {currency === c.code && (
                  <Check className="w-5 h-5 animate-scaleIn" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;