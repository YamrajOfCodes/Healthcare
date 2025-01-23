import React from 'react'
import { Calendar, Clock, Construction } from 'lucide-react';

const Reports = () => {
  return (
    <div>
       <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          {/* Top Section with Animated Icons */}
          <div className="relative h-48 mb-6">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <Calendar className="h-24 w-24 text-blue-500 animate-pulse" />
                <Clock className="h-16 w-16 text-indigo-400 absolute -right-8 -bottom-4 animate-bounce" />
                <Construction className="h-16 w-16 text-purple-400 absolute -left-8 -bottom-4 animate-bounce delay-100" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Coming Soon!
            </h2>
            
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              We're working hard to bring you an amazing appointment scheduling experience.
            </p>

            {/* Feature Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-10 w-10 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Easy Scheduling</h3>
                <p className="text-sm text-gray-600 mt-2">Book appointments with just a few clicks</p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-10 w-10 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Instant Confirmations</h3>
                <p className="text-sm text-gray-600 mt-2">Get immediate booking confirmations</p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-10 w-10 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Construction className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Smart Reminders</h3>
                <p className="text-sm text-gray-600 mt-2">Never miss an appointment again</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mt-12">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">75% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Reports
