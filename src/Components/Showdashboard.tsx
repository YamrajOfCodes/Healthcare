import React, { useEffect, useState } from 'react';
import ProfileCard from './Profile';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/App/store';
import Register from './Register';
import { X, XCircle, XCircleIcon } from "lucide-react";
import Appointment from './Appointment';
import { Patient } from '@/types/patient';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';

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
    dispatch(getallPatients());
    dispatch(getWaitingroom());
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
  </div>
  );
};

export default Showdashboard;