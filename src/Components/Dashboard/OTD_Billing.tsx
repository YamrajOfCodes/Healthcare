'use client'
import React, { useState } from 'react'
import { Calendar, Clock, Phone, MapPin } from 'lucide-react';

const OTD_Billing = () => {

    const [activePayMode, setActivePayMode] = useState('cash');


    const ProfileInfo = ({ icon: Icon, children }) => (
        <div className="flex items-center gap-2 text-gray-600">
          <Icon className="w-4 h-4" />
          <span>{children}</span>
        </div>
      );

  return (
    <div className='otd_billing w-full'>
        <div className="header py-4 px-6 flex flex-col md:flex-row md:items-center justify-between bg-gray-50 border-b">
  {/* Header Actions */}
  <div className="cta flex gap-3 flex-wrap">
    <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600">
      Save Bill
    </button>
    <button className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300">
      Print
    </button>
    <button className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300">
      Billing Dashboard
    </button>
    <button className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300">
      Action
    </button>
  </div>
  
  {/* Title */}
  <h2 className="text-xl font-bold mt-4 md:mt-0">OTD Billing</h2>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Profile Section */}
          <div className="flex gap-4 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">Mr. Jane Doe</h3>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  MH193784
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <ProfileInfo icon={Calendar}>
                    48 years old male
                  </ProfileInfo>
                  <ProfileInfo icon={MapPin}>
                    Shri Hari Nagar, Pune
                  </ProfileInfo>
                  <ProfileInfo icon={Phone}>
                    +91 3456 7688
                  </ProfileInfo>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          <div className="flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Registered on:</span>
            <span className="font-medium text-gray-900">22/01/2025</span>
          </div>
        </div>
      </div>
    </div>

<div className="billing-content min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OPD Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            OPD Details
          </h2>

          <div className="space-y-6">
            {/* Receipt Number */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receipt No
              </label>
              <input
                type="text"
                disabled
                className="w-full rounded-lg border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-500 border"
                placeholder="Auto-generated"
              />
            </div>

            {/* Date & Time */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">03/Dec/2019</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">3:57 PM</span>
                </button>
              </div>
            </div>

            {/* Doctor Selection */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor
              </label>
              <select className="w-full rounded-lg border-gray-200 px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border">
                <option value="Deepali">Dr. Deepali</option>
                <option value="Yamini">Dr. Yamini</option>
                <option value="Kritika">Dr. Kritika</option>
                <option value="Kundan">Dr. Kundan</option>
              </select>
            </div>

            {/* OPD Type */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OPD Type
              </label>
              <select className="w-full rounded-lg border-gray-200 px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border">
                <option>General OPD</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Consultation</option>
                <option>Gynecology</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* Subtype */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtype
              </label>
              <select className="w-full rounded-lg border-gray-200 px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border">
                <option>N/S</option>
                <option>N/A</option>
              </select>
            </div>

            {/* Diagnosis */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border"
                placeholder="Enter diagnosis"
              />
            </div>

            {/* Remarks */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border"
                placeholder="Additional remarks"
              />
            </div>
          </div>
        </div>

        {/* Billing Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Billing Details
          </h2>

          <div className="space-y-6">
            {/* Total Amount */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-lg border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border"
                  placeholder="Enter amount"
                />
                <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 min-w-[60px]">
                  INR
                </span>
              </div>
            </div>

            {/* Discount */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-lg border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border"
                    placeholder="0.0"
                  />
                  <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 min-w-[60px]">
                    %
                  </span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-lg border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border"
                    placeholder="00"
                  />
                  <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 min-w-[60px]">
                    INR
                  </span>
                </div>
              </div>
            </div>

            {/* Pay Mode */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Mode
              </label>
              <div className="flex gap-2">
                {['Cash', 'Bank', 'Card'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActivePayMode(mode.toLowerCase())}
                    className={`flex-1 px-4 py-2.5 rounded-lg border transition-all text-sm ${
                      activePayMode === mode.toLowerCase()
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Payable Amount */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payable Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  className="flex-1 rounded-lg border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-500 border"
                  placeholder="Auto-calculated"
                />
                <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 min-w-[60px]">
                  INR
                </span>
              </div>
            </div>

            {/* Received Amount */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Received Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  className="flex-1 rounded-lg border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-500 border"
                  placeholder="Auto-calculated"
                />
                <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 min-w-[60px]">
                  INR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default OTD_Billing
