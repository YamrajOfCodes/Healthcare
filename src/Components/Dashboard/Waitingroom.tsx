"use client"
import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import Link from 'next/link';
import { completePatient } from '@/Redux/Slices/Patient/patientSlices';
import { AppDispatch, RootState } from '@/Redux/App/store';
import { WaitingRoomPatient } from '@/types/patient';

export const useAppDispatch = () => useDispatch<AppDispatch>();

interface PatientCardProps {
  patient: string;
  appointment: string;
  address: string;
  phone: string;
  date: string;
  visit: number;
  gender: string;
  dob: string;
  waitingid: string;
  onComplete?: (completedId: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
  patient, 
  appointment, 
  address, 
  phone, 
  date, 
  visit, 
  gender, 
  dob, 
  waitingid,
  onComplete
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const entrydate = new Date(date);
  const now = new Date();
  const waiting_time_ms = now.getTime() - entrydate.getTime();
  const age = new Date().getFullYear() - parseInt(dob.slice(0,4));

  let tempdate = '';
  
  if (waiting_time_ms > 0) {
    const waiting_seconds = Math.floor(waiting_time_ms / 1000) % 60;
    const waiting_minutes = Math.floor(waiting_time_ms / (1000 * 60)) % 60;
    const waiting_hours = Math.floor(waiting_time_ms / (1000 * 60 * 60)) % 24;
    tempdate = `${waiting_hours} hours, ${waiting_minutes} minutes, ${waiting_seconds}`;
  }

  const handlecomplete = async (): Promise<void> => {
    try {
      await dispatch(completePatient(waitingid)).unwrap();
      setOpen(false);
      if (onComplete) {
        onComplete(waitingid);
      }
    } catch (error) {
      console.error('Error completing consultation:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden  ">
      <div className="p-6">
        {/* Header Section with Gradient Banner */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {/* Profile Initial Circle with Animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
              <div className="relative w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{patient.slice(0,1).toUpperCase()}</span>
              </div>
            </div>
    
            {/* Patient Basic Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{gender == 'male'? `Mr. ${patient}` : `Ms. ${patient}`}</h2>
              <p className="text-gray-500 flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {age} years
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {gender}
                </span>
              </p>
            </div>
          </div>
    
          {/* Visit Counter */}
          <div className="text-right">
            <span className="text-sm text-gray-500">Visit</span>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              #{visit}
            </p>
          </div>
        </div>
    
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="h-5 w-5 text-blue-500" />
              <span className="text-sm">+91 {phone}</span>
            </div>
          </div>
    
          {/* Time Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Entry at {`${entrydate.getHours()}:${entrydate.getMinutes()}`}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-orange-500 font-medium">
                  Waiting: {`${tempdate} seconds`}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: tempdate && parseInt(tempdate.slice(0,2)) > 12 ? '100%' : '40%'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
    
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex-1 text-sm md:text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            OPD Bill
          </button>
          <button className="flex-1 text-sm md:text-lg px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Health
          </button>
          <Link href={`/prescription/${appointment}`} className='flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center'>
            <button className="flex-1 text-sm md:text-lg">
              Prescription
            </button>
          </Link>
          <div className="relative">
              <button 
                onClick={() => setOpen(!open)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {open && (
                <div className="absolute top-0 right-10 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 
                             backdrop-blur-lg py-2 z-10">
                  <button className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-blue-50 
                                 transition-colors" onClick={handlecomplete}>
                    Complete Consultation
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  

  );
};


export default function WaitingRoom() {
  const dispatch = useAppDispatch();
  const [localWaitingRoom, setLocalWaitingRoom] = useState<WaitingRoomPatient[]>([]);
  const { waitingroom } = useSelector((state: RootState) => state.Doctor);

  useEffect(() => {
    if (waitingroom?.[0]) {
      setLocalWaitingRoom(waitingroom[0]);
    }
  }, [waitingroom]);

  useEffect(() => {
    dispatch(getWaitingroom());
  }, [dispatch]);

  const handlePatientComplete = (completedId: string) => {
    setLocalWaitingRoom(prev => prev.filter(patient => patient.id !== completedId));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-6 px-4 rounded-md h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-xl lg:text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8">
          Patient Waiting Room
        </h1>

        <div className="space-y-4">
          {localWaitingRoom?.map((element: WaitingRoomPatient) => (
            <PatientCard
              key={element.id}
              waitingid={element.id}
              appointment={element.appointment_id}
              patient={element.patient.name}
              address={element.patient.address}
              phone={element.patient.phone}
              date={element.updated_at}
              visit={element.patient.visit_count}
              gender={element.patient.gender}
              dob={element.patient.dob}
              onComplete={handlePatientComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}