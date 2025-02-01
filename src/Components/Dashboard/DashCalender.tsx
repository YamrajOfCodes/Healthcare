import * as React from 'react';
import { useEffect, useState } from "react";
import { format, addDays, isSameDay, eachHourOfInterval, addHours, setHours, setMinutes } from "date-fns";
import { Calendar, Clock, User, FileText, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { getAppointments } from "@/Redux/Slices/Patient/patientSlices";
import { RootState } from "@/Redux/App/store";
import { useAppDispatch } from "@/hooks";
import { DashCalenderProps, FormattedAppointment } from "@/types/appointment";

// Add this type at the top with other imports
type BackendStatus = 'booked' | 'full' | 'completed' | 'pending' | 'cancelled';

const DashCalender: React.FC<DashCalenderProps> = () => {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<FormattedAppointment | null>(null);
  const { appointments } = useSelector((state: RootState) => {
    console.log('Redux State:', state.Patient.getappointments); // Debug log
    return state.Patient.getappointments;
  });
  const [calenderData, setCalenderData] = useState<FormattedAppointment[]>([]);
  const [timeSlots] = useState(() => {
    const startTime = setHours(setMinutes(new Date(), 0), 9); // 9:00 AM
    const endTime = setHours(setMinutes(new Date(), 0), 14); // 2:00 PM
    return eachHourOfInterval({ start: startTime, end: endTime });
  });

  useEffect(() => {
    console.log('Fetching appointments...'); // Debug log
    dispatch(getAppointments())
      .then((result) => {
        console.log('Appointments fetch result:', result); // Debug log
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log('Raw appointments:', appointments);
    if (appointments) {
      const formattedData: FormattedAppointment[] = appointments.map((element) => {
        const appointmentDate = new Date(element.appointment_date);
        console.log('Processing appointment:', {
          original: element.appointment_date,
          parsed: appointmentDate
        });
        
        const formatted: FormattedAppointment = {
          date: format(appointmentDate, "yyyy-MM-dd"),
          time: format(appointmentDate, "HH:mm:ss"),
          patient: element.patient?.name || 'No Name',
          status: element.status as 'completed' | 'pending' | 'cancelled',
          priority: "normal",
          details: element.mode
        };
        console.log('Formatted appointment:', formatted);
        return formatted;
      });
      
      console.log('Setting calendar data:', formattedData);
      setCalenderData(formattedData);
    }
  }, [appointments]);

  // Add proper return type for helper functions
  const getStatusColor = (status: FormattedAppointment['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  const getAppointmentsForDate = (date: Date): FormattedAppointment[] => {
    return calenderData.filter(
      (appointment) => appointment.date === format(date, "yyyy-MM-dd")
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) => addDays(prev, 1));
  };

  const handlePrevious = () => {
    setCurrentDate((prev) => addDays(prev, -1));
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getStatusBadge = (status: BackendStatus): React.ReactElement => {
    const statusStyles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      booked: "bg-blue-100 text-blue-800",
      full: "bg-gray-100 text-gray-800"
    };
    return (
      <span className={`${statusStyles[status]} text-xs px-2 py-1 rounded-full font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getAppointmentForTimeSlot = (date: Date, time: Date): FormattedAppointment | undefined => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedSlotTime = format(time, "HH");  // Only compare hours
    
    console.log('Searching for slot:', {
      date: formattedDate,
      slotTime: formattedSlotTime,
      currentAppointments: calenderData
    });
    
    const appointment = calenderData.find(appointment => {
      const appointmentHour = appointment.time.split(':')[0];
      
      const dateMatches = appointment.date === formattedDate;
      const timeMatches = appointmentHour === formattedSlotTime;
      
      console.log('Checking appointment:', {
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
        appointmentHour,
        slotDate: formattedDate,
        slotHour: formattedSlotTime,
        dateMatches,
        timeMatches
      });
      
      return dateMatches && timeMatches;
    });

    if (appointment) {
      console.log('Found matching appointment:', appointment);
    }

    return appointment;
  };

  const renderTimeSlotCell = (date: Date, time: Date): React.ReactElement => {
    const appointment = getAppointmentForTimeSlot(date, time);
    
    const cellStatus = appointment?.status || 'available';
    
    const getCellColor = () => {
      switch (cellStatus) {
        case 'booked': 
          return 'bg-blue-50 hover:bg-blue-100';
        case 'full': 
          return 'bg-red-50 hover:bg-red-100';
        case 'completed': 
          return 'bg-green-50 hover:bg-green-100';
        case 'pending': 
          return 'bg-amber-50 hover:bg-amber-100';
        case 'cancelled': 
          return 'bg-gray-50 hover:bg-gray-100';
        default: 
          return 'bg-white hover:bg-gray-50';
      }
    };

    return (
      <div 
        className={`border-[0.5px] border-gray-100 p-2 h-20 ${getCellColor()} transition-all duration-200 relative cursor-pointer group`}
        onClick={() => appointment && setSelectedAppointment(appointment)}
      >
        <div className="text-xs text-gray-500 font-medium">
          {format(time, "hh:mm a")}
        </div>
        
        {appointment && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-1 group-hover:bg-opacity-90">
            <span className="text-xs font-semibold text-gray-800 truncate w-full text-center">
              {appointment.patient}
            </span>
            <span className="text-xs text-gray-600 truncate w-full text-center">
              {appointment.details}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderAppointmentCard = (appointment: FormattedAppointment, idx: number): React.ReactElement => (
    <div
      key={idx}
      className="bg-white/20 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-3"
      onClick={() => setSelectedAppointment(appointment)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-black" />
            <span className="font-medium text-black">{appointment.time}</span>
          </div>
          {getStatusBadge(appointment.status as BackendStatus)}
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <User className="h-4 w-4 text-black" />
          <span className="text-black">{appointment.patient}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-black" />
          <span className="text-sm text-black">{appointment.details}</span>
        </div>
        
        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
          {appointment.priority.toUpperCase()}
        </span>
      </div>
    </div>
  );

  const renderDay = (day: Date): React.ReactElement => {
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
          {(appointmentsForDay?.length ?? 0) > 0 ? (
            appointmentsForDay?.map((appointment, idx) =>
              renderAppointmentCard(appointment, idx)
            )
          ) : (
            <div className="flex items-center justify-center p-6 text-black">
              <Calendar className="h-5 w-5 mr-2" />
              <span>No appointments</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Clinic Calendar</h1>
        <div className="flex space-x-3">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200 transition-all duration-200 font-medium text-sm"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <div className="min-w-max">
          <div className="grid grid-cols-[100px_repeat(7,1fr)]">
            {/* Time column */}
            <div className="bg-gray-50 text-gray-700 font-medium p-4">Time</div>
            
            {/* Date headers */}
            {Array.from({ length: 7 }).map((_, index) => {
              const day = addDays(currentDate, index);
              const isToday = isSameDay(day, new Date());
              return (
                <div 
                  key={index} 
                  className={`p-4 text-center border-b border-gray-100 ${
                    isToday ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                    {format(day, "EEE")}
                  </div>
                  <div className={`text-sm ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                    {format(day, "dd")}
                  </div>
                </div>
              );
            })}

            {/* Time slots */}
            {timeSlots.map((time, timeIdx) => (
              <React.Fragment key={timeIdx}>
                {/* Time label */}
                <div className="bg-gray-50 p-4 text-gray-600 border-t border-gray-100 font-medium">
                  {format(time, "hh:mm a")}
                </div>
                
                {/* Time slots for each day */}
                {Array.from({ length: 7 }).map((_, dayIdx) => (
                  <div key={`${timeIdx}-${dayIdx}`}>
                    {renderTimeSlotCell(addDays(currentDate, dayIdx), time)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCalender;