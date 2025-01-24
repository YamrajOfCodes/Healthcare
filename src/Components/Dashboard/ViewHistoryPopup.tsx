'use client'
import React, { useState } from 'react'
import { Calendar, Clock, FileText, Search, X, ChevronRight, Filter } from 'lucide-react'
import { BaseAppointment } from '@/types/shared'

interface VisitHistoryPopupProps {
  onClose: () => void;
  visits: BaseAppointment[];
  patientName: string;
}

const VisitHistoryPopup: React.FC<VisitHistoryPopupProps> = ({ onClose, visits, patientName }) => {

  
  
  const [allvisits,setallvisits] = useState(visits);
  // console.log(allvisits);
  
  const handleDate = (e:any)=>{
    if(document.getElementById("date")){
      (document.getElementById("selection") as HTMLInputElement).value = ''
    }
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const filterbyDate = allvisits?.filter((visit: any) => {
      const Datee = visit?.appointment_date.slice(0, 10); // Extract YYYY-MM-DD
      const Date1 = new Date(Datee); // Convert to Date object
      const Date2 = new Date(formattedDate); // Assume formattedDate is also in YYYY-MM-DD format
    
      // console.log(Date1, Date2);
    
      // Compare timestamps for equality
      if (e === Datee) {
        // console.log(visit);
        return true; // Include this visit in the filtered results
      }
    
      return false; // Exclude this visit
    });

   
    if(filterbyDate?.length>0){
      setallvisits(filterbyDate)
    }else{
      setallvisits(visits)
    }
    
  }



  const handleMode = (e: any) => {
      const filters = visits?.filter((element:any)=>{
         if(element.mode == e){
         return element
          
         }
        
      })   

      setallvisits(filters)
  };
  
  return (
    <>
      {/* Sidebar */}
      <div 
        className="fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 
                   shadow-2xl transform transition-transform duration-300 ease-in-out z-50"
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Visit History</h2>
                <p className="text-sm text-gray-500 mt-1">Past appointments and visits</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between border border-gray-200">
      <div className="flex items-center space-x-2 text-gray-700">
        <Filter className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-sm">Filter By</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="date" 
            id="date"
            className="pl-8 pr-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
            onChange={(e) => handleDate(e.target.value)}
          />
          <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="selection" className="text-sm text-gray-600">Mode</label>
          <select 
            id="selection" 
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
            onChange={(e) => handleMode(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
    </div>


        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          {visits.length > 0 ? (
            allvisits?.map((visit, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{visit?.doctor?.name}</p>
                        <p className="text-sm text-gray-500">{visit?.appointment_date?.slice(0, 10)}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        visit.mode === 'Online' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {visit.mode || 'In-person'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Time: {visit?.appointment_date?.slice(11, 16)}</p>
                      <p>Status: {visit?.status || 'Completed'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No visit history available
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
    </>
  )
}

export default VisitHistoryPopup 