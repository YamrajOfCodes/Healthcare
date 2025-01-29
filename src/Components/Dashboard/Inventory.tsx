import { Calendar, Clock, Construction } from 'lucide-react'
import React from 'react'

const Inventory = () => {
  return (
    <div>
          <div>
      <div className="min-h-screen  p-6">
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
              We're working hard to bring you an amazing Inventory experience.
            </p>

            {/* Feature Preview Cards */}
       

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mt-12">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-1/4 animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">25% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Inventory
