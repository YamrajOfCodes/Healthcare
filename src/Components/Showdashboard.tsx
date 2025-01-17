import React, { useEffect, useState } from 'react';
import ProfileCard from './Profile';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/App/store';
import Register from './Register';
import { X, XCircle, XCircleIcon } from "lucide-react";
import Appointment from './Appointment';
import { Patient } from '@/types/patient';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Showdashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allpatients } = useSelector((state: RootState) => state.Patient);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointmentSidebar, setappointmentSidebar] = useState(false);

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
  };

  const handlePatientAdded = () => {
    setIsSidebarOpen(false);
    dispatch(getallPatients());
  };

  return (
    <div className="h-full relative">
      <div className="h-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between">
            <p className="text-sm sm:text-lg border  text-black sm:text-black bg-white/40 w-fit rounded-lg px-6 py-2 mb-4 transition-colors duration-300">
              Recently Added
            </p>
            <p
              className="text-sm sm:text-lg border  text-black sm:text-black bg-white/40 w-fit rounded-lg px-6 py-2 mb-4 transition-colors duration-300 cursor-pointer"
              onClick={toggleSidebar}
            >
              Add new Patient
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {allpatients?.slice(-4).map((profile: Patient) => (
              <div
                key={profile.id}
                className="groupshadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex justify-center sm:justify-start w-full"
              >
                <ProfileCard {...profile} entryTime={profile.created_at ?? new Date().toISOString()} updated_at={profile.updated_at ?? new Date().toISOString()} />
              </div>
            ))}
          </div>
        </div>
      </div>

    
     <div
  className={`hidden sm:block fixed top-0 right-0 h-full w-2/3 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 overflow-hidden ${
    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  <div className="h-full flex flex-col">
    <div className='flex justify-between p-4 border-b'>
      <h2 className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer" onClick={toggleAppointment}>Add Appointment</h2>
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
        aria-label="Close sidebar"
      >
        <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      <Register show={false} onPatientAdded={handlePatientAdded}/>
    </div>
  </div>
</div> 





<div
  className={`fixed sm:hidden top-0 right-0 h-full md:w-64 w-full bg-white shadow-xl transform transition-transform duration-300 overflow-hidden ${
    isSidebarOpen ? 'translate-y-0' : 'translate-y-full'
  }`}
>
  <div className="h-full flex flex-col">
    <div className='flex justify-between p-4 border-b'>
      <h2 className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer" onClick={toggleAppointment}>Add Appointment</h2>
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
        aria-label="Close sidebar"
      >
        <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      <Register show={false} onPatientAdded={handlePatientAdded}/>
    </div>
  </div>
</div>





  {/* appoinment Sidebar */}



  <div
  className={` hidden sm:block fixed top-0 right-0 h-full w-2/3 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 ${
    appointmentSidebar ? 'translate-x-0 ' : 'translate-x-full'
  }`}
>
  <div className="p-4">
  <div className='flex justify-between'>
    <h2 className="text-sm px-4 py-2  text-black text-center cursor-pointer mb-2">Add Appointment</h2>
    <button
            onClick={toggleAppointment}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
          </button>
  </div>
    {/* Add Patient Form */}
   <Appointment show={false} onAppointmentAdded={handleAppointmentAdded}/>
  </div>
</div>


<div
  className={`fixed sm:hidden top-0 right-0 h-full md:w-64 w-full bg-white shadow-xl transform transition-transform duration-300 ${
    appointmentSidebar ? 'translate-y-0 ' : 'translate-y-full'
  }`}
>
  <div className="p-4">
  <div className='flex justify-between'>
    <h2 className="text-sm px-4 py-2 text-center cursor-pointer mb-2">Add Appointment </h2>
    <button
            onClick={toggleAppointment}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
          </button>
  </div>
    {/* Add Patient Form */}
    <Appointment show={false} onAppointmentAdded={handleAppointmentAdded}/>
  </div>
</div>




  </div>
  );
};

export default Showdashboard;