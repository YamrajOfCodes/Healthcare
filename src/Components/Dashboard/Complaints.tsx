import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';

type ComplaintStatus = 'active' | 'resolved';

interface Complaint {
  id: number;
  description: string;
  date: string;
  status: ComplaintStatus;
}

const Complaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddComplaint = () => {
    if (newComplaint.trim()) {
      const complaint: Complaint = {
        id: Date.now(),
        description: newComplaint,
        date: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setComplaints([complaint, ...complaints]);
      setNewComplaint('');
      setIsAdding(false);
    }
  };

  const handleStatusChange = (id: number) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id
        ? { ...complaint, status: complaint.status === 'active' ? 'resolved' : 'active' }
        : complaint
    ));
  };

  const handleDelete = (id: number) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Patient Complaints</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Complaint
        </button>
      </div>

      {/* Add Complaint Form */}
      {isAdding && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-black font-semibold">New Complaint</h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <textarea
            value={newComplaint}
            onChange={(e) => setNewComplaint(e.target.value)}
            className="w-full p-2 text-black border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter complaint details..."
          />
          <button
            onClick={handleAddComplaint}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      )}

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No complaints recorded
          </div>
        ) : (
          complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-800">{complaint.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Added on: {complaint.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(complaint.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      complaint.status === 'active'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {complaint.status === 'active' ? 'Active' : 'Resolved'}
                  </button>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints; 