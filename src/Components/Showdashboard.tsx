import React, { useEffect, useState } from 'react';
import ProfileCard from './Profile';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/App/store';
import Register from './Register';
import { X, XCircle, XCircleIcon, FileText } from "lucide-react";
import Appointment from './Appointment';
import { Patient } from '@/types/patient';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import HealthChart from './Dashboard/Healthchart';
import Billings from './Dashboard/Billings';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Showdashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allpatients } = useSelector((state: RootState) => state.Patient);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointmentSidebar, setappointmentSidebar] = useState(false);
  const [showOPDSidebar, setShowOPDSidebar] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [healthPatient,sethealthpatient] = useState<Patient | null>(null)
  const [healthsidebar,sethealthsidebar] = useState(false)
  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [selectedBillingPatient, setSelectedBillingPatient] = useState(null);

  console.log(allpatients);
  const data = {
    patient_id: 1,
    description: "Some description about the patient's health.",
    date: "2025-01-20",
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" }
    ],
    healthMetrics: [
      { name: "Exercise", value: "80" },
      { name: "Diet", value: "70" }
    ],
    attachment_path: "/path/to/attachment"
  };

  

  useEffect(() => {
    dispatch(getallPatients());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setappointmentSidebar(false);
    }
  };

  const toggleAppointment = () => {
    setappointmentSidebar(!appointmentSidebar);
    if (!appointmentSidebar) {
      setIsSidebarOpen(false);
    }
  };

  const handleAppointmentAdded = () => {
    setappointmentSidebar(false);
    dispatch(getallPatients());
    dispatch(getWaitingroom());
  };

  const handlePatientAdded = () => {
    setIsSidebarOpen(false);
    dispatch(getallPatients());
  };

  const handleOPDClick = (patient: Patient) => {
    setSelectedBillingPatient(patient);
    setShowBillingHistory(true);
  };

 const handleHealthchart = (patient : Patient) =>{
    sethealthsidebar(true);
    sethealthpatient(patient)
  }

  return (
    <div className="h-full relative">
      <div className="h-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between">
            <p className="text-sm sm:text-lg border  text-black sm:text-black bg-white/40 w-fit rounded-lg px-6 py-2 mb-4 transition-colors duration-300">
              Recently Added
            </p>
           
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {allpatients?.slice(-4).map((profile: Patient) => (
              <div
                key={profile.id}
                className="groupshadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex justify-center sm:justify-start w-full"
              >
                <ProfileCard 
                  {...profile} 
                  id={profile.id} 
                  entryTime={profile.created_at ?? new Date().toISOString()} 
                  updated_at={profile.updated_at ?? new Date().toISOString()} 
                  onOPDClick={() => handleOPDClick(profile)}
                  onHealthClick={()=>{handleHealthchart(profile)}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPD Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                    ${showOPDSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">OPD Bill</h2>
                <p className="text-sm text-gray-500 mt-1">Generate patient bill</p>
              </div>
              <button 
                onClick={() => setShowOPDSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedPatient && (
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Patient Info Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Patient Name</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Patient ID</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.age} years</p>
                </div>
              </div>
            </div>

            {/* Bill Details Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Bill Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Consultation Fee</span>
                  <span className="text-sm font-medium text-gray-900">₹500</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Medicine Charges</span>
                  <span className="text-sm font-medium text-gray-900">₹0</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-800">Total Amount</span>
                  <span className="text-sm font-bold text-gray-900">₹500</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                Generate Bill
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium">
                Print Preview
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Health sidebar */}


      <div 
        className={`fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                    ${healthsidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Healthchart</h2>
                <p className="text-sm text-gray-500 mt-1">Generate Healthchart</p>
              </div>
              <button 
                onClick={() => sethealthsidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {healthPatient && (
              <div 
              className={`fixed top-0 right-0 h-full  w-full md:w-[750px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                          ${healthsidebar ? 'translate-x-0' : 'translate-x-full'}`}
            >
              {/* Header */}
             <HealthChart healthData={data}/>
            </div>

        )}
      </div>

      {/* Overlay with improved opacity animation */}
      {showOPDSidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowOPDSidebar(false)}
        />
      )}



{healthsidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => sethealthsidebar(false)}
        />
      )}

      {showBillingHistory && (
        <Billings 
          onClose={() => {
            setShowBillingHistory(false);
            setSelectedBillingPatient(null);
          }} 
          patient={selectedBillingPatient}
        />
      )}

      {showBillingHistory && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowBillingHistory(false)}
        />
      )}
    </div>
  );
};

export default Showdashboard;