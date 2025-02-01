import React from 'react';
import {
  Stethoscope,
  Eye,
  Activity,
  Pill,
  ClipboardCheck,
  HeartPulse,
  UserCog,
  Users,
  MessageSquare,
  Plus,
  FileEdit,
  Calendar
} from 'lucide-react';

interface RecordItem {
  title: string;
  icon: React.ElementType;
  color: string;
  isCustom?: boolean;
  isSelect?: boolean;
  isDateInput?: boolean;
}

const MedicalRecords = () => {
  const recordTypes = {
    column1: [
      { title: 'Prescription', icon: Plus, color: 'blue' },
      { title: 'Observation', icon: Eye, color: 'emerald' },
      { title: 'Diagnosis', icon: Stethoscope, color: 'green' },
      { title: 'Investigation', icon: Activity, color: 'red' },
      { title: 'Medicines', icon: Pill, color: 'rose' },
      { title: 'Custom Field 1', icon: Plus, color: 'red', isCustom: true },
      { title: 'Custom Field 2', icon: Plus, color: 'red', isCustom: true }
    ],
    column2: [
      { title: 'Treatment Plan', icon: ClipboardCheck, color: 'blue' },
      { title: "Doctor's Advice", icon: MessageSquare, color: 'blue' },
      { title: 'Suggested Doctor', icon: UserCog, color: 'yellow' },
      { title: 'Referred Doctor', icon: Users, color: 'green', isSelect: true },
      { title: 'Personal Remark', icon: FileEdit, color: 'rose' },
      { title: 'Next Follow-up', icon: Calendar, color: 'purple', isDateInput: true }
    ]
  };

  const RecordCard: React.FC<{ item: RecordItem }> = ({ item }) => (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="p-4 relative">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-${item.color}-100 text-${item.color}-600`}>
            <item.icon className="w-5 h-5" />
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-md ${
            item.isCustom ? 'bg-gray-200 text-gray-600' : `bg-${item.color}-500 text-white`
          }`}>
            {item.title}
          </span>
        </div>

        {item.isSelect ? (
          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            <option value="DrSeeta">Dr. Seeta</option>
            <option value="DrRam">Dr. Ram</option>
          </select>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {item.isCustom ? 'Click to Add record' : 'No record exists'}
            </p>
            <button className={`p-1.5 rounded-lg bg-${item.color}-100 text-${item.color}-600 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-${item.color}-200`}>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className={`h-0.5 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Left Column */}
      <div className="space-y-4">
        {recordTypes.column1.map((item, index) => (
          <RecordCard key={index} item={item} />
        ))}
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {recordTypes.column2.map((item, index) => (
          <RecordCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;