'use client'
import React from 'react'
import { Calendar, Clock, FileText, Search, X, ChevronRight } from 'lucide-react'
import { BaseAppointment } from '@/types/shared'

interface VisitHistoryPopupProps {
  onClose: () => void;
  visits: BaseAppointment[];
  patientName: string;
}

const VisitHistoryPopup: React.FC<VisitHistoryPopupProps> = ({ onClose, visits, patientName }) => {
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
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          {visits.length > 0 ? (
            visits.map((visit, index) => (
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