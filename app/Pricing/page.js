"use client";
import { Check, X, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    // <div className="min-h-screen w-full bg-gray-900 text-gray-300 pt-24 pb-20 overflow-x-hidden">
    <>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 mt-15 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-emerald-400">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400">
            Start taking control of your finances for free, or unlock deep granular insights with Pro.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center"
        >
          
          {/* TIER 1: Fin-Free */}
          <motion.div 
            variants={cardVariants}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Fin-Free</h3>
              <p className="text-gray-400 text-sm">Essential tools for budget tracking.</p>
            </div>
            
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">₹0</span>
              <span className="text-gray-500">/month</span>
            </div>

            <Link href="/signup" className="block w-full py-4 px-6 bg-gray-700 hover:bg-gray-600 text-white text-center font-bold rounded-xl transition-all mb-10">
              Get Started Free
            </Link>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Features Included:</p>
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-gray-300">Anomaly Detection Model</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-gray-300">Monthly Forecasts available quarterly</span>
              </div>

              {/* Feature 3 (Excluded) */}
              <div className="flex items-start gap-3 opacity-50">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-400 line-through decoration-gray-500">Category-wise Predictions</span>
              </div>
            </div>
          </motion.div>


          {/* TIER 2: Fin-PRO */}
          <motion.div 
            variants={cardVariants}
            className="bg-gray-900/80 backdrop-blur-md border-2 border-emerald-500 rounded-3xl p-8 lg:p-10 relative transform md:-translate-y-4 shadow-2xl shadow-emerald-900/20"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-emerald-500 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Recommended
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  Fin-PRO 
                  <Crown className="w-5 h-5 text-amber-400" />
                </h3>
                <p className="text-emerald-200/80 text-sm">Full predictive power unlocked.</p>
              </div>
            </div>
            
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">₹500</span>
              <span className="text-gray-400">/month</span>
            </div>

            <Link href="/upgrade" className="block w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-gray-900 text-center font-bold rounded-xl transition-all mb-10 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1">
              Upgrade to Pro
            </Link>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Everything in Free, plus:</p>
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gray-900 font-bold" />
                </div>
                <span className="text-white font-medium">Anomaly Detection Model</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gray-900 font-bold" />
                </div>
                <span className="text-white font-medium">Monthly forecast available always</span>
              </div>

              {/* Feature 3 (Included) */}
              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-emerald-500/20 -mx-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gray-900 font-bold" />
                </div>
                <div>
                  <span className="text-white font-bold block">Category-wise Predictions</span>
                  <span className="text-xs text-gray-400 block mt-1">
                    See exactly how much you'll spend on "Food" vs "Transport" next month.
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* Money Back / Trust Footer */}
        <div className="mt-20 text-center border-t mb-15 border-gray-800 pt-10">
          <p className="text-gray-500 flex items-center justify-center gap-2 text-sm">
            <Zap className="w-4 h-4" />
            Cancel anytime. No hidden fees. Secure payment via Stripe/Razorpay.
          </p>
        </div>

      </div>
      </>
  );
}
