"use client";
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Lock, 
  Database,
  Code2,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pt-16 sm:pt-20 pb-12 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. HERO SECTION */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16 sm:mb-24 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full text-sm font-medium text-emerald-400 border border-emerald-500/20">
              Our Mission
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8 px-2">
            Democratizing Financial <br />
            <span className="text-emerald-400">Intelligence for Everyone</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed px-2">
            We believe financial clarity shouldn&apos;t require a finance degree. 
            FinSight AI bridges the gap between raw data and actionable foresight, 
            empowering you to move from reactive tracking to proactive wealth building.
          </motion.p>
        </motion.div>

        {/* 2. THE TECH STACK (Tri-Model AI) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20 sm:mb-32"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 px-2">Powered by a Tri-Model Intelligence</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
              We don't rely on simple algorithms. Our core is built on three distinct machine learning models working in harmony.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Model 1: Categorization */}
            <motion.div variants={itemVariants} className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-6 sm:p-8 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Database className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Smart Categorization</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                Our NLP engine understands transaction context. It instantly classifies "Uber" as Transport or "Spotify" as Subscriptions without manual tagging.
              </p>
              <span className="text-xs font-mono text-blue-400/80 bg-blue-500/10 px-3 py-1 rounded-full">NLP Classification</span>
            </motion.div>

            {/* Model 2: Forecasting (Prophet) */}
            <motion.div variants={itemVariants} className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 className="w-20 h-20 sm:w-24 sm:h-24 text-emerald-500" />
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 relative z-10">Predictive Forecasting</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 relative z-10">
                We leverage <strong className="text-white">Meta Prophet</strong>, an advanced time-series forecasting model, to analyze seasonal trends and predict your future balance with high accuracy.
              </p>
              <span className="text-xs font-mono text-emerald-400/80 bg-emerald-500/10 px-3 py-1 rounded-full relative z-10">Powered by Meta Prophet</span>
            </motion.div>

            {/* Model 3: Anomaly Detection */}
            <motion.div variants={itemVariants} className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-6 sm:p-8 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Anomaly Detection</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                Using statistical outlier detection (Isolation Forest), we act as a watchdog for your wallet, flagging unusual spending spikes immediately.
              </p>
              <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-3 py-1 rounded-full">Isolation Forest</span >
            </motion.div>
          </div>
        </motion.div>

        {/* 3. PRIVACY & SECURITY */}
        <div id="privacy">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-20 sm:mb-32"
        >
          {/* Left Column: The Real Promise */}
          <div>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                Data Integrity
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Your Data Serves <br />
              <span className="text-emerald-400">Only You.</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-6 sm:mb-8">
              We believe in transparency. When you save an expense, it is stored securely in our database solely to provide you with history, insights, and forecasts. We do not share your financial life with anyone else.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">Secure Storage</h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Your data is stored in a secure cloud environment protected by industry-standard authentication and access controls.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">Data Usage Policy</h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Your transaction history is used <strong>strictly</strong> to train your personal AI models (Forecast & Anomaly) and generate your dashboard reports.
                  </p>
                </div>
              </div>

              {/* Feature 3: No Ads */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">No Ad Tracking</h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    We are building a tool for you, not for advertisers. We do not sell your spending habits or profile to third-party ad networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Visual Trust Card */}
          <div className="relative lg:sticky lg:top-24 w-full">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] sm:blur-[100px] rounded-full opacity-20"></div>
            
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
              {/* Header */}
              <div className="bg-gray-800/50 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500">data_access_policy</div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 font-mono">DATA FLOW:</p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm">
                    <span>You</span>
                    <span className="text-emerald-500">→</span>
                    <span className="whitespace-nowrap">Secure DB</span>
                    <span className="text-emerald-500">→</span>
                    <span className="whitespace-nowrap">AI Engine</span>
                    <span className="text-emerald-500">→</span>
                    <span className="whitespace-nowrap">Your Dashboard</span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                  <p className="text-xs sm:text-sm text-red-400 mb-1 font-mono">RESTRICTED:</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    No access for advertisers.<br/>
                    No data brokerage.<br/>
                    No public sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>


        {/* 4. CALL TO ACTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center bg-gradient-to-br from-emerald-900/40 to-gray-900 border border-emerald-500/20 rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 relative z-10 px-2">
            Ready to Predict Your Financial Future?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10 px-4">
            Join thousands of users who have stopped guessing and started planning with FinSight AI's predictive insights.
          </p>
          
          <Link href="/Dashboard" className="relative z-10 inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-900 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20">
            Get Started Free
          </Link>
        </motion.div>

      </div>
    </div>
  );
}