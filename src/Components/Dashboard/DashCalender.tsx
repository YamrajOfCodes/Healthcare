import React, { useEffect, useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, User, FileText, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { getAppointments } from "@/Redux/Slices/Patient/patientSlices";
import { RootState } from "@/Redux/App/store";
import { useAppDispatch } from "@/hooks";

// Sample appointments data
// const appointments = [
//   { date: "2025-01-08", time: "09:00", patient: "John Doe", details: "Routine Checkup", status: "confirmed", priority: "normal" },
//   { date: "2025-01-08", time: "11:00", patient: "Jane Smith", details: "Follow-up Visit", status: "pending", priority: "high" },
//   { date: "2025-01-09", time: "10:00", patient: "Michael Brown", details: "Emergency Appointment", status: "confirmed", priority: "urgent" },
//   { date: "2025-01-10", time: "14:00", patient: "Emily Davis", details: "Consultation", status: "confirmed", priority: "normal" },
//   { date: "2025-01-11", time: "16:00", patient: "Chris Johnson", details: "Blood Test", status: "cancelled", priority: "normal" },
// ];

const ClinicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const dispatch =  useAppDispatch();
  const { getappointments } = useSelector((state:RootState)=>state.Patient);
  console.log("getappointments",getappointments?.appointments);
  // console.log("getappointments",getappointments[0].appointments[0].appointment_date.slice(0,10));

  let calenderData = [];

  calenderData = getappointments?.appointments?.map(element => {
   return {
    date:element.appointment_date.slice(0,10),
    time:element.appointment_date.slice(10,19),
    patient:element.patient.name,
    status: element.status, 
    priority: "normal",
    details:element.mode
   }
    
 });

//  console.log("calenderData",calenderData);
 
  

  const getAppointmentsForDate = (date) => {
    return calenderData?.filter(
      (appointment) => appointment.date === format(date, "yyyy-MM-dd")
    );
  };

  useEffect(()=>{
  dispatch(getAppointments());
  },[])

  const handleNext = () => {
    setCurrentDate((prev) => addDays(prev, 1));
  };

  const handlePrevious = () => {
    setCurrentDate((prev) => addDays(prev, -1));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return (
      <span className={`${statusStyles[status]} text-xs px-2 py-1 rounded-full font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderAppointmentCard = (appointment, idx) => (
    <div
      key={idx}
      className="bg-white/20 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-3"
      onClick={() => setSelectedAppointment(appointment)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-900">{appointment.time}</span>
          </div>
          {getStatusBadge(appointment.status)}
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">{appointment.patient}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{appointment.details}</span>
        </div>
        
        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
          {appointment.priority.toUpperCase()}
        </span>
      </div>
    </div>
  );

  const renderDay = (day) => {
    const appointmentsForDay = getAppointmentsForDate(day);
    const isToday = isSameDay(day, new Date());

    return (
      <div
        key={format(day, "yyyy-MM-dd")}
        className={`rounded-xl overflow-hidden transition-all duration-300 ${
          isToday ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="text-sm font-medium">{format(day, "EEEE")}</div>
              <div className="text-2xl font-bold">{format(day, "dd")}</div>
            </div>
            <Calendar className="h-6 w-6 text-white opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-white">
          {appointmentsForDay?.length > 0 ? (
            appointmentsForDay?.map((appointment, idx) =>
              renderAppointmentCard(appointment, idx)
            )
          ) : (
            <div className="flex items-center justify-center p-6 text-gray-400">
              <Calendar className="h-5 w-5 mr-2" />
              <span>No appointments</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white/70 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Clinic Calendar</h1>
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            Next
          </button>
        </div>
      </div>

      {selectedAppointment && (
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
            <p className="text-blue-700">
              Selected appointment: {selectedAppointment.patient} at {selectedAppointment.time}
            </p>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => {
          const day = addDays(currentDate, index);
          return renderDay(day);
        })}
      </div>
    </div>
  );
};

export default ClinicCalendar;