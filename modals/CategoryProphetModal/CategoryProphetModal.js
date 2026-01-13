import { motion } from "framer-motion";
import { X,Layers, TrendingUp, TrendingDown, Brain, Minus } from "lucide-react";
import { useEffect } from "react";

const CategoryProphetModal = ({ insight, onClose }) => {

  useEffect(() => {
    if (insight) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [insight]);

  if (!insight || insight.meta?.modelType !== 'category_prophet') return null;

  const { reliableCategories = [], lowConfidenceCategories = [] } = insight.meta;

  const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔', Groceries: '🛒', Rent: '🏠', Transport: '🚗',
      Utilities: '💡', Shopping: '🛍️', Entertainment: '🎮'
    };
    return icons[category] || '📊';
  };

  const getTrendIcon = (trend) => {
    if (trend > 2) return <TrendingUp className="w-4 h-4 text-red-400" />;
    if (trend < -2) return <TrendingDown className="w-4 h-4 text-green-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950/30 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex-none bg-gray-900/95 backdrop-blur border-b border-gray-800 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Category-Wise Predictions</h2>
              <p className="text-sm text-gray-400">Powered by Prophet AI from Meta</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 cursor-pointer rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-purple-400 transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto modal-scroll p-6 space-y-6">
          
          {/* Overview Banner */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 mt-0.5">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-purple-300 mb-1">
                  AI-Powered Category Analysis
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Using Finsight-AI model, we've analyzed your spending patterns across categories. 
                  Categories with <span className="text-purple-400 font-medium">medium to high confidence</span> show 
                  reliable predictions based on historical data, while those with <span className="text-amber-400 font-medium">low confidence</span> need 
                  more tracking time for accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Total Categories</p>
              <p className="text-2xl font-bold text-white">
                {reliableCategories.length + lowConfidenceCategories.length}
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-md text-purple-400 mb-1">Reliable Forecasts</p>
              <p className="text-2xl font-bold text-purple-400">
                {reliableCategories.length}
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <p className="text-xs text-amber-400 mb-1">Building Data</p>
              <p className="text-2xl font-bold text-amber-400">
                {lowConfidenceCategories.length}
              </p>
            </div>
          </div>
          
          {/* Reliable Predictions */}
          {reliableCategories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-gray-200 uppercase tracking-wider">
                  Reliable Predictions ({reliableCategories.length})
                </h3>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                  Prophet AI
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                These categories have sufficient historical data (6+ months) for accurate forecasting using advanced AI models.
              </p>
              <div className="space-y-3">
                {reliableCategories.map(([category, data]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(category)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{category}</h4>
                          <p className="text-xs text-gray-500">
                            {data.confidence === 'high' ? '🎯 High confidence' : 
                             data.confidence === 'medium' ? '✓ Medium confidence' : 'Reliable forecast'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(data.trend_percent)}
                        <span className={`text-sm font-medium ${
                          data.trend_percent > 2 ? 'text-red-400' :
                          data.trend_percent < -2 ? 'text-green-400' :
                          'text-gray-400'
                        }`}>
                          {data.trend_percent > 0 ? '+' : ''}{data.trend_percent.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Previous Month</p>
                        <p className="text-lg font-bold text-white">
                          ₹{data.last_month_actual.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Actual spending</p>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-3">
                        <p className="text-xs text-purple-400 mb-1">Next Month</p>
                        <p className="text-lg font-bold text-purple-400">
                          ₹{Math.round(data.forecast_next_month).toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">AI forecast</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        <span className="text-purple-400 font-medium">{data.months_of_data}</span> months analyzed
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Low Confidence Predictions */}
          {lowConfidenceCategories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-gray-200 uppercase tracking-wider">
                  Early Predictions ({lowConfidenceCategories.length})
                </h3>
                <span className="text-sm text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  Limited Data
                </span>
              </div>
              <p className="text-md text-gray-500 mb-4">
                These categories need more historical data for reliable AI predictions. Keep tracking for better accuracy!
              </p>
              <div className="space-y-3">
                {lowConfidenceCategories.map(([category, data]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl opacity-60">{getCategoryIcon(category)}</span>
                        <div>
                          <h4 className="text-base font-medium text-gray-300">{category}</h4>
                          <p className="text-xs text-gray-500">
                            {data.months_of_data} months tracked
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                        Low confidence
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-900/30 rounded-lg p-2">
                        <p className="text-xs text-gray-600">Previous</p>
                        <p className="text-sm font-semibold text-gray-400">
                          ₹{data.last_month_actual.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="bg-amber-500/10 rounded-lg p-2">
                        <p className="text-xs text-amber-600">Estimate</p>
                        <p className="text-sm font-semibold text-amber-400">
                          ₹{Math.round(data.forecast_next_month).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-700/30">
                      <p className="text-xs text-gray-500">
                        💡 Track for <span className="text-amber-400 font-medium">{6 - data.months_of_data}+ more months</span> to 
                        unlock Finsight AI predictions with higher accuracy
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Info */}
          {/* Footer Info */}
<div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
    About FinSight AI
  </h4>
  <p className="text-xs text-gray-400 leading-relaxed">
    FinSight AI analyzes your spending history to identify trends, seasonal patterns, and unusual changes. 
    Using statistical forecasting techniques, it estimates future expenses and highlights how confident the 
    prediction is. As you continue adding expenses regularly, FinSight AI adapts and delivers more reliable insights.
  </p>
</div>


        </div>

        <style jsx global>{`
          .modal-scroll {
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
            background: linear-gradient(180deg, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.6));
            border-radius: 10px;
            border: 2px solid rgba(17, 24, 39, 0.4);
          }
          
          .modal-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(168, 85, 247, 0.8));
          }

          .modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(168, 85, 247, 0.5) rgba(30, 25, 25, 0.4);
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default CategoryProphetModal;