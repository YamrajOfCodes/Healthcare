
import React, { useState } from 'react';
import { Activity, Heart, User, Calendar, Clipboard, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { updatePatient } from '@/Redux/Slices/Patient/patientSlices';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/hooks';

interface PatientData {
  name?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const PatientEditForm = ({ patientdata = {}, onClose }) => {

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    fullname: (patientdata as PatientData)?.name || '',
    dateOfBirth: (patientdata as PatientData)?.dob || '',
    email: (patientdata as PatientData)?.email || '',
    phone: (patientdata as PatientData)?.phone || '',
    address: (patientdata as PatientData)?.address || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add additional logic here (e.g., send data to backend)
    onClose(); 
    dispatch(updatePatient(formData))
    
  };

 
  return (
    <div className="min-h-screen p-3 sm:p-6 mt-14">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Patient Registration</h1>
              <p className="text-sm text-gray-500 mt-0.5">Please fill in the details</p>
            </div>
            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>

        {/* Main Form Card */}
        <form
          className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100 relative overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Personal Information Section */}
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Personal Information</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                    Patient ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clipboard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="patientId"
                      disabled
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder={patientdata?.['id'] || 'N/A'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Contact Information</h2>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-4 sm:p-6 bg-gray-50 relative z-10">
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                type="button"
                className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-1.5"
              >
                Save Changes
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEditForm;
