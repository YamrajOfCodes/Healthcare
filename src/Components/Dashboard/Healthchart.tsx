"use client"
import React, { useState } from 'react'

const Healthchart = ({patient}) => {
    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

    return (
      <div
        className={`flex flex-col h-screen bg-blue-100 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 fixed`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Health Chart</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-400 hover:bg-blue-600 text-white p-2 rounded"
          >
            {isOpen ? "Close" : "Open"}
          </button>
        </div>
  
        {/* Sidebar Content */}
        <div className="p-4 space-y-4">
          {/* Patient Info */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-sm text-gray-600">{patient.description}</p>
          </div>
  
          {/* Medication Info */}
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <h4 className="text-lg font-semibold text-blue-500">Medications</h4>
            {patient.medications.map((med, index) => (
              <div
                key={index}
                className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
              >
                <p className="font-medium">Name: {med.name}</p>
                <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
              </div>
            ))}
          </div>
  
          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            Last Updated: {patient.lastUpdated}
          </div>
        </div>
      </div>
    );
}

export default Healthchart
