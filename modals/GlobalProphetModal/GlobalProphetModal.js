import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown,Minus, AlertTriangle, Calendar, Activity, Brain, Info } from "lucide-react";
import { useEffect } from "react";

const GlobalProphetModal = ({ insight, onClose }) => {

  useEffect(() => {
    if (insight) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [insight]);

  if (!insight || insight.meta?.modelType !== 'prophet') return null;

  const {
    predictionValue,
    lastMonthActual,
    trendPercent,
    confidence,
    displayValue,
    showWarning
  } = insight.meta;

  const difference = predictionValue - lastMonthActual;
  const isIncrease = difference > 0;
  const confidenceWidth =
    confidence === 'high' ? 100 :
      confidence === 'medium' ? 66 : 33;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" // Fixed z-index typo (z-57 -> z-50)
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          // CHANGED: Added flex flex-col, REMOVED overflow/modal-scroll
          className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        >

          {/* Header - Fixed */}
          {/* CHANGED: Added flex-none */}
          <div className="flex-none sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 p-6 flex items-center justify-between z-10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-lg bg-orange-500/10"
              >
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">Expense Forecast</h2>
                <p className="text-sm text-gray-400">AI-powered expense prediction</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Scrollable Content Container */}
          {/* CHANGED: Added wrapper div with flex-1, overflow-y-auto, modal-scroll */}
          <div className="flex-1 overflow-y-auto modal-scroll p-6">

            {/* Confidence message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-200 text-center mb-6"
            >
              {insight.message}
            </motion.p>

            <div className="space-y-6">

              {/* Warning Banner */}
              {/* Warning/Info Banners */}
              {confidence === 'low' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-extrabold text-amber-400">Limited Data Available</p>
                    <p className="text-sm text-gray-300 mt-1">
                      We need more expense history to make accurate predictions. Keep tracking for at least 3-6 months for reliable forecasts.
                    </p>
                  </div>
                </motion.div>
              )}
              {confidence === 'medium' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3"
                >
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-extrabold text-blue-400">
                      {Math.abs(trendPercent) > 30 ? 'Significant Change Detected' : 'Reliable Prediction'}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      {Math.abs(trendPercent) > 30
                        ? `This ${trendPercent > 0 ? 'increase' : 'decrease'} is notable. ${trendPercent > 0
                          ? 'Review your upcoming expenses and adjust your budget if needed.'
                          : 'Great job reducing spending! Keep tracking to maintain this trend.'
                        }`
                        : 'Based on your spending history, this forecast is reliable. Factor it into your monthly budget planning.'
                      }
                    </p>
                  </div>
                </motion.div>
              )}  {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Last Month */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-400 font-medium">Last Month</p>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ₹{lastMonthActual.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Actual spending</p>
                </motion.div>

                {/* Predicted */}
                {/* Predicted */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2 }}
  className={`backdrop-blur border rounded-lg p-4 ${
    trendPercent > 5 
      ? 'bg-orange-500/10 border-orange-500/30' 
      : trendPercent < -5 
      ? 'bg-green-500/10 border-green-500/30'
      : 'bg-gray-500/10 border-gray-500/30'
  }`}
>
  <div className="flex items-center gap-2 mb-2">
    {trendPercent > 5 ? (
      <TrendingUp className="w-4 h-4 text-orange-400" />
    ) : trendPercent < -5 ? (
      <TrendingDown className="w-4 h-4 text-green-400" />
    ) : (
      <Minus className="w-4 h-4 text-gray-400" />
    )}
    <p className={`text-xs font-medium ${
      trendPercent > 5 
        ? 'text-orange-400' 
        : trendPercent < -5 
        ? 'text-green-400'
        : 'text-gray-400'
    }`}>
      Predicted
    </p>
  </div>
  <p className={`text-2xl font-bold ${
    trendPercent > 5 
      ? 'text-orange-400' 
      : trendPercent < -5 
      ? 'text-green-400'
      : 'text-gray-400'
  }`}>
    {displayValue}
  </p>
  <p className="text-xs text-gray-500 mt-1">
    Next month forecast
    {trendPercent !== undefined && (
      <span className={`ml-1 font-medium ${
        trendPercent > 5 
          ? 'text-orange-400' 
          : trendPercent < -5 
          ? 'text-green-400'
          : 'text-gray-400'
      }`}>
        ({trendPercent > 0 ? '+' : ''}{trendPercent}%)
      </span>
    )}
  </p>
</motion.div>
              </div>

              {/* Trend Analysis Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`${isIncrease ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'
                  } border rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isIncrease ? (
                      <TrendingUp className="w-5 h-5 text-red-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-green-400" />
                    )}
                    <p className="text-sm font-medium text-white">Trend Analysis</p>
                  </div>
                  <span className={`text-lg font-bold ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                    {isIncrease ? '+' : ''}{trendPercent}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Expected change</span>
                    <span className={`font-medium ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                      {isIncrease ? '+' : ''}₹{Math.abs(difference).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.abs(trendPercent), 100)}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-full ${isIncrease ? 'bg-red-500' : 'bg-green-500'}`}
                    />
                  </div>
                </div>
              </motion.div>

              {/* {Prediction Confidence} */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <p className="text-sm font-medium text-white">Prediction Confidence</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                    confidence === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                    {confidence.toUpperCase()}
                  </span>
                </div>

                {/* Confidence Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidenceWidth}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={`h-full ${confidence === 'high' ? 'bg-green-500' :
                      confidence === 'medium' ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </motion.div>

              {/* Insights & Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-400">What this means</p>

                    {trendPercent > 50 && (
                      <p className="text-xs text-gray-300">
                        • Your expenses are predicted to increase significantly. Review your upcoming bills and discretionary spending.
                      </p>
                    )}

                    {trendPercent > 0 && trendPercent <= 50 && (
                      <p className="text-xs text-gray-300">
                        • Moderate increase expected. This could be due to seasonal variations or planned expenses.
                      </p>
                    )}

                    {trendPercent < 0 && (
                      <p className="text-xs text-gray-300">
                        • Great job! Your spending is trending downward. Keep up the good financial habits.
                      </p>
                    )}

                    {confidence === 'low' && (
                      <p className="text-xs text-gray-300">
                        • Add more expense entries to improve prediction accuracy for future months.
                      </p>
                    )}

                    <p className="text-xs text-gray-300">
                      • This prediction is based on your historical spending patterns using Finsight AI forecasting.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 pt-2 border-t border-gray-800"
              >
                <Activity className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-500">
                  Powered by FinSight-AI prediction model.
                </p>
              </motion.div>

            </div>
          </div>

        </motion.div>

        <style jsx global>{`
          .modal-scroll {
            /* Smooth scrolling behavior */
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          .modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          
          .modal-scroll::-webkit-scrollbar-track {
            background: rgba(30, 25, 25, 0.4); 
            border-radius: 10px;
          }
          
          .modal-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(
              180deg, 
              rgba(234, 88, 12, 0.4), 
              rgba(234, 88, 12, 0.6)
            );
            border-radius: 10px;
            border: 2px solid rgba(17, 24, 39, 0.4);
          }
          
          .modal-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg, 
              rgba(234, 88, 12, 0.6), 
              rgba(234, 88, 12, 0.8)
            );
          }

          /* Firefox scrollbar */
          .modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(234, 88, 12, 0.5) rgba(30, 25, 25, 0.4);
          }
        `}</style>

      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalProphetModal;
