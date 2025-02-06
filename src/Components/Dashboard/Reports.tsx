import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // Sample health report data - replace with actual patient data
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    date: new Date(2024, 0, index + 1).toLocaleDateString(),
    patientName: `Patient ${index + 1}`,
    age: Math.floor(Math.random() * 50) + 20,
    bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 60}`,
    heartRate: Math.floor(Math.random() * 40) + 60,
    temperature: ((Math.random() * 2) + 36).toFixed(1),
    diagnosis: ['Hypertension', 'Diabetes', 'Common Cold'][index % 3],
    status: ['Normal', 'Requires Attention', 'Critical'][index % 3],
  }));

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        item.patientName.toLowerCase().includes(searchTerm) ||
        item.diagnosis.toLowerCase().includes(searchTerm)
      );
    });
  }, [searchQuery, sampleData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Patient Health Reports</h1>
          <p className="text-gray-600">View and monitor patient health records</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by patient name or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Blood Pressure</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Heart Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Temperature</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Diagnosis</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">#{report.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.bloodPressure}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.heartRate} bpm</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.temperature}°C</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.diagnosis}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Normal' ? 'bg-green-100 text-green-800' :
                          report.status === 'Requires Attention' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination - only show if we have data */}
          {filteredData.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} reports
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
