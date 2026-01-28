"use client";
import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl mt-50 sm:text-5xl font-bold text-white mb-6">
            Get in Touch with <span className="text-emerald-400">FinSight AI</span>
          </h1>
          <p className="text-xl text-gray-400">
            Have questions about our AI models? Need help with your dashboard? 
            We're here to help you master your financial future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                    <p className="text-gray-400 text-sm mb-2">Our team usually responds within 24 hours.</p>
                    <a href="mailto:support@finsight-ai.com" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      support@finsight-ai.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Live Chat</h4>
                    <p className="text-gray-400 text-sm mb-2">Available for Dashboard users (9am - 5pm EST).</p>
                    <Link href="/Dashboard" className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1">
                      Go to Dashboard <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Headquarters</h4>
                    <p className="text-gray-400 text-sm">
                      123 Innovation Drive, Tech City<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 mb-4">Follow us for updates</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all hover:-translate-y-1">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all hover:-translate-y-1">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all hover:-translate-y-1">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Send us a message</h3>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300 mb-6">Thank you for reaching out. We've received your message and will respond to {formState.email} soon.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-400 font-semibold hover:text-emerald-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-gray-600"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-gray-600"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                    <select
                      id="subject"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Feature Request</option>
                      <option>Enterprise / Partnership</option>
                      <option>Report a Bug</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-gray-600 resize-none"
                      placeholder="How can we help you today?"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            {/* Decorative Grid Pattern */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

  );
}
