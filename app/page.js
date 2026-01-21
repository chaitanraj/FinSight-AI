"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, ChartPie as PieChart, Shield, CircleCheck as CheckCircle2, Smartphone, CreditCard, ChartBar as BarChart3, Clock, Calculator, FileCheck, ChevronDown } from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);


  useEffect(() => {
    setIsVisible(true);
  }, []);


  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Hero Section */}
        <section className="pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`transition-all duration-1000 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-200 shadow-sm border border-emerald-500/20">
                  AI-Powered Financial Intelligence
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Predict Your Spending, <span className="text-emerald-400">Master Your Future</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                FinSight AI goes beyond tracking. We use advanced AI to categorize expenses automatically, detect spending anomalies, and forecast your future financial health.
              </p>


              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/Dashboard" className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 flex cursor-pointer items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
                  Start Forecasting
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/Features" className="cursor-pointer px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-center border border-emerald-500/30 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-md hover:shadow-emerald-200/20 hover:shadow-l hover:scale-105">
                  See How AI Works
                </Link>
              </div>


              {/* Trust Badges */}
              <div>
                <p className="text-sm text-gray-400 mb-4">Powered by advanced machine learning models</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Smart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Predictive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Accurate</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Right Content - Phone Mockup */}
            <div
              className={`relative transition-all duration-1000 delay-300 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative mx-auto max-w-sm lg:max-w-md">
                {/* Main Phone */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl hover:shadow-2xl hover:border-emerald-500/40  shadow-2xl p-3 transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-gray-800/90 rounded-[2rem] p-6 h-[600px] relative overflow-hidden">
                    {/* Phone Header */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl"></div>


                    {/* Content */}
                    <div className="pt-8">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-white-600">FinSight Dashboard</span>
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      </div>


                      {/* Balance Card */}
                      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 mb-6 text-white shadow-lg">
                        <p className="text-sm opacity-90 mb-2">Forecasted Balance</p>
                        <p className="text-3xl font-bold mb-4">$24,567.89</p>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="opacity-80">Anomaly</p>
                            <p className="font-semibold text-red-300">Found (2)</p>
                          </div>
                          <div>
                            <p className="opacity-80">Next Month</p>
                            <p className="font-semibold">+$450 Est.</p>
                          </div>
                        </div>
                      </div>


                      {/* Quick Actions */}
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                          { icon: TrendingUp, label: 'Forecast' },
                          { icon: CreditCard, label: 'Add Exp' },
                          { icon: PieChart, label: 'Report' },
                          { icon: BarChart3, label: 'Anomalies' }
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <item.icon className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                            <p className="text-xs text-gray-600">{item.label}</p>
                          </div>
                        ))}
                      </div>


                      {/* Transactions */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white-700">Recent AI Insights</h3>
                        {[
                          { name: 'Unusual Spike', amount: 'Warning', color: 'bg-red-100 text-red-600' },
                          { name: 'Shopping Trend', amount: '+15%', color: 'bg-green-100 text-green-600' },
                          { name: 'Predicted Bills', amount: '$450', color: 'bg-blue-100 text-blue-600' }
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            <span className={`text-sm font-bold ${item.color} px-3 py-1 rounded-lg`}>{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-32 bg-white rounded-3xl shadow-xl p-4 w-40 transform hover:scale-105 transition-transform duration-500 hidden lg:block">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <p className="text-xs mb-1">Prediction Accuracy</p>
                    <p className="text-xl font-bold">94%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-4" id="features">
          <div className="text-center mb-16">
            <p className="text-emerald-500 font-semibold mb-3">INTELLIGENT INSIGHTS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI Models That Understand<br />Your Spending Habits
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Don&apos;t just track where your money went. Understand why it went there and predict where it will go next with our triple-model AI system.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Smart Categorization',
                description: 'Stop manually tagging expenses. Our AI analyzes your transaction details and automatically categorizes them into shopping, bills, food, and more.',
                delay: '0'
              },
              {
                icon: PieChart,
                title: 'Expense Forecasting',
                description: 'Our Forecast Model analyzes your historical data to predict next month’s spending for specific categories, helping you budget proactively.',
                delay: '200'
              },
              {
                icon: Shield,
                title: 'Anomaly Detection',
                description: 'Spot unusual activity instantly. We flag days with irregular spending spikes so you can investigate and adjust your habits immediately.',
                delay: '400'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>


          <div className="text-center mt-12">
            <Link href="/Dashboard" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
              Try FinSight AI Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>


        {/* Steps Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">


            {/* Phone Mockup - Transactions */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="relative mx-auto max-w-sm">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-3 transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-6 h-[600px] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl"></div>


                    <div className="pt-8 text-white">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Categories</h2>
                        <span className="text-sm bg-white/20 px-4 py-2 rounded-full">Auto-Sorted</span>
                      </div>


                      <div className="space-y-4">
                        {[
                          { name: 'Grocery Run', company: 'Walmart', amount: '$150.00', color: 'bg-green-400' },
                          { name: 'Tech Upgrade', company: 'Apple Store', amount: '$999.00', color: 'bg-pink-400' },
                          { name: 'Utilities', company: 'City Power', amount: '$120.00', color: 'bg-blue-400' },
                          { name: 'Dining Out', company: 'Local Bistro', amount: '$65.00', color: 'bg-green-400' }
                        ].map((transaction, i) => (
                          <div
                            key={i}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors duration-300"
                          >
                            <div className={`w-12 h-12 ${transaction.color} rounded-xl flex items-center justify-center`}>
                              <PieChart className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{transaction.name}</p>
                              <p className="text-sm opacity-80">{transaction.company}</p>
                            </div>
                            <p className="font-bold text-lg">{transaction.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Right Content */}
            <div
              className={`order-1 lg:order-2 transition-all duration-1000 delay-300 transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <p className="text-emerald-500 font-semibold mb-3">EASY WORKFLOW</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                From Input to Insight<br />in 3 Steps
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Simply input your expense, and let our AI handle the rest. We organize, analyze, and visualize your data instantly.
              </p>


              <div className="space-y-6">
                {[
                  {
                    icon: Smartphone,
                    title: 'Add Your Expense',
                    description: 'Simply enter the amount and description. No need to manually select categories or tags.'
                  },
                  {
                    icon: CreditCard,
                    title: 'AI Sorts & Categorizes',
                    description: 'Our intelligent model instantly recognizes "Starbucks" as Food/Drink or "Uber" as Transport.'
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Get Forecasts & Visuals',
                    description: 'View your data in beautiful pie charts and see predictions for your upcoming month.'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                      <step.icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Why Thousands Trust Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <p className="text-emerald-500 font-semibold mb-3">DATA-DRIVEN DECISIONS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Users Rely on FinSight AI
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Stop guessing where your money goes. Use advanced analytics to pinpoint anomalies and plan for the future.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Detect Anomalies Instantly',
                description: 'Our anomaly detection model scans every transaction to flag unusual spending days that deviate from your normal patterns.'
              },
              {
                icon: Calculator,
                title: 'Predict Future Spending',
                description: 'Using the Prophet model, we analyze historical data to give you accurate forecasts for next month’s category-wise expenses.'
              },
              {
                icon: FileCheck,
                title: 'Visual Clarity',
                description: 'See your financial health at a glance with interactive pie charts and clean UI dashboards designed for clarity.'
              }
            ].map((trust, i) => (
              <div
                key={i}
                className="group bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 text-center hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                  <trust.icon className="w-8 h-8 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{trust.title}</h3>
                <p className="text-gray-400 leading-relaxed">{trust.description}</p>
              </div>
            ))}
          </div>


          <div className="text-center mt-12">
            <Link href="/Dashboard" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 inline-flex cursor-pointer items-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="mb-25">
          <div className="text-center mb-16 ">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about FinSight AI&apos;s forecasting and anomaly detection.
            </p>
          </div>


          {/* <div className="max-w-3xl mx-auto space-y-4"> */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {[
              {
                question: 'How does the Smart Categorization work?',
                answer: 'We use a trained AI model that reads your transaction description. Whether you write "Mcdonalds" or "Uber Trip", our system automatically assigns it to categories like Food or Transport without manual input.'
              },
              {
                question: 'What is the "Anomaly Detection" feature?',
                answer: 'Our anomaly model analyzes your daily spending history. If it detects a day where spending is significantly higher or unusual compared to your average, it flags it so you can review potential outliers.'
              },
              {
                question: 'How accurate is the monthly forecast?',
                answer: 'We utilize the Meta Prophet model, which is designed for time-series forecasting. It learns from your past months\' data to predict future trends, becoming more accurate as you add more data.'
              },
              {
                question: 'Can I see my spending breakdowns visually?',
                answer: 'Yes! FinSight AI generates interactive pie charts and bar graphs that break down your spending by category, helping you visualize exactly where your money is going.'
              },
              {
                question: 'Is my financial data secure?',
                answer: 'Absolutely. We prioritize your privacy and data security. Your financial data is encrypted and used solely for generating your personal insights and predictions.'
              },
              {
                question: 'Do I need to manually set budgets?',
                answer: 'While you can set manual goals, our Forecast model acts as a dynamic budget, showing you what you are likely to spend based on real habits, rather than just rigid targets.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 cursor-pointer"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-emerald-500/5 transition-colors duration-300 cursor-pointer"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>


      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
