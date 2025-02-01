"use client"
import { Calendar, Clock, User, MapPin, Phone, X, Filter, FilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { getAppointments } from '@/Redux/Slices/Patient/patientSlices';
import { useAppDispatch } from '@/hooks';

interface UpcomingAppointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  doctor: string;
  status: string;
  phone: string;
  mode: string;
}

const Upcoming: React.FC = () => {

  const { getappointments } = useSelector((state:RootState)=>state.Patient);
  const dispatch = useAppDispatch();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [data, setdata] = useState<UpcomingAppointment[]>([]);
  const [filteredData, setFilteredData] = useState<UpcomingAppointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(6);

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
    }).map((element: any): UpcomingAppointment => ({
      id: element?.id,
      patientName: element?.patient?.name,
      date: element?.appointment_date.slice(0,10),
      time: element?.appointment_date.slice(10,16),
      doctor: element?.doctor?.name,
      status: element?.status,
      phone: element?.patient.phone,
      mode: element?.mode
    })) || [];
  
    console.log("Upcoming Appointments:", upcominappointments); // Log the filtered results
    setdata(upcominappointments); // Update the state
  };
  
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, refreshTrigger]);
  
  useEffect(() => {
    handleupcoming();
  }, [getappointments]);

  // Simplified applyFilters function with only three filter options
  const applyFilters = () => {
    let filtered = [...data];

    if (selectedStatus) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      switch (selectedStatus) {
        case 'today':
          filtered = filtered.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0);
            return appointmentDate.getTime() === today.getTime();
          });
          break;
        case 'yesterday':
          filtered = filtered.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0);
            return appointmentDate.getTime() === yesterday.getTime();
          });
          break;
        // 'all' case uses all upcoming appointments (default data)
      }
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [selectedStatus, data]);

  const refreshAppointments = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    window.addEventListener('appointmentAdded', refreshAppointments);
    return () => {
      window.removeEventListener('appointmentAdded', refreshAppointments);
    };
  }, []);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredData.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredData.length / appointmentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
    <div className="w-full h-96 bg-blue-50">
    <div className="p-6 bg-blue-50 w-full">
      <div className="mb-8 flex justify-between">
        <div>
        <h2 className=" text-lg md:text-2xl font-bold text-black mb-2">Upcoming Appointments</h2>
        <p className="text-black">Manage your scheduled appointments and consultations</p>
        </div>
        {/* <p>dsd</p> */}
      </div>
  
      {/* Simplified Filter Section - Only Three Options */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-black mb-3">
            Filter By
          </label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="today"
                checked={selectedStatus === 'today'}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Today</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="yesterday"
                checked={selectedStatus === 'yesterday'}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Yesterday</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value=""
                checked={selectedStatus === ''}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">All Upcoming</span>
            </label>
          </div>
        </div>
      </div>
  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentAppointments?.map((appointment) => (
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
                  <User className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black">Patient</p>
                  <p className="font-medium text-black">{appointment.patientName}</p>
                </div>
              </div>
  
              {/* Date & Time Group */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-black">Date</p>
                    <p className="font-medium text-black">{appointment.date}</p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-black">Time</p>
                    <p className="font-medium text-black">{appointment.time}</p>
                  </div>
                </div>
              </div>
  
              {/* Doctor Info */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black">Doctor</p>
                  <p className="font-medium text-black">{appointment.doctor}</p>
                </div>
              </div>
  
              {/* Contact */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Phone className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black">Contact</p>
                  <p className="font-medium text-black">{appointment.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Upcoming
