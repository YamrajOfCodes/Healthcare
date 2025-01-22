import React, { useEffect, useState } from 'react'
import { Search, Plus, X, Save } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { Postbillings } from '@/Redux/Slices/Patient/patientSlices';

const OTD_Billing = () => { 
  
  const [formData, setFormData] = useState({
      id: 22,
      appointment_id: 32,
      total_amount: '250.00',
      paid_amount: '200.00',
      status: 'Unpaid',
      created_at: '2025-01-15T11:52:57.000000Z',
      updated_at: '2025-01-15T11:52:57.000000Z',
      remaining_balance: '0.00',
      service_id: 1,
      item_id: 1,
      appointment: null,
      services: ["consultation"],
      items: ["first",'second'],
  });

 const dispatch = useAppDispatch();

  

  // Simulating API response
  useEffect(() => {
    const apiResponse = {
      id: 22,
      appointment_id: 32,
      total_amount: '250.00',
      paid_amount: '200.00',
      status: 'Unpaid',
      created_at: '2025-01-15T11:52:57.000000Z',
      updated_at: '2025-01-15T11:52:57.000000Z',
      remaining_balance: '0.00',
      service_id: 1,
      item_id: 1,
      appointment: null,
      services: ["consultation"],
      items: ["first",'second'],
    };

  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    // Add API call here to send data to the backend
    // dispatch(Postbillings(formData))
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Appointment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID */}
        <div>
          <label className="block font-medium">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
        </div>

        {/* Appointment ID */}
        <div>
          <label className="block font-medium">Appointment ID</label>
          <input
            type="text"
            name="appointment_id"
            value={formData.appointment_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block font-medium">Total Amount</label>
          <input
            type="text"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Paid Amount */}
        <div>
          <label className="block font-medium">Paid Amount</label>
          <input
            type="text"
            name="paid_amount"
            value={formData.paid_amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Remaining Balance */}
        <div>
          <label className="block font-medium">Remaining Balance</label>
          <input
            type="text"
            name="remaining_balance"
            value={formData.remaining_balance}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Services and Items */}
        <div>
          <label className="block font-medium">Services</label>
          <textarea
            name="services"
            value={formData.services.join(', ')}
            onChange={(e) => {
              setFormData({
                ...formData,
                services: e.target.value.split(',').map((service) => service.trim()),
              });
            }}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter services, separated by commas"
          />
        </div>

        <div>
          <label className="block font-medium">Items</label>
          <textarea
            name="items"
            value={formData.items.join(', ')}
            onChange={(e) => {
              setFormData({
                ...formData,
                items: e.target.value.split(',').map((item) => item.trim()),
              });
            }}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter items, separated by commas"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default OTD_Billing
