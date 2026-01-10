"use client";
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  Activity, 
  Search,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  return (
    <>
      
      {/* Background Ambience */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. HERO HEADER */}
        <div className="text-center mb-24 mt-[5vh] max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/20 mb-6">
            <Zap className="w-4 h-4" />
            <span>Under the Hood</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Not Just a Tracker.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              A Financial Intelligence System.
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            FinSight AI replaces manual spreadsheets with three powerful machine learning models working in harmony to categorize, predict, and protect your wealth.
          </p>
        </div>

        {/* 2. FEATURE 1: FORECASTING (PROPHET) */}
        <div className="mb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Prophet Forecasting Engine</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Stop guessing your end-of-month balance. We integrated <strong>Meta Prophet</strong>, an advanced forecasting procedure designed for high-precision time series prediction.
            </p>
            <ul className="space-y-4">
              {[
                "Analyzes seasonality (e.g., higher spending on weekends/holidays)",
                "Adapts to your personal salary and bill cycles",
                "Predicts category-specific spending (e.g., 'Groceries next month: $450')"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Abstract UI Representation */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-sm text-gray-400">Forecasted Balance</p>
                  <p className="text-3xl font-bold text-white">$12,450.00</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-mono">+12%</span>
              </div>
              {/* Fake Graph */}
              <div className="h-40 flex items-end justify-between gap-2">
                {[40, 65, 55, 80, 60, 90, 100].map((h, i) => (
                  <div key={i} className="w-full bg-emerald-500/20 rounded-t-lg relative group">
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ${i > 4 ? 'bg-emerald-500/50 dashed-border' : 'bg-emerald-500'}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span className="text-emerald-400">Next Month (Predicted)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. FEATURE 2: ANOMALY DETECTION */}
        <div className="mb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
              
              <div className="space-y-4">
                {/* Normal Transaction */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-700 rounded"></div>
                </div>
                
                {/* Anomaly Transaction */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 relative">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-amber-500 rounded-r"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Unusual Spike</p>
                      <p className="text-xs text-amber-400">Deviation detected</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-white">$499.00</p>
                </div>

                {/* Normal Transaction */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Isolation Forest Anomaly Detection</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Your financial watchdog. This model learns your "normal" behavior baseline and instantly flags statistical outliers.
            </p>
            <ul className="space-y-4">
              {[
                "Detects subscription price hikes instantly",
                "Flags accidental double-charges",
                "Alerts you to 'lifestyle creep' before it becomes a habit"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4. FEATURE 3: SMART CATEGORIZATION */}
        <div className="mb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">NLP Categorization</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Manual tagging is a thing of the past. Our Natural Language Processing engine interprets merchant names and descriptions to auto-sort your life.
            </p>
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400 font-mono text-sm">"uber_trip_nyc_2024..."</span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">TRANSPORT</span>
              </div>
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400 font-mono text-sm">"wholefds_market_..."</span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold">GROCERIES</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <PieChart className="w-full h-full text-gray-800 drop-shadow-2xl" />
              {/* Floating labels */}
              <div className="absolute top-0 right-0 bg-gray-800/90 backdrop-blur px-4 py-2 rounded-xl border border-blue-500/30 shadow-lg">
                <p className="text-xs text-gray-400">Accuracy</p>
                <p className="text-lg font-bold text-blue-400">98.5%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 5. CTA FOOTER */}
        <div className="text-center mb-[5vh] bg-emerald-900/20 border border-emerald-500/20 rounded-[3rem] p-12">
          <h2 className="text-3xl font-bold text-white mb-6">Experience the Power of Tri-Model AI</h2>
          <Link href="/Dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-900 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20">
            Start Analyzing My Finances
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </>
  );
}
