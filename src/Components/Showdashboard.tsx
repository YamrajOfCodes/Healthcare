import React, { useEffect, useState } from 'react';
import ProfileCard from './Profile';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/App/store';
import Register from './Register';
import {XCircleIcon} from "lucide-react"
import Appointment from './Appointment';
export const useAppDispatch = () => useDispatch<AppDispatch>();

const Showdashboard = () => {

  const dispatch = useAppDispatch()

 

  useEffect(()=>{
    dispatch(getallPatients())
  },[])
  

  const {allpatients} = useSelector((state:RootState)=>state.Patient)
  console.log("data",allpatients)



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointmentSidebar,setappointmentSidebar] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const toggleAppointment = ()=>{
  setappointmentSidebar(!appointmentSidebar)
}


  



  return (
    <div className="h-full relative">
    <div className="h-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-xl">
      {/* Cards Container */}
      <div className="p-6">
        <div className="flex justify-between">
          <p className="text-sm sm:text-lg border font-semibold text-black sm:text-black bg-white/40 w-fit rounded-lg px-6 py-2 mb-4 transition-colors duration-300">
            Recently Added
          </p>
          <p
            className="text-sm sm:text-lg border font-semibold text-black sm:text-black bg-white/40 w-fit rounded-lg px-6 py-2 mb-4 transition-colors duration-300 cursor-pointer"
            onClick={toggleSidebar}
          >
            Add new Patient
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {allpatients?.slice(-4).map((profile) => (
            <div
              key={profile.id}
              className="groupshadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex justify-center sm:justify-start w-full"
            >
              <ProfileCard {...profile} entryTime={profile.created_at} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <div
  className={` hidden sm:block fixed top-0 right-0 h-full w-2/3 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 ${
    isSidebarOpen ? 'translate-x-0 ' : 'translate-x-full'
  }`}
>
  <div className="p-4">
  <div className='flex justify-between'>
    <h2 className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer mb-2" onClick={toggleAppointment}>Add Appointment</h2>
  <button
      onClick={toggleSidebar}
      className="text-black font-semibold mb-4"
    >
      <XCircleIcon className='w-8 h-8 text-red-500'/>
    </button>
  </div>
    {/* Add Patient Form */}
   <Register show={false}/>
  </div>
</div>



<div
  className={`fixed sm:hidden top-0 right-0 h-full md:w-64 w-full bg-white shadow-xl transform transition-transform duration-300 ${
    isSidebarOpen ? 'translate-y-0 ' : 'translate-y-full'
  }`}
>
  <div className="p-4">
  <div className='flex justify-between'>
    <h2 className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer mb-2" onClick={toggleAppointment}>Add Appointment</h2>
  <button
      onClick={toggleSidebar}
      className="text-black font-semibold mb-4"
    >
      <XCircleIcon className='w-8 h-8 text-red-500'/>
    </button>
  </div>
    {/* Add Patient Form */}
 <div >
 <Register show={false}/>
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
      className="text-black font-semibold mb-4"
    >
      <XCircleIcon className='w-8 h-8 text-red-500'/>
    </button>
  </div>
    {/* Add Patient Form */}
   <Appointment show={false}/>
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
      className="text-black font-semibold mb-4"
    >
      <XCircleIcon className='w-8 h-8 text-red-500'/>
    </button>
  </div>
    {/* Add Patient Form */}
    <Appointment show={false}/>
  </div>
</div>




  </div>
  );
};

export default Showdashboard;