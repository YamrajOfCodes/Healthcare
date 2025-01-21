import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FileText, Pill, Paperclip, Plus, Calendar } from 'lucide-react';

const HealthChart = ({ healthData }) => {
  // Define colors for health metrics
  const colors = {
    Exercise: '#60A5FA',
    Diet: '#34D399',
    Sleep: '#A78BFA',
    Stress: '#F87171',
    Hydration: '#FBBF24'
  };

  // Transform healthMetrics data for pie chart
  const pieChartData = healthData?.healthMetrics?.map(metric => ({
    name: metric.name,
    value: parseInt(metric.value),
    color: colors[metric.name] || '#CBD5E1' // fallback color
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full max-w-6xl mx-auto">
      {/* Patient Info Section */}
      <div className="bg-white rounded-lg shadow-md col-span-1 md:col-span-2">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Patient ID: {healthData.patient_id}</h2>
            <p className="text-gray-600 mt-2">{healthData.description}</p>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-5 h-5 mr-2" />
            {new Date(healthData.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white rounded-lg shadow-md col-span-1">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Health Overview</h2>
        </div>
        <div className="p-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {pieChartData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="col-span-1 space-y-6">
        {/* Medications */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Medications
            </h2>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {healthData.medications.map((med, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
                  <div>
                    <h4 className="font-medium">{med.name}</h4>
                    <p className="text-sm text-gray-500">Dosage: {med.dosage}</p>
                  </div>
                  <span className="text-sm text-gray-500">{med.frequency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Paperclip className="w-5 h-5 mr-2" />
              Attachments
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {healthData.attachment_path && (
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{healthData.attachment_path.split('/').pop()}</span>
                  </div>
                  <span className="text-sm text-blue-500 hover:text-blue-600">
                    View
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChart;