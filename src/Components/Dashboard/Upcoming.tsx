"use client"
import { Calendar, Clock, User, MapPin, Phone, X, Filter, FilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { getAppointments } from '@/Redux/Slices/Patient/patientSlices';
import { useAppDispatch } from '@/hooks';

const Upcoming = () => {

  
  const { getappointments } = useSelector((state:RootState)=>state.Patient);
  const dispatch = useAppDispatch();
     const [isFilterOpen, setIsFilterOpen] = useState(false);

  // console.log(getappointments?.appointments)
  const [data,setdata] = useState([])
  // console.log(getappointments.appointments);

  
  


  const handleupcoming = () => {
    const upcominappointments = getappointments?.appointments?.filter((element: any) => {
      const sliceDate = element?.appointment_date; // Ensure this is in "YYYY-MM-DD HH:mm:ss" format
      if (sliceDate) {
        const appointmentDate = new Date(sliceDate); // Parse the string into a Date object
        const now = new Date(); // Current date and time
        console.log("Appointment Date:", appointmentDate);
        console.log("Current Date:", now);
  
        // Check if the appointment date is in the future
        return appointmentDate > now;
      }
      return false; // Exclude if sliceDate is invalid
    }).map((element: any) => {
      // Transform the filtered data into the required format
      return {
        id: element?.id,
        patientName:element?.patient?.name,
        date: element?.appointment_date.slice(0,10),
        time:element?.appointment_date.slice(10,16),
        doctor: element?.doctor?.name,
        status: element?.status,
        phone: element?.patient.phone,
        mode:element?.mode
      };
    });
  
    console.log("Upcoming Appointments:", upcominappointments); // Log the filtered results
    setdata(upcominappointments); // Update the state
  };
  
  
  


  
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);
  
  // Trigger handleupcoming whenever getappointments changes
  useEffect(() => {
    handleupcoming();
  }, [getappointments]);

  

  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "January 19, 2025",
      time: "10:30 AM",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      location: "Building A, Room 204",
      status: "Confirmed",
      phone: "(555) 123-4567"
    },
    {
      id: 2,
      patientName: "Robert Williams",
      date: "January 20, 2025",
      time: "2:15 PM",
      doctor: "Dr. Emily Martinez",
      department: "Orthopedics",
      location: "Building B, Room 105",
      status: "Pending",
      phone: "(555) 987-6543"
    },
    {
      id: 3,
      patientName: "David Brown",
      date: "January 21, 2025",
      time: "11:00 AM",
      doctor: "Dr. Sarah Wilson",
      department: "Neurology",
      location: "Building A, Room 310",
      status: "Confirmed",
      phone: "(555) 456-7890"
    }
  ];
  return (
    <div className="w-full">
    <div className="p-6 bg-blue-50 h-screen">
      <div className="mb-8 flex justify-between">
        <div>
        <h2 className=" text-lg md:text-2xl font-bold text-gray-800 mb-2">Upcoming Appointments</h2>
        <p className="text-gray-600">Manage your scheduled appointments and consultations</p>
        </div>
        {/* <p>dsd</p> */}
      </div>
  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Header */}
            <div
              className={`px-6 py-4 border-b ${
                appointment.status === "completed" ? "bg-emerald-200" : "bg-amber-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {appointment.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {appointment.mode}
                </span>
              </div>
            </div>
  
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Patient Info */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium text-gray-900">{appointment.patientName}</p>
                </div>
              </div>
  
              {/* Date & Time Group */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{appointment.date}</p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">{appointment.time}</p>
                  </div>
                </div>
              </div>
  
              {/* Doctor Info */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium text-gray-900">{appointment.doctor}</p>
                </div>
              </div>
  
              {/* Contact */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium text-gray-900">{appointment.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  )
}

export default Upcoming
