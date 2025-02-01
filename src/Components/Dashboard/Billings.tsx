'use client'
import React, { useState } from 'react'
import { Calendar, Clock, FileText, Search, Filter, Download, X, ChevronRight, Edit2, Trash2, MoreVertical } from 'lucide-react'
import { BasePatient } from '@/types/shared'

interface BillingsProps {
  onClose: () => void;
  patient: BasePatient;
}

const Billings: React.FC<BillingsProps> = ({ onClose, patient }) => {
  const [search, setSearch] = useState("")
  const [showActions, setShowActions] = useState<string | null>(null)

  // Function to handle bill deletion
  const handleDelete = (billId: string) => {
    // Add your delete logic here
    console.log('Deleting bill:', billId)
    setShowActions(null)
  }

  // Function to handle bill update
  const handleUpdate = (bill: any) => {
    // Add your update logic here
    console.log('Updating bill:', bill)
    setShowActions(null)
  }

  // Static demo data matching OTD_Billing fields
  const demoBillings = [
    {
      id: "BILL001",
      date: "2024-03-15",
      time: "10:30 AM",
      total_amount: 1500,
      discount: 0,
      payable_amount: 1500,
      received_amount: 1500,
      payment_mode: "Cash",
      doctor: "Dr. Smith",
      status: "Paid",
      opd_type: "General OPD",
      subtype: "N/A",
      diagnosis: "Regular checkup",
      remarks: "Patient doing well"
    },
    {
      id: "BILL002",
      date: "2024-03-10",
      time: "2:15 PM",
      total_amount: 2500,
      discount: 250,
      payable_amount: 2250,
      received_amount: 2250,
      payment_mode: "Card",
      doctor: "Dr. Williams",
      status: "Paid",
      opd_type: "Specialist OPD",
      subtype: "Cardiology",
      diagnosis: "Hypertension follow-up",
      remarks: "BP under control"
    },
    {
      id: "BILL003",
      date: "2024-03-01",
      time: "11:45 AM",
      total_amount: 1800,
      discount: 0,
      payable_amount: 1800,
      received_amount: 0,
      payment_mode: "Pending",
      doctor: "Dr. Davis",
      status: "Pending",
      opd_type: "General OPD",
      subtype: "N/A",
      diagnosis: "Fever and cold",
      remarks: "Prescribed antibiotics"
    }
  ];

  // Calculate total stats for this patient
  const totalAmount = demoBillings.reduce((sum, bill) => sum + bill.total_amount, 0);
  const pendingBills = demoBillings.filter(bill => bill.status === 'Pending');
  const pendingAmount = pendingBills.reduce((sum, bill) => sum + bill.payable_amount, 0);
  const paidAmount = totalAmount - pendingAmount;

  return (
    <>
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-xl z-50 overflow-y-auto
          transform transition-transform duration-300 ease-in-out`}
        style={{
          WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
          transform: 'translate3d(0, 0, 0)' // Forces hardware acceleration
        }}
      >
        {/* Header - Make it sticky on mobile */}
        <div className="sticky top-0 z-10">
          <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Patient Billing</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {patient?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{patient?.name}</p>
                    <p className="text-blue-100 text-sm">ID: {patient?.id}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 active:scale-95"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Search - Adjust padding for mobile */}
            <div className="relative mt-4 md:mt-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 bg-white/10 border border-blue-400/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-blue-100 text-white"
                placeholder="Search bills by ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats - Adjust for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 md:p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Bills</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalAmount}</p>
            <p className="text-xs text-gray-600 mt-1">{demoBillings.length} bills</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-gray-900">₹{pendingAmount}</p>
            <p className="text-xs text-orange-600 mt-1">{pendingBills.length} bills pending</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Paid</p>
            <p className="text-2xl font-bold text-gray-900">₹{paidAmount}</p>
            <p className="text-xs text-green-600 mt-1">All time paid</p>
          </div>
        </div>

        {/* Bills List - Adjust padding for mobile */}
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {demoBillings.map((bill, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 relative">
                {/* Actions Menu Button */}
                {/* <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setShowActions(showActions === bill.id ? null : bill.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>

                  
                  {showActions === bill.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleUpdate(bill)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit2 className="h-4 w-4 mr-2 text-blue-500" />
                          Edit Bill
                        </button>
                        <button
                          onClick={() => handleDelete(bill.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Bill
                        </button>
                      </div>
                    </div>
                  )}
                </div> */}

                <div className="flex justify-between items-start mb-3 pr-8">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bill #{bill.id}</p>
                    <p className="text-xs text-gray-500">{bill.opd_type}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    bill.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {bill.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs">Date & Time</p>
                    <p className="font-medium text-gray-900">{bill.date}</p>
                    <p className="text-gray-600 text-xs">{bill.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs">Total Amount</p>
                    <p className="font-medium text-gray-900">₹{bill.total_amount}</p>
                    <p className="text-gray-600 text-xs">Discount: ₹{bill.discount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs">Payment Details</p>
                    <p className="font-medium text-gray-900">₹{bill.payable_amount}</p>
                    <p className="text-gray-600 text-xs">{bill.payment_mode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs">OPD Details</p>
                    <p className="font-medium text-gray-900">{bill.opd_type}</p>
                    <p className="text-gray-600 text-xs">{bill.subtype}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Diagnosis</p>
                    <p className="text-sm text-gray-700">{bill.diagnosis}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Attending Doctor</p>
                      <p className="text-sm text-gray-700 font-medium">{bill.doctor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Quick action buttons */}
                      {/* <button 
                        onClick={() => handleUpdate(bill)}
                        className="p-1 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        title="Edit Bill"
                      >
                        <Edit2 className="h-4 w-4 text-blue-500" />
                      </button> */}
                      <button 
                        onClick={() => handleDelete(bill.id)}
                        className="p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Delete Bill"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                      {/* <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop with smooth fade */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
        onClick={onClose}
        style={{
          opacity: 1,
          transition: 'opacity 300ms ease-in-out'
        }}
      />
    </>
  )
}

export default Billings
