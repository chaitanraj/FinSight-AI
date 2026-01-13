import { motion } from "framer-motion";
import { TrendingUp, Calendar, IndianRupee, Tag, AlertTriangle } from "lucide-react";
import { useState } from "react";

const AnomalyDetails = ({ meta }) => {
  const { anomalyDays, anomalies, averageExpense } = meta;
  
  // Pagination state and sorting
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 7;
  const sortedAnomalies = anomalies.sort((a, b) => a.score - b.score);
  const displayedAnomalies = showAll ? sortedAnomalies : sortedAnomalies.slice(0, displayLimit);

  // Calculate severity counts
  const severeCount = anomalies.filter(a => a.score < -0.2).length;
  const moderateCount = anomalies.filter(a => a.score >= -0.2 && a.score < -0.1).length;
  const mildCount = anomalies.filter(a => a.score >= -0.1).length;

  return (
    <div className="space-y-6">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Spending Anomalies Detected
          </h3>
        </div>

        <p className="text-gray-300 leading-relaxed">
          <span className="text-yellow-400 font-semibold">{anomalyDays} days</span> showed unusual spending compared to your normal pattern.
        </p>
      </motion.div>

      {/* Stats grid - avg and largest spike */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <IndianRupee className="w-3 h-3" />
            <span>Avg Daily Spend</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{averageExpense?.toLocaleString('en-IN')}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Largest Spike</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            ₹{Math.max(...anomalies.map(a => a.amount))?.toLocaleString('en-IN')}
          </div>
        </motion.div>
      </div>

      {/* Severity breakdown - only for 8+ anomalies */}
      {anomalyDays >= 8 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 border border-gray-700 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-gray-300 mb-3">Severity Distribution</h4>
         <div className="space-y-2">
            {severeCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-400">⚠️ Severe</span>
                <span className="text-sm font-medium text-red-400">{severeCount} days</span>
              </div>
            )}
            {moderateCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-400">⚡ Moderate</span>
                <span className="text-sm font-medium text-yellow-400">{moderateCount} days</span>
              </div>
            )}
            {mildCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-400">ℹ️ Mild</span>
                <span className="text-sm font-medium text-blue-400">{mildCount} days</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {/* Section header with count */}
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-gray-200 uppercase tracking-wider">
            Unusual Days {anomalyDays > displayLimit && `(Top ${displayLimit} of ${anomalyDays})`}
          </h4>
          <span className="text-xs text-gray-500">Sorted by severity</span>
        </div>
        
        {/* Anomaly cards list */}
        <div className="space-y-3">
          {displayedAnomalies.map((day, i) => {
            // Determine severity level
            const severity = 
              day.score < -0.2 ? { label: 'Severe', color: 'text-red-400 bg-red-500/10' } :
              day.score < -0.1 ? { label: 'Moderate', color: 'text-yellow-400 bg-yellow-500/10' } :
              { label: 'Mild', color: 'text-blue-400 bg-blue-500/10' };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="group border border-gray-800 hover:border-emerald-500/30 rounded-xl p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
              >
                {/* Date and amount header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-200">
                      {new Date(day.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${severity.color}`}>
                      {severity.label}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      ₹{day.amount?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">
                      +₹{(day.amount - averageExpense)?.toLocaleString('en-IN')} above avg
                    </div>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="space-y-2 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <Tag className="w-3 h-3" />
                    <span>Category Breakdown</span>
                  </div>
                  
                  {day.categories.map((c, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {c.category}
                      </span>
                      <span className="text-gray-300 font-medium">
                        ₹{c.amount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all toggle button */}
        {anomalyDays > displayLimit && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 py-3 cursor-pointer rounded-lg border border-gray-700 hover:border-emerald-500/50 bg-gray-800/30 hover:bg-gray-800/50 text-sm text-gray-300 hover:text-emerald-400 transition-all duration-200"
          >
            {showAll ? 'Show Less' : `View All ${anomalyDays} Days`}
          </motion.button>
        )}
      </div>

      {/* Footer info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
      >
        <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
        <p className="text-xs text-gray-300 leading-relaxed">
          Anomalies are ranked by severity using ML-based deviation scores. Days marked "Severe" deviate significantly from your spending patterns.
        </p>
      </motion.div>
    </div>
  );
};

export default AnomalyDetails;