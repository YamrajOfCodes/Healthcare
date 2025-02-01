import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FileText, Pill, Paperclip, Plus, Calendar, X } from 'lucide-react';

interface HealthData {
  patient_id: string;
  description: string;
  date: string;
  healthMetrics: Array<{ name: string; value: string }>;
  medications: Array<{ name: string; dosage: string; frequency: string }>;
  attachment_path?: string;
}

type MetricName = 'Exercise' | 'Diet' | 'Sleep' | 'Stress' | 'Hydration';

const colors: Record<MetricName, string> = {
  Exercise: '#60A5FA',
  Diet: '#34D399',
  Sleep: '#A78BFA',
  Stress: '#F87171',
  Hydration: '#FBBF24'
};

const HealthChart: React.FC<{ healthData: HealthData; onClose?: () => void }> = ({ healthData, onClose }) => {
  // Transform healthMetrics data for pie chart
  const pieChartData = healthData?.healthMetrics?.map(metric => ({
    name: metric.name,
    value: parseInt(metric.value),
    color: colors[metric.name as MetricName] || '#CBD5E1' // fallback color
  })) || [];

  return (
    <div className="fixed inset-0 md:relative bg-gray-50 flex flex-col h-full w-full md:w-auto overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-none bg-white border-b border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Patient ID: {healthData.patient_id}</h2>
            <p className="text-sm text-gray-600 mt-1">{healthData.description}</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>
        <div className="px-4 pb-4 flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{new Date(healthData.date).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Pie Chart Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Health Overview</h2>
            </div>
            <div className="p-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
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
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {pieChartData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-blue-500" />
                Medications
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Plus className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {healthData.medications.map((med, index) => (
                  <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">{med.name}</h4>
                      <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {med.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Paperclip className="w-5 h-5 mr-2 text-blue-500" />
                Attachments
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {healthData.attachment_path && (
                  <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="text-gray-900">{healthData.attachment_path.split('/').pop()}</span>
                    </div>
                    <button className="text-sm font-medium text-blue-500 hover:text-blue-600">
                      View
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChart;