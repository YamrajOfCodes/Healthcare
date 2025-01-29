"use client"
import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  X,
  Save,
  Printer,
  MoreHorizontal,
  Activity,
  Calendar,
  PlusCircle
} from 'lucide-react';

const History = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [customFields, setCustomFields] = useState([]);

  const [records, setRecords] = useState([
    {
      date: "04/Dec/2019",
      family_history: ["Diabetes", "Blood Pressure", "Heart Disease"],
      past_surgeries: ["Cancer Surgery - 2018", "Appendectomy - 2015"],
      allergies: ["Penicillin", "Peanuts", "Latex"],
      ongoing_medications: [
        "Metformin 500mg",
        "Lisinopril 10mg",
        "Aspirin 81mg"
      ],
      systemic_diseases: [
        "Type 2 Diabetes",
        "Hypertension",
        "Rheumatoid Arthritis"
      ],
      past_medical_history: [
        "Myocardial Infarction (2010)",
        "Pneumonia (2015)",
        "Kidney Stones (2018)"
      ]
    }
  ]);

  const defaultFields = [
    { id: 'family_history', title: 'Family History', color: 'blue' },
    { id: 'past_surgeries', title: 'Past Surgeries', color: 'red' },
    { id: 'allergies', title: 'Allergies', color: 'yellow' },
    { id: 'ongoing_medications', title: 'Ongoing Medications', color: 'green' },
    { id: 'systemic_diseases', title: 'Systemic Diseases', color: 'purple' },
    { id: 'past_medical_history', title: 'Past Medical History', color: 'indigo' }
  ];

  const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'indigo', 'pink', 'cyan', 'orange'];

  const fields = [...defaultFields, ...customFields];

  const CustomFieldModal = () => {
    const [fieldName, setFieldName] = useState('');
    const [selectedColor, setSelectedColor] = useState('blue');

    const handleSubmit = () => {
      if (fieldName.trim()) {
        const newField = {
          id: fieldName.toLowerCase().replace(/\s+/g, '_'),
          title: fieldName,
          color: selectedColor
        };
        setCustomFields([...customFields, newField]);
        setFieldName('');
        setIsCustomModalOpen(false);

        // Initialize records for the new field
        const updatedRecords = records.map(record => ({
          ...record,
          [newField.id]: []
        }));
        setRecords(updatedRecords);
      }
    };

    if (!isCustomModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
          <button 
            onClick={() => setIsCustomModalOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold mb-6">Add Custom History Field</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Name
              </label>
              <input 
                type="text" 
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter field name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full bg-${color}-500 
                      ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  />
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Field
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RecordModal = ({ isOpen, onClose, field }) => {
    if (!isOpen) return null;

    const handleAddRecord = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const description = formData.get('description');
      
      if (description) {
        const updatedRecords = records.map(record => ({
          ...record,
          [field.id]: [...(record[field.id] || []), description]
        }));
        setRecords(updatedRecords);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Add {field?.title}</h2>
          
          <form onSubmit={handleAddRecord} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  name="date"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                name="description"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                placeholder={`Enter ${field?.title.toLowerCase()} details...`}
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Record
            </button>
          </form>
        </div>
      </div>
    );
  };

  const HistoryCard = ({ field }) => (
    <div 
      className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-${field.color}-500 cursor-pointer`}
      onClick={() => {
        setSelectedField(field);
        setIsModalOpen(true);
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {field.title}
        </h3>
        <button 
          className={`p-1 rounded-full bg-${field.color}-100 text-${field.color}-600 hover:bg-${field.color}-200 transition-colors`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <ul className="space-y-2">
        {records[0][field.id]?.map((item, index) => (
          <li 
            key={index}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className={`w-2 h-2 rounded-full bg-${field.color}-500`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-800">Patient History</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
              Today's Date: {new Date().toLocaleDateString()}
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Grid of History Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(field => (
          <HistoryCard 
            key={field.id}
            field={field}
          />
        ))}
      </div>

      {/* Add Custom Field Button */}
      <button
        onClick={() => setIsCustomModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <PlusCircle className="w-6 h-6" />
        <span className="font-medium">Add Custom Field</span>
      </button>

      {/* Modals */}
      <RecordModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedField(null);
        }}
        field={selectedField}
      />
      <CustomFieldModal />
    </div>
  );
};

export default History;