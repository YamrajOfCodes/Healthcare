'use client'
import React, { useState } from 'react'
import { Calendar, Phone, MapPin } from 'lucide-react';

const ProfileInfo = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </div>
  );


const BillingDetails = () => {
     const [activePayMode, setActivePayMode] = useState('cash');
  return (
    <div className='w-full'>
      <div className="header">
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
      </div>

    <div className="flex flex-col md:flex-row items-center gap-4 px-4 py-5 bg-gray-50 rounded-md shadow-md">
  <h3 className="text-lg font-medium text-gray-700">Select Doctor</h3>
  <select 
    className="w-full md:w-auto px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="Dr Astana">Dr Astana</option>
    <option value="Dr Shivkumar">Dr Shivkumar</option>
    <option value="Dr Prem">Dr Prem</option>
  </select>
</div>


      <div className="details flex flex-col w-full gap-10 lg:flex-row">
      <div className="w-full px-4 py-6 bg-white shadow-md rounded-lg">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
    <h2 className="text-xl font-semibold">Billing Details</h2>
    <div className="flex gap-4 mt-2 md:mt-0">
      <button className="text-gray-500 hover:text-blue-600">Package</button>
      <button className="text-gray-500 hover:text-blue-600">Filter</button>
    </div>
  </div>

 
 
  <div>
  {/* Desktop View (Grid-based) */}
  <div className="hidden md:block">
    <div className="grid grid-cols-12 mt-4 text-gray-700 font-medium">
      <p className="col-span-3">Particulars</p>
      <p className="col-span-3">Note</p>
      <p className="col-span-1">No's</p>
      <p className="col-span-2">Charge</p>
      <p className="col-span-2">Amount</p>
      <p className="col-span-1"></p>
    </div>

    {/* Add Row */}
    <div className="grid grid-cols-12 gap-2 mt-4">
      <input
        type="text"
        placeholder="Particulars"
        className="col-span-3 border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Note"
        className="col-span-3 border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="No's"
        className="col-span-1 border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Charge"
        className="col-span-2 border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Amount"
        className="col-span-2 border rounded px-2 py-1"
      />
      <button className="col-span-1 flex justify-center items-center bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600">
        Add
      </button>
    </div>

    {[1, 2, 3, 4].map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-12 gap-2 mt-4 items-center text-gray-800"
      >
        <p className="col-span-3">CBC</p>
        <p className="col-span-3">Note {index + 1}</p>
        <p className="col-span-1">1</p>
        <p className="col-span-2">200</p>
        <p className="col-span-2">200</p>
        <div className="col-span-1 flex gap-2">
          <button className="text-blue-500 hover:text-blue-700">Edit</button>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
    ))}
  </div>

  {/* Mobile View (Card-based) */}
  <div className="md:hidden">
    {/* Add Row */}
    <div className="mt-4 border rounded-lg p-4 bg-white shadow">
      <h3 className="text-gray-700 font-medium">Add Details</h3>
      <div className="flex flex-col gap-3 mt-3">
        <input
          type="text"
          placeholder="Particulars"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Note"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="No's"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Charge"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Amount"
          className="border rounded px-3 py-2"
        />
        <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2 hover:bg-blue-600">
          Add
        </button>
      </div>
    </div>

    {/* List Items */}
    {[1, 2, 3, 4].map((item, index) => (
      <div
        key={index}
        className="mt-4 border rounded-lg p-4 bg-white shadow"
      >
        <p className="text-gray-700 font-medium">CBC</p>
        <p className="text-gray-500">Note {index + 1}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-800">1</p>
          <p className="text-gray-800">200</p>
          <p className="text-gray-800">200</p>
        </div>
        <div className="flex gap-3 mt-3">
          <button className="text-blue-500 hover:text-blue-700">Edit</button>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>
 
</div>

        <div className="right w-full ">
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

export default BillingDetails
