"use client";
import { Github, Apple } from 'lucide-react';
import { signIn, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import { AuthContext } from '@/context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const hasSynced = useRef(false);
    const router = useRouter();
    const { login, isLoggedIn } = useContext(AuthContext);
    const { data: session, status } = useSession();

    // Immediately show loading state when returning from Google OAuth
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isPending = sessionStorage.getItem('googleLoginPending') === 'true';
            if (isPending && status === "loading") {
                setIsSyncing(true);
            }
        }
    }, [status]);

    // Handle Google OAuth callback - sync user with backend
    useEffect(() => {
        const syncGoogleUser = async () => {
            // Check if this is a Google OAuth callback (flag set via sessionStorage)
            const isGoogleCallback = typeof window !== 'undefined' &&
                sessionStorage.getItem('googleLoginPending') === 'true';

            // Only sync if:
            // 1. Session is authenticated (OAuth succeeded)
            // 2. User is not already logged in via AuthContext
            // 3. Haven't already synced in this session
            // 4. googleLoginPending flag is set in sessionStorage
            if (
                status === "authenticated" &&
                session?.user?.email &&
                !isLoggedIn &&
                !hasSynced.current &&
                isGoogleCallback
            ) {
                hasSynced.current = true;
                setIsSyncing(true);
                // Clear the flag immediately to prevent re-sync
                sessionStorage.removeItem('googleLoginPending');

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
                        console.log("Google login synced:", data);
                        login(data.user);
                        toast.success(`Welcome ${data.user.name}`);
                        router.push("/");
                    } else {
                        toast.error(data?.error || "Google login failed");
                        hasSynced.current = false;
                        setIsSyncing(false);
                    }
                } catch (err) {
                    console.error("Google sync error:", err);
                    toast.error("Failed to sync Google account");
                    hasSynced.current = false;
                    setIsSyncing(false);
                }
            }
        };

        syncGoogleUser();
    }, [session, status, login, router, isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("Login successful:", data);
                console.log("Name: ", data.user.name)
                login(data.user);
                toast.success(`Welcome ${data.user.name}`);
                router.push("/");
            } else {
                toast.error(data?.message || "Login failed");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Server error");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            // Set flag in sessionStorage to persist across OAuth redirect
            sessionStorage.setItem('googleLoginPending', 'true');
            await signIn("google", {
                callbackUrl: "/Login",
            });
        } catch (err) {
            console.error("Google sign-in error:", err);
            toast.error("Google login error");
            setIsGoogleLoading(false);
            sessionStorage.removeItem('googleLoginPending');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Mobile Background */}
            <div className="lg:hidden absolute inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>

                {/* Floating Icons */}
                <motion.div
                    className="absolute top-24 right-8 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-xl p-3 backdrop-blur-sm border border-emerald-500/20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="text-2xl">🔒</div>
                </motion.div>

                <motion.div
                    className="absolute top-40 left-8 bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="text-emerald-400 text-xl">✓</div>
                </motion.div>

                <motion.div
                    className="absolute bottom-32 left-12 bg-emerald-500/10 rounded-lg p-2 backdrop-blur-sm border border-emerald-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-emerald-300">Secure</span>
                    </div>
                </motion.div>

                {/* Decorative Circles */}
                <motion.div
                    className="absolute top-1/3 right-12 w-3 h-3 bg-emerald-400/30 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>

                <motion.div
                    className="absolute bottom-1/3 left-16 w-2 h-2 bg-emerald-500/40 rounded-full"
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                ></motion.div>
            </div>

            <div className="w-full max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Form */}
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
                                    Welcome Back
                                </h1>
                                <p className="text-gray-400">
                                    Login to manage your finances
                                </p>
                            </div>
                            {/* Social Login */}
                            <div className="space-y-3 mb-6">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isGoogleLoading || isSyncing}
                                    className="w-full cursor-pointer flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FcGoogle className="w-5 h-5" />
                                    {isSyncing ? "Signing you in..." : isGoogleLoading ? "Connecting..." : "Continue with Google"}
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

                            {/* Login Form */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-emerald-500/20 mt-6 transition-transform duration-200 hover:scale-105 active:scale-95"
                                >
                                    Login
                                </button>
                            </div>

                            {/* Signup Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-400">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/Signup" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                                        SignUp now!
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
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-900/20 rounded-3xl blur-3xl"></div>
                            <div className="relative z-10">
                                <motion.div
                                    className="absolute top-8 left-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 shadow-2xl w-36 h-28 flex items-center justify-center"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🔒</div>
                                        <div className="text-sm font-semibold text-white">Financial</div>
                                        <div className="text-xs text-emerald-100 mt-1">Security</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-12 right-0 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-xl p-4 shadow-2xl w-32 h-24 flex items-center justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <div className="text-center">
                                        <div className="text-emerald-400 text-3xl mb-2">✓</div>
                                        <div className="text-xs font-semibold text-white">Verified</div>
                                        <div className="text-xs text-emerald-400 mt-1">Account</div>
                                    </div>
                                </motion.div>

                                <motion.svg
                                    className="w-full max-w-xs mx-auto relative z-20"
                                    viewBox="0 0 300 400"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <rect x="80" y="100" width="140" height="180" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" rx="8" />
                                    <circle cx="210" cy="185" r="6" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                                    <g transform="translate(120, 200)">
                                        <circle cx="0" cy="0" r="12" fill="#10b981" opacity="0.7" />
                                        <rect x="10" y="-4" width="35" height="8" fill="#10b981" opacity="0.6" rx="2" />
                                        <rect x="42" y="-2" width="4" height="4" fill="#10b981" opacity="0.5" />
                                        <rect x="48" y="-2" width="4" height="4" fill="#10b981" opacity="0.5" />
                                    </g>
                                    <g transform="translate(150, 80)">
                                        <rect x="-8" y="0" width="16" height="24" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" rx="2" />
                                        <path d="M -6 0 Q -6 -12 0 -12 Q 6 -12 6 0" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                                    </g>
                                    <line x1="60" y1="200" x2="90" y2="200" stroke="#10b981" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,4" />
                                    <circle cx="50" cy="150" r="4" fill="#10b981" opacity="0.4" />
                                    <circle cx="240" cy="140" r="4" fill="#10b981" opacity="0.3" />
                                    <circle cx="60" cy="300" r="3" fill="#10b981" opacity="0.35" />
                                    <circle cx="230" cy="280" r="3" fill="#10b981" opacity="0.3" />
                                    <g transform="translate(100, 320)">
                                        <path d="M 0 0 L 4 4 L 10 -4" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.4" />
                                    </g>
                                    <g transform="translate(170, 320)">
                                        <path d="M 0 0 L 4 4 L 10 -4" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.4" />
                                    </g>
                                </motion.svg>
                            </div>

                            <motion.div
                                className="absolute bottom-0 left-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-3 shadow-xl backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-emerald-300">Secure Connection</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;