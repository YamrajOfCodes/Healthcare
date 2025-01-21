import React, { useState } from 'react'
import { Search, Plus, X, Save } from 'lucide-react';

const OTD_Billing = () => { 
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample patient data
  const samplePatients = [
    { id: 1, name: 'John Doe', age: 45, patientId: 'P001' },
    { id: 2, name: 'Jane Smith', age: 32, patientId: 'P002' },
  ];

  // Form state
  const [billing, setBilling] = useState({
    services: [{ name: '', cost: '' }],
    items: [{ medicine: '', quantity: '', price: '', total: '' }],
    totalAmount: 0,
    paidAmount: '',
    remainingBalance: 0,
    status: 'unpaid'
  });

  // Calculate totals
  const calculateTotals = (services, items) => {
    const servicesTotal = services.reduce((sum, service) => 
      sum + (parseFloat(service.cost) || 0), 0
    );
    
    const itemsTotal = items.reduce((sum, item) => 
      sum + (parseFloat(item.total) || 0), 0
    );

    const total = servicesTotal + itemsTotal;
    const remaining = total - (parseFloat(billing.paidAmount) || 0);

    setBilling(prev => ({
      ...prev,
      totalAmount: total,
      remainingBalance: remaining,
      status: remaining <= 0 ? 'paid' : 'unpaid'
    }));
  };

  // Handle services changes
  const handleServiceChange = (index, field, value) => {
    const newServices = [...billing.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setBilling(prev => ({ ...prev, services: newServices }));
    calculateTotals(newServices, billing.items);
  };

  // Handle items changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...billing.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calculate item total
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = (
        (parseFloat(newItems[index].quantity) || 0) * 
        (parseFloat(newItems[index].price) || 0)
      ).toString();
    }
    
    setBilling(prev => ({ ...prev, items: newItems }));
    calculateTotals(billing.services, newItems);
  };

  // Add/Remove functions
  const addService = () => {
    setBilling(prev => ({
      ...prev,
      services: [...prev.services, { name: '', cost: '' }]
    }));
  };

  const removeService = (index) => {
    const newServices = billing.services.filter((_, i) => i !== index);
    setBilling(prev => ({ ...prev, services: newServices }));
    calculateTotals(newServices, billing.items);
  };

  const addItem = () => {
    setBilling(prev => ({
      ...prev,
      items: [...prev.items, { medicine: '', quantity: '', price: '', total: '' }]
    }));
  };

  const removeItem = (index) => {
    const newItems = billing.items.filter((_, i) => i !== index);
    setBilling(prev => ({ ...prev, items: newItems }));
    calculateTotals(billing.services, newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting billing:', { patient: selectedPatient, ...billing });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">OPD Billing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Patient Search */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search patient by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="mt-2 border border-gray-200 rounded-lg divide-y divide-gray-200">
              {samplePatients
                .filter(patient => 
                  patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(patient => (
                  <div
                    key={patient.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setSearchQuery('');
                    }}
                  >
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {patient.patientId} | Age: {patient.age}
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {selectedPatient && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="font-medium">Selected Patient:</div>
              <div>{selectedPatient.name} (ID: {selectedPatient.patientId})</div>
            </div>
          )}
        </div>

        {selectedPatient && (
          <>
            {/* Services */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Services</h2>
                <button
                  type="button"
                  onClick={addService}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {billing.services.map((service, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <input
                      type="text"
                      placeholder="Service name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Cost"
                      className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={service.cost}
                      onChange={(e) => handleServiceChange(index, 'cost', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Items/Medicines */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Medicines</h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Medicine
                </button>
              </div>
              <div className="space-y-4">
                {billing.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      className="col-span-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={item.medicine}
                      onChange={(e) => handleItemChange(index, 'medicine', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <span className="flex-1 p-2 bg-gray-50 rounded-lg">
                        ₹{item.total || '0'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-50 rounded-lg"
                      value={`₹${billing.totalAmount}`}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paid Amount
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={billing.paidAmount}
                      onChange={(e) => {
                        setBilling(prev => ({ ...prev, paidAmount: e.target.value }));
                        calculateTotals(billing.services, billing.items);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remaining Balance
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-50 rounded-lg"
                      value={`₹${billing.remainingBalance}`}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      billing.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
              >
                <Save className="w-4 h-4" />
                Save Bill
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default OTD_Billing
