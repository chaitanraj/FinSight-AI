"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Compass, Settings, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AuthContext } from "@/context/AuthContext";
import SettingsModal from "@/components/SettingsModal/page"
import {toast} from 'react-toastify';

const Page = () => {
  const [activeItem, setactiveItem] = useState('');
  const navItems = ["Features", "Dashboard","About"];
  const navRef = useRef(null);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { isLoggedIn, isAuthChecking, login, logout, user } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    await logout();
    setIsDropdownOpen(false);
    setLoggingOut(false);
    router.push("/");
    router.refresh();
    toast.success("Logged Out")
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setactiveItem("");
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div>
      <div className='flex justify-center relative z-[50]'>
        <div className='border-b text-md font-normal border-emerald-700/30 bg-zinc-800/60 backdrop-blur-sm mt-[5vh] h-[8vh] w-[95vw] max-w-[150vh] rounded-3xl shadow-lg shadow-emerald-500/5 transition-all duration-300 hover:shadow-emerald-500/10'>
          <div className="flex items-center h-full justify-between text-white px-4 sm:px-6">
            {/* Logo */}
            <div className='flex items-center h-full'>
              <Link href="/" className='cursor-pointer'>
                <Image
                  src={"/logo2.png"}
                  alt="FinSight-AI Logo"
                  className='h-30 w-auto object-contain transition-transform duration-300 hover:scale-105'
                  width={120}
                  height={70}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-4">
              {navItems.map((item, index) => (
                <Link
                  href={`/${item}`}
                  key={index}
                  ref={navRef}
                  onClick={(e) => {
                    setactiveItem(item);
                  }}
                  className={`relative overflow-hidden group transition-all duration-300 ${activeItem === item
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 rounded-2xl px-4 py-2.5 border border-gray-700/50 shadow-xl shadow-emerald-500/20"
                    : "text-white px-4 py-2.5 hover:text-emerald-400"
                    }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeItem !== item && (
                    <span className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                  {activeItem === item && (
                    <>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 animate-pulse"></span>
                      <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl animate-pulse"></span>
                    </>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden lg:flex items-center h-full">
              {!isLoggedIn ? (
                <button className="relative px-6 py-2.5 bg-gradient-to-r cursor-pointer from-emerald-600 to-emerald-700 rounded-xl font-medium overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95">
                  <Link href="/Login" className='cursor-pointer'>
                    <span className="relative z-10">Login/Signup</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Link>
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 cursor-pointer z-[60]"
                  >
                    <span>{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-[60]">
                      <Link href="/Dashboard"
                        onClick={() => {
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors duration-200 text-gray-700 hover:text-emerald-700 cursor-pointer"
                      >
                        <Compass className="w-4 h-4" />
                        <span className="font-medium cursor-pointer">Add Expense</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 text-gray-700 hover:text-red-600 border-t border-gray-100 transition-colors duration-200 cursor-pointer"
                      >
                        {loggingOut ? (
                          <span className="animate-pulse text-red-600">Logging out...</span>
                        ) : (
                          <>
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-emerald-600/20 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-60 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-[13vh] right-4 w-[calc(100vw-2rem)] max-w-sm bg-gradient-to-br from-emerald-950/90 via-zinc-900/90 to-black/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-600/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  href={`/${item}`}
                  key={index}
                  onClick={() => {
                    setactiveItem(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeItem === item
                      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 border border-gray-700/50 shadow-lg shadow-emerald-500/20 text-white"
                      : "text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="border-t border-emerald-700/30 p-4">
              {!isLoggedIn ? (
                <Link 
                  href="/Login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl font-medium text-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50"
                >
                  Login/Signup
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-emerald-400 font-medium border-b border-emerald-700/30">
                    {user.name}
                  </div>
                  <Link
                    href="/Dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600/10 text-gray-300 hover:text-emerald-400 transition-colors"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Add Expense</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      handleLogout(e);
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={loggingOut}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600/10 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    {loggingOut ? (
                      <span className="animate-pulse text-red-400">Logging out...</span>
                    ) : (
                      <>
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default Page