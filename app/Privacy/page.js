"use client";
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    // <div className="min-h-screen w-full bg-gray-900 text-gray-300 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Back Link */}
        <div className="mb-8 mt-[7vh]">
          <Link href="/" className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            At a Glance
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3">
              <Database className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>We store expenses <strong>only</strong> to provide history & AI insights.</span>
            </div>
            <div className="flex gap-3">
              <EyeOff className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>We <strong>never</strong> sell your data to advertisers.</span>
            </div>
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>Data is stored in a <strong>secure, encrypted</strong> database.</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 rich-text">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4 leading-relaxed">
              We collect information you provide directly to us when using FinSight AI. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Account Information:</strong> Name, email address, and password (hashed).</li>
              <li><strong>Financial Data:</strong> Transaction amounts, descriptions, dates, and categories that you manually input.</li>
              <li><strong>Usage Data:</strong> Anonymous metrics on how you interact with our dashboard (e.g., page views, feature usage) to improve app performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Data</h2>
            <p className="mb-4 leading-relaxed">
              Your data is used strictly to provide the core functionality of the FinSight AI application:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>AI Training:</strong> Your transaction history is used to train your specific Forecasting (Prophet) and Anomaly Detection models. This processing happens securely on our servers.</li>
              <li><strong>Dashboard & Reports:</strong> To generate pie charts, graphs, and monthly summaries visible only to you.</li>
              <li><strong>Smart Categorization:</strong> To automatically suggest categories for new expenses based on your past habits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Storage & Security</h2>
            <p className="mb-4 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Encryption:</strong> Data is encrypted in transit using TLS 1.3 and at rest in our database.</li>
              <li><strong>Access Control:</strong> Strict internal access controls ensure that no unauthorized personnel can access your raw financial data.</li>
              <li><strong>Cloud Infrastructure:</strong> We use secure, compliant cloud providers (e.g., AWS, Vercel, MongoDB Atlas) with robust physical and digital security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Sharing</h2>
            <p className="mb-4 leading-relaxed border-l-4 border-emerald-500/50 pl-4 bg-gray-800/30 py-2 rounded-r">
              <strong>We do not sell, trade, or rent your personal identification information or financial data to others.</strong>
            </p>
            <p className="leading-relaxed">
              We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and advertisers for statistical purposes only (e.g., "Our users track 10,000 transactions daily").
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="mb-4 leading-relaxed">
              You have full control over your data. You can request to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Export:</strong> Download a CSV copy of all your transaction data.</li>
              <li><strong>Delete:</strong> Permanently delete your account and all associated data from our servers.</li>
              <li><strong>Correct:</strong> Update or correct any personal information in your account settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page .
            </p>
          </section>

          <section className="pt-8 border-t border-gray-800 mb-[5vh] mt-[5vh]">
            <h2 className="text-xl font-bold text-white ">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@finsight-ai.com" className=" text-emerald-400 hover:underline">privacy@finsight-ai.com</a>
            </p>
          </section>

        </div>
      </div>
    // </div>
  );
}
