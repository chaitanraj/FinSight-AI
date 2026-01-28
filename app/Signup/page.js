"use client";
import { Apple } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { AuthContext } from '@/context/AuthContext';

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const hasSynced = useRef(false);
  const router = useRouter();
  const { login, isLoggedIn } = useContext(AuthContext);
  const { data: session, status } = useSession();

  // Show loading state when returning from Google OAuth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isPending = sessionStorage.getItem('googleSignupPending') === 'true';
      if (isPending && status === "loading") {
        setIsSyncing(true);
      }
    }
  }, [status]);

  // Handle Google OAuth callback - sync user with backend
  useEffect(() => {
    const syncGoogleUser = async () => {
      const isGoogleCallback = typeof window !== 'undefined' &&
        sessionStorage.getItem('googleSignupPending') === 'true';

      if (
        status === "authenticated" &&
        session?.user?.email &&
        !isLoggedIn &&
        !hasSynced.current &&
        isGoogleCallback
      ) {
        hasSynced.current = true;
        setIsSyncing(true);
        sessionStorage.removeItem('googleSignupPending');

        try {
          const res = await fetch("/api/login/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: session.user.email,
              name: session.user.name,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            login(data.user);
            toast.success(`Welcome ${data.user.name}!`);
            router.push("/");
          } else {
            toast.error(data?.error || "Google signup failed");
            hasSynced.current = false;
            setIsSyncing(false);
          }
        } catch (err) {
          console.error("Google sync error:", err);
          toast.error("Failed to create account with Google");
          hasSynced.current = false;
          setIsSyncing(false);
        }
      }
    };

    syncGoogleUser();
  }, [session, status, login, router, isLoggedIn]);

  const handleGoogleSignup = async () => {
    try {
      setIsGoogleLoading(true);
      sessionStorage.setItem('googleSignupPending', 'true');
      await signIn("google", {
        callbackUrl: "/Signup",
      });
    } catch (err) {
      console.error("Google sign-up error:", err);
      toast.error("Google signup error");
      setIsGoogleLoading(false);
      sessionStorage.removeItem('googleSignupPending');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warn("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch(`/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Signup successful:", data);
        toast.success('Account Created!!');

        router.push("/");
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Mobile Background Decoration */}
      <div className="lg:hidden absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-16 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 left-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl"></div>

        {/* Floating Card - Account Balance */}
        <motion.div
          className="absolute top-20 right-6 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-xl p-3 backdrop-blur-sm border border-emerald-500/20 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-300">$24k</div>
            <div className="text-[9px] text-emerald-100">Balance</div>
          </div>
        </motion.div>

        {/* Floating Card - Growth */}
        <motion.div
          className="absolute top-44 left-6 bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-xl mb-1">📊</div>
            <div className="text-[10px] font-semibold text-white">Growth</div>
            <div className="text-[9px] text-emerald-400">+23%</div>
          </div>
        </motion.div>

        {/* Floating Badge - Secure */}
        <motion.div
          className="absolute bottom-36 right-8 bg-emerald-500/10 rounded-lg p-2 backdrop-blur-sm border border-emerald-500/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-emerald-300">Verified</span>
          </div>
        </motion.div>

        {/* Decorative Circles with Animation */}
        <motion.div
          className="absolute top-1/4 right-16 w-3 h-3 bg-emerald-400/30 rounded-full"
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/4 left-20 w-2.5 h-2.5 bg-emerald-500/40 rounded-full"
          animate={{
            y: [0, 12, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        ></motion.div>

        <motion.div
          className="absolute top-2/3 right-24 w-2 h-2 bg-emerald-400/35 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        ></motion.div>

        {/* Shield Icon */}
        <motion.div
          className="absolute bottom-1/2 left-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-lg p-2 backdrop-blur-sm border border-emerald-500/20"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-emerald-400 text-xl">🛡️</div>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">


          {/* Left Aligned - Form */}
          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-400">
                  Start your journey to financial freedom
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleGoogleSignup}
                  disabled={isGoogleLoading || isSyncing}
                  className="w-full cursor-pointer flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle className="w-5 h-5" />
                  {isSyncing ? "Creating account..." : isGoogleLoading ? "Connecting..." : "Continue with Google"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Signup Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20 mt-6"
                >
                  Create Account
                </button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By signing up, you agree to our{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">
                  Privacy Policy
                </a>
              </p>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link href="/Login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                    Login now
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Illustration (Desktop only) */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md h-full min-h-96 flex items-center justify-center">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-900/20 rounded-3xl blur-3xl"></div>

              {/* Illustration Container */}
              <div className="relative z-10">
                {/* Floating Card 1 */}
                <motion.div
                  className="absolute top-0 right-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 shadow-2xl w-32 h-24 flex items-center justify-center animate-pulse"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$24k</div>
                    <div className="text-xs text-emerald-100 mt-1">Account Balance</div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  className="absolute bottom-8 left-0 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-xl p-4 shadow-2xl w-36 h-28 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="text-emerald-400 text-3xl mb-2">📊</div>
                    <div className="text-sm font-semibold text-white">Monthly Growth</div>
                    <div className="text-xs text-emerald-400 mt-1">+23%</div>
                  </div>
                </motion.div>

                {/* Main SVG Illustration */}
                <motion.svg
                  className="w-full max-w-xs mx-auto relative z-20"
                  viewBox="0 0 300 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Person silhouette */}
                  <circle cx="150" cy="80" r="25" fill="#10b981" opacity="0.8" />
                  <path
                    d="M150 110 L120 140 L120 180 L150 220 L180 180 L180 140 Z"
                    fill="#10b981"
                    opacity="0.6"
                  />

                  {/* Security shield */}
                  <g transform="translate(150, 130)">
                    <path
                      d="M 0 -30 L 30 -10 L 30 20 Q 0 50 -30 20 L -30 -10 Z"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <circle cx="0" cy="0" r="8" fill="#10b981" opacity="0.5" />
                  </g>

                  {/* Floating elements */}
                  <circle cx="80" cy="150" r="6" fill="#10b981" opacity="0.4" />
                  <circle cx="220" cy="180" r="5" fill="#10b981" opacity="0.3" />
                  <circle cx="100" cy="280" r="4" fill="#10b981" opacity="0.5" />

                  {/* Connecting lines */}
                  <line
                    x1="80"
                    y1="150"
                    x2="120"
                    y2="120"
                    stroke="#10b981"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1="220"
                    y1="180"
                    x2="180"
                    y2="160"
                    stroke="#10b981"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </motion.svg>
              </div>

              {/* Floating Card 3 */}
              <motion.div
                className="absolute bottom-0 right-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-3 shadow-xl backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-emerald-300">Secure & Verified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;