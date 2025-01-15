"use client"
import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import Link from 'next/link';
import { completePatient } from '@/Redux/Slices/Patient/patientSlices';
import { AppDispatch, RootState } from '@/Redux/App/store';
export const useAppDispatch = () => useDispatch<AppDispatch>();

const PatientCard = ({ patient, appointment,address,phone,date,visit,gender,dob,waitingid}) => {
  const [open, setOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  // const [waiting,setwaiting]=useState(null)
  const dispatch = useAppDispatch();

  console.log(waitingid);
  


  let tempdate:any;
  let age = new Date().getFullYear() - dob.slice(0,4);

  const entrydate:any = new Date(date); // Ensure 'date' is a valid string
  const now:any = new Date();
  
  let waiting_time_ms =  now - entrydate ; // Difference in milliseconds
  if (waiting_time_ms < 0) {
    console.log("The entry date is in the past.");
  } else {
    // Convert milliseconds to readable time
    const waiting_seconds = Math.floor(waiting_time_ms / 1000) % 60;
    const waiting_minutes = Math.floor(waiting_time_ms / (1000 * 60)) % 60;
    const waiting_hours = Math.floor(waiting_time_ms / (1000 * 60 * 60)) % 24;
    const waiting_days = Math.floor(waiting_time_ms / (1000 * 60 * 60 * 24));
  
    // console.log(`Waiting time: ${waiting_days} days, ${waiting_hours} hours, ${waiting_minutes} minutes, ${waiting_seconds} seconds`);
      tempdate =`${waiting_hours} hours, ${waiting_minutes} minutes, ${waiting_seconds}`
     
    
  }

  const handlecomplete = ()=>{
    dispatch(completePatient(waitingid))
  }
  
  

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ">
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
                    width: tempdate && tempdate.slice(0,2) >  12 ? `100%` : '40%'
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
  const { waitingroom } = useSelector((state:RootState)=>state.Doctor);
  console.log("waitingroom",waitingroom);
  

  useEffect(()=>{
    dispatch(getWaitingroom());
  },[]);
  // const [patients, setPatients] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     address: "123 Main St, City",
  //     phone: "9876543210",
  //     date: "09",
  //     month: "MARCH",
  //     year: "2024",
  //     arrivalTime: "2:30 PM",
  //     estimatedWait: 15,
  //     status: "waiting",
  //     dates:""
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     address: "456 Park Ave, Town",
  //     phone: "9876543211",
  //     date: "09",
  //     month: "MARCH",
  //     year: "2024",
  //     arrivalTime: "2:45 PM",
  //     estimatedWait: 20,
  //     status: "waiting",
  //     dates:""
  //   }
  // ]);

  // const updateStatus = (id, newStatus) => {
  //   setPatients(patients.map(patient => 
  //     patient.id === id ? { ...patient, status: newStatus } : patient
  //   ));
  // };

  // const removePatient = (id) => {
  //   setPatients(patients.filter(patient => patient.id !== id));
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-6 px-4 rounded-md">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-xl lg:text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8">
          Patient Waiting Room
        </h1>
        

        {/* md:flex md:flex-wrap    you can put to following div */}
        <div className="space-y-4 ">
          {waitingroom?.[0]?.map((element) => (
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
              // onStatusChange={updateStatus}
              // onRemove={removePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}