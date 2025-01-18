import React from 'react'
import { Clock, Calendar, PlusCircle, AlertCircle } from 'lucide-react';

const page = () => {
    const patient = {
        name: "John Doe",
        description: "Patient diagnosed with Type 2 Diabetes. Regular follow-ups needed.",
        medications: [
          { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
          { name: "Aspirin", dosage: "75mg", frequency: "Once daily" },
          { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
        ],
      };
    
      return (
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            {/* Patient Info */}
            <h1 className="text-2xl font-bold mb-4">Health Chart</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{patient.name}</h2>
              <p className="text-gray-600 mt-1">{patient.description}</p>
            </div>
    
            {/* Medications */}
            <div>
              <h3 className="text-lg font-bold mb-2">Medications</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Dosage</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.medications.map((medication, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{medication.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{medication.dosage}</td>
                      <td className="border border-gray-300 px-4 py-2">{medication.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
}

export default page
