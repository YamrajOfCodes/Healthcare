"use client"
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Calendar, Phone, Mail, User, Clock, MapPin, Activity, Hash, Monitor } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';

const Allappointment = () => {
    const dispatch = useAppDispatch();
    const { waitingroom } = useSelector((state:RootState)=>state.Doctor);
    console.log("waitingroom",waitingroom[0]?.[0]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
          case 'confirmed':
            return 'bg-emerald-50 text-emerald-700 border-emerald-200';
          case 'pending':
            return 'bg-amber-50 text-amber-700 border-amber-200';
          default:
            return 'bg-red-50 text-red-700 border-red-200';
        }
    }

    // const appointments = [
    //     {
    //       id: 1,
    //       patientName: 'John Doe',
    //       email: 'john.doe@example.com',
    //       phone: '123-456-7890',
    //       doctorName: 'Dr. Smith',
    //       mode: 'In-person',
    //       status: 'Confirmed',
    //     },
    //     {
    //       id: 2,
    //       patientName: 'Jane Smith',
    //       email: 'jane.smith@example.com',
    //       phone: '987-654-3210',
    //       doctorName: 'Dr. Brown',
    //       mode: 'Online',
    //       status: 'Pending',
    //     },
    //     {
    //       id: 3,
    //       patientName: 'Mike Johnson',
    //       email: 'mike.johnson@example.com',
    //       phone: '456-789-1234',
    //       doctorName: 'Dr. Taylor',
    //       mode: 'In-person',
    //       status: 'Cancelled',
    //     },
    //   ];
    
  
    useEffect(()=>{
      dispatch(getWaitingroom());
    },[]);
  return (
    <div>
     <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Appointments</h1>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg">
  <table className="min-w-full bg-white border-collapse overflow-hidden">
    {/* Table Header */}
    <thead>
      <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Appointment</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Patient </th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Email</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Phone</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Doctor</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Mode</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Specialization</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Date</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Type</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Visit</th>
        <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Status</th>
      </tr>
    </thead>
    {/* Table Body */}
    <tbody className="divide-y divide-gray-200">
      {waitingroom[0]?.map((appointment, index) => (
        <tr
          key={appointment.id}
          className={`${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          } hover:bg-indigo-50 transition duration-200`}
        >
          <td className="py-4 px-6 text-gray-800">{appointment?.appointment?.id}</td>
          <td className="py-4 px-6 text-gray-800">{appointment?.patient?.name}</td>
          <td className="py-4 px-6 text-gray-600">{appointment?.patient?.email}</td>
          <td className="py-4 px-6 text-gray-600">{appointment?.patient?.phone}</td>
          <td className="py-4 px-6 text-gray-800">{appointment?.doctor?.name}</td>
          <td className="py-4 px-6 text-gray-800">{appointment?.appointment?.mode}</td>
          <td className="py-4 px-6 text-gray-600">{appointment?.doctor?.specialization}</td>
          <td className="py-4 px-6 text-gray-800">{appointment?.appointment?.appointment_date}</td>
          <td className="py-4 px-6 text-gray-800">{appointment?.appointment?.type}</td>
          <td className="py-4 px-6 text-gray-600">{appointment?.patient?.visit_count}</td>
          <td className="py-4 px-6">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                appointment.status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : appointment.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {appointment.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-6 p-4">
      {waitingroom[0]?.map((appointment) => (
        <div
          key={appointment.id}
          className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        >
          {/* Status Banner */}
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>

          {/* Header Section */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <h2 className="text-lg font-bold">
                {appointment?.appointment?.id}
              </h2>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Patient Info */}
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{appointment?.patient?.name}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{appointment?.patient?.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{appointment?.patient?.phone}</span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{appointment?.doctor?.name}</p>
                <p className="text-sm text-gray-600">{appointment?.doctor?.specialization}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="text-sm text-gray-900">{appointment?.appointment?.appointment_date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <p className="text-sm text-gray-900">{appointment?.appointment?.type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                <Monitor className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Mode</p>
                  <p className="text-sm text-gray-900">{appointment?.appointment?.mode}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Visits</p>
                  <p className="text-sm text-gray-900">{appointment?.patient?.visit_count}</p>
                </div>
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

export default Allappointment
