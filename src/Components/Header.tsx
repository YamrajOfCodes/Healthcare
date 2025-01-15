'use client'
import React, { useState } from 'react';
import { Search, Phone, UserCircle, Settings } from 'lucide-react';

const Header = () => {
  
    return (
      <nav className="w-full z-20">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto  ">
          {/* Main Header */}
          <div className="px-4 sm:px-6">
            <div className="flex h-16 items-center justify-end sm:justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 
                                   group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 w-48 sm:w-72 rounded-lg border border-gray-200 
                             text-sm bg-white/50 
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                             focus:border-blue-500 transition-all duration-300
                             group-hover:shadow-lg group-hover:shadow-blue-500/5"
                  />
                </div>
              </div>

              {/* Center Section - Desktop */}
             

              {/* Right Section - Desktop */}
              <div className="hidden md:flex items-center gap-6">
              
              
                {/* Settings */}
                <button className="p-2 text-gray-500 hover:text-gray-700 
                                 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200" />

                {/* Contact */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">+91 35637 38380</span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l">
                  <div className="relative group">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 
                                  flex items-center justify-center text-white
                                  group-hover:shadow-lg group-hover:shadow-blue-500/30 
                                  transition-all duration-300">
                      <UserCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Super Admin</span>
                    <span className="text-xs text-gray-500">Healthcare System</span>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              {/* <button 
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 
                         rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {isMenuOpen && (
        <div className="absolute top-16 inset-x-0 md:hidden bg-white/80 backdrop-blur-md z-10
                      border-b border-gray-200/80 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-2 
                           bg-blue-600 text-white rounded-lg text-sm font-medium
                           hover:bg-blue-700 transition-all duration-300">
              + Add Patient
            </button>
            
            <div className="flex items-center justify-between py-2 px-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 35637 38380</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 
                               hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 
                               hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 px-2 border-t">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 
                           flex items-center justify-center text-white">
                <UserCircle className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">Super Admin</span>
                <span className="text-xs text-gray-500">Healthcare System</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </nav>
    );
  };
  
  export default Header;
