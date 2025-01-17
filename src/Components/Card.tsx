'use-client'
import React, { useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { StatusCardProps } from '@/types/components';
import { useSelector } from 'react-redux';

const StatusCard: React.FC<StatusCardProps> = ({ status = "Active", number }) => {




  
  return (
<>
<div className="relative group w-[300px] h-[220px] md:w-[300px] md:h-[340px] hidden lg:block">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-pink-300 rounded-2xl blur opacity-20 
                  group-hover:opacity-40 transition-all duration-500 animate-tilt"></div>
      
      <div className="relative h-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl 
                  shadow-xl p-4 md:p-6 transition-all duration-500 ease-out
                  hover:shadow-2xl hover:bg-white/90
                  group-hover:-translate-y-1">
        
        <div className="absolute -top-6 -right-6 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-green-400/30 to-green-500/30 
                    rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500
                    animate-pulse"></div>

        <div className="relative flex justify-between items-center mb-4 md:mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-green-500 to-green-700
                        animate-pulse shadow-lg shadow-green-500/30"></div>
            <h2 className="text-lg  font-semibold bg-clip-text text-transparent 
                       bg-gradient-to-r from-gray-700 to-gray-900">
              {status}
            </h2>
          </div>

          <div className="relative transform transition-all duration-500 hover:scale-110">
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-green-500 to-green-700
                        shadow-lg group-hover:shadow-xl transition-all duration-500
                        transform rotate-3 group-hover:rotate-6">
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl md:text-4xl font-bold text-white drop-shadow-md">{number}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-6">
          <div className="relative h-4 md:h-4 bg-gray-100/50 backdrop-blur-sm rounded-full overflow-hidden
                      shadow-inner">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-700
                        transition-all duration-700 ease-out rounded-full"
                 style={{"width":`${number*8}%`}}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                         animate-shimmer"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-3 shadow-sm
                        hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-1 md:gap-2">
                <Activity className="h-10 w-5 md:h-10 md:w-8 ml-5 mt-2 text-blue-500" />
              </div>
              {/* <p className="mt-0.5 md:mt-1 text-sm md:text-lg font-semibold text-gray-800">Processing</p> */}
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-3 shadow-sm
                        hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-1 md:gap-2">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
                <span className="text-xs md:text-sm font-medium text-gray-600">Time</span>
              </div>
              <p className="mt-0.5 md:mt-1 text-sm md:text-xl font-semibold text-gray-800">2h 15m</p>
            </div>
          </div>
        </div>

        <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-gray-100/50">
          <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>2m ago</span>
            </div>
            <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full
                        backdrop-blur-sm">
              <span className="text-green-700 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>




<div className="relative group w-full h-[100px] sm:w-5/6  lg:hidden">
{/* Gradient Background Glow */}
<div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-green-300 to-green-500 
                rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

{/* Card Container */}
<div className="relative h-full bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl 
                shadow-lg p-6 transition-transform transform group-hover:-translate-y-2 group-hover:shadow-xl 
                duration-500">
  {/* Decorative Floating Gradient Blob */}
  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-400/40 to-green-600/40 
                  rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>

  {/* Card Content */}
  <div className="flex flex-col justify-between h-full">
    {/* Status Section */}
    <div className="flex items-center justify-between">
      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-700 
                        animate-pulse shadow-green-500/50"></div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">
          {status}
        </h2>
      </div>

      {/* Number Badge */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-500 to-green-700 shadow-lg 
                        flex items-center justify-center transition-transform transform group-hover:scale-110">
          <span className="text-xl font-extrabold text-white drop-shadow-md">{number}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</>
  );
};

export default StatusCard;