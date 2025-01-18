import React from 'react'
import { Calendar, Clock, User, MapPin, Phone } from 'lucide-react';

const Upcoming = () => {

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
    <div>
       <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Appointments</h2>
        <p className="text-gray-600">Manage your scheduled appointments and consultations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className={`px-6 py-4 border-b ${
              appointment.status === 'Confirmed' ? 'bg-emerald-50' : 'bg-amber-50'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {appointment.department}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'Confirmed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {appointment.status}
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

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{appointment.location}</p>
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
