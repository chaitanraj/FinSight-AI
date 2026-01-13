import React, { useCallback, useContext, useState } from 'react'
import { TrendingDown, TrendingUp, Layers, Sparkles, Type, AlertTriangle, Info, ChevronRight, Brain, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/context/AuthContext';
import AnomalyCard from '../AnomalyCard/AnomalyCard';
import InsightModal from '@/modals/InsightModals/InsightModal';
import GlobalProphetCard from '../GlobalProphetCard/GlobalProphetCard';
import GlobalProphetModal from '@/modals/GlobalProphetModal/GlobalProphetModal';
import CategoryProphetModal from '@/modals/CategoryProphetModal/CategoryProphetModal';
import CategoryProphetCard from '../CategoryProphetCard/CategoryProphetCard';

const MasterCard = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const INSIGHT_UI = {
    warning: {
      // anomaly 
      icon: Activity,
      bg: "bg-amber-500/10 border-amber-500/30",
      iconColor: "text-amber-400",
      sweep: "via-amber-400/10",
    },
    success: {
      icon: TrendingDown,
      bg: "bg-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      sweep: "via-emerald-400/10",
    },
    info: {
      // category_prediction
      icon: Layers,
      bg: "bg-cyan-500/10 border-cyan-500/30",
      iconColor: "text-cyan-400",
      sweep: "via-cyan-400/10",
    },
    prediction: {
      // prophet prediction
      icon: Brain,
      bg: "bg-purple-700/10 border-purple-600/30",
      iconColor: "text-purple-500",
      sweep: "via-purple-500/10",
    },
    drop: {
      icon: TrendingDown,
      bg: "bg-green-500/10 border-green-500/30",
      iconColor: "text-green-400",
      sweep: "via-green-400/10",
    },
  };


  const [aiInsights, setAiInsights] = useState([]);

  const addInsight = useCallback((insight) => {
    setAiInsights(prev => {
      const filtered = prev.filter(i => i.meta?.modelType !== insight.meta?.modelType);
      return [...filtered, insight];
    });
  }, []);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <AnomalyCard onInsight={addInsight} />
      <GlobalProphetCard onInsight={addInsight} />
      <CategoryProphetCard onInsight={addInsight} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <AnimatePresence mode="wait">
          {aiInsights.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-center justify-center py-12 px-6"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(16, 185, 129, 0.2)',
                    '0 0 40px rgba(16, 185, 129, 0.4)',
                    '0 0 20px rgba(16, 185, 129, 0.2)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-emerald-500/5"
              />

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 mb-4"
              >
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <Sparkles className="w-12 h-12 text-emerald-400" />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-center space-y-3"
              >
                <motion.p
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-lg font-medium bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
                >
                  FinSight AI is analyzing your data
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-sm"
                >
                  Intelligent insights will appear here as patterns emerge
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-1 pt-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">FinSight-AI Insights</h3>
                </div>

                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(16, 185, 129, 0.1)',
                      '0 0 20px rgba(16, 185, 129, 0.2)',
                      '0 0 10px rgba(16, 185, 129, 0.1)',
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-emerald-500/5"
                />

                <motion.div
                  key="insights"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {aiInsights.map((insight, index) => {
                    console.log('aiInsights:', aiInsights);
                    const ui = INSIGHT_UI[insight.type];
                    const Icon = ui.icon;
                    const isPlaceholder = insight.meta?.isPlaceholder;

                    return (
                      <motion.div
                        key={index}
                        onClick={() => !isPlaceholder && insight.meta && setSelectedInsight(insight)}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        className={`p-4 rounded-xl border relative overflow-hidden ${isPlaceholder ? 'cursor-default' : 'cursor-pointer'
                          } ${ui.bg}`}
                      >
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 2,
                            delay: index * 0.3,
                            repeat: 0,
                          }}
                          className={`absolute inset-0 ${insight.type === 'warning'
                            ? 'bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent'
                            : insight.type === 'success'
                              ? 'bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent'
                              : insight.type === 'prediction'
                                ? 'bg-gradient-to-r from-transparent via-orange-400/10 to-transparent'

                                : 'bg-gradient-to-r from-transparent via-blue-400/10 to-transparent'
                            }`}
                        />

                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.2,
                            repeat: 0,
                          }}
                        >
                          <Icon className={`w-5 h-5 mb-3 ${ui.iconColor}`} />
                        </motion.div>

                        <div className="relative z-10 space-y-3">
                          <div className="h-[8vh] mb-5">
                            <p className="text-sm text-gray-100 leading-relaxed">
                              {insight.message}
                            </p>
                          </div>

                          {isPlaceholder ? (
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-700/50">
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex items-center gap-1"
                              >
                                <span className="text-xs text-gray-400">
                                  {insight.meta.modelType === 'prophet' ? 'Prophet AI' : 'Model'} is learning...
                                </span>
                              </motion.div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 pt-2 border-t border-gray-700/50">
                                {insight.meta.modelType === 'prophet' ? (
                                  <div className="flex items-center gap-1">
                                    <span className="text-3xl font-bold text-orange-400">
                                      {insight.meta.displayValue}
                                    </span>
                                    <span className="text-xs text-gray-300">
                                      predicted
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <span className="text-3xl font-bold text-yellow-400">
                                      {insight.meta.display}
                                    </span>
                                    <span className="text-xs text-gray-300">
                                      unusual days detected
                                    </span>
                                  </div>
                                )}
                              </div>

                              <button
                                className="cursor-pointer absolute bottom-3 right-3 text-md text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors z-20"
                              >
                                <span>More info</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {selectedInsight?.meta?.modelType === 'prophet' ? (
        <GlobalProphetModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
      ) : selectedInsight?.meta?.modelType === 'category_prophet' ? (
        <CategoryProphetModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
      ) : (
        <InsightModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
      )}
    </div>
  )
}

export default MasterCard;
