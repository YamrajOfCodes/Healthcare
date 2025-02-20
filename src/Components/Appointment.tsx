import React, { useEffect, useState } from 'react';
import { 
  Calendar, Clock, 
  VideoIcon, MapPin, AlertCircle 
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Addappointment, getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import { getDoctors } from '@/Redux/Slices/Admin/adminSlice';
import toast from 'react-hot-toast';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { AppointmentFormData,Doctor } from '../types/appointment';
import { Patient } from '../types/patient';
// import Notification from "@/Assets/appointment_notification.mpeg";
// import notification from "../../public/appointment_notification.mpeg"

const MedicalIllustration = () => (
  <svg className="w-full h-auto" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="120" r="90" fill="rgba(255,255,255,0.2)" />
    <path 
      className="animate-pulse" 
      fill="rgba(255,255,255,0.4)"
      d="M120 40v160M40 120h160" 
      strokeWidth="20"
      stroke="rgba(255,255,255,0.3)"
      strokeLinecap="round"
    />
    <circle 
      cx="120" 
      cy="120" 
      r="40" 
      className="animate-spin-slow" 
      fill="rgba(255,255,255,0.15)" 
    />
  </svg>
);

// Add proper type for props
interface AppointmentProps {
  show: boolean;
  onAppointmentAdded?: () => void;
}


const Appointment = ({ show, onAppointmentAdded }: AppointmentProps) => {
  const [time, setTime] = useState<string>("");
  const [aptDate, setAptDate] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [doctor,setdoctor] = useState("");
const [searchResult, setSearchResult] = useState<Patient[] | string>([]);
const [isHidden, setIsHidden] = useState(false);




const [appointment, setAppointment] = useState<AppointmentFormData>({
  patient_id: "",
  doctor_id: "",
  mode: "",
  appointment_date: "",
});
  const { allpatients } = useSelector((state:RootState) => state.Patient);
  const {doctors} = useSelector((state:RootState)=>state.Doctor)

  // handledoctor

  const handledoctors = (doctorId: string) => {
    setdoctor(doctorId);
    setAppointment(prev => ({
      ...prev,
      doctor_id: doctorId
    }));
  };
  
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    setIsHidden(false);
  
    // Normalize input and patient names for case-insensitive matching
    const normalizedSearchInput = searchInput.trim().toLowerCase();
  
    const matchedPatient = allpatients?.find((patient: Patient) => {
      // Match if the input is a substring of the patient name
      return patient.name.toLowerCase().includes(normalizedSearchInput);
    });
  
    if (matchedPatient) {
      setSearchResult(`Patient found: ${matchedPatient.name}`);
      setAppointment(prev => ({
        ...prev,
        patient_id: matchedPatient.id,
      }));
    } else {
      setSearchResult("Patient not found");
    }
  };
  



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);
  
    // Filter patients based on the query
    const results = allpatients?.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(query)
    );
  
    // If results exist and have length, set the filtered patients array
    // Otherwise set the "No patients found" message
    setSearchResult(results?.length ? results : "No patients found");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setAptDate(newDate);
    setAppointment((prev) => ({
      ...prev,
      appointment_date: `${newDate} ${time}`,
    }));
  };


  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    setAppointment((prev) => ({
      ...prev,
      appointment_date: `${aptDate} ${newTime}`,
    }));
  };

  const handleappointment = (mode: 'online' | 'offline') => {
    setAppointment((prevappointments) => ({
      ...prevappointments,
      mode: mode
    }));
  };

  const playNotificationSound = () => {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"); // Replace with your file path
    audio.play().catch((error) => {
      console.error("Error playing notification sound:", error);
    });
  };



  const submitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    playNotificationSound();
    
    const { doctor_id, patient_id, mode } = appointment;

    if (!patient_id) {
      toast.error("Select patient for appointment");
    } else if (!doctor_id) {
      toast.error("Kindly select doctor");
    } else if (!mode) {
      toast.error("Please select visit mode!");
    } else if (!aptDate || !time) {
      toast.error("Please select both date and time.");
    } else {
      dispatch(Addappointment({
        ...appointment,
        id: '', // or generate a temporary ID
        status: 'pending'
      }))
        .unwrap()
        .then(() => {
          toast.success("Appointment created successfully");
          onAppointmentAdded?.();
          // Consider resetting form here
        })
        .catch((error) => {
          toast.error('Error while adding appointment');
          console.error('Appointment creation failed:', error);
        });
    }
  };

  useEffect(() => {
    dispatch(getallPatients());
    dispatch(getDoctors());
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero Section */}
          <div className={`lg:w-2/5 h-[40vh] md:h-[auto] bg-gradient-to-br from-emerald-500 to-teal-600 p-12 flex flex-col justify-between ${!show && 'hidden'}`}>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-4">Book Your Medical Visit</h1>
              <p className="text-emerald-50 text-lg">Schedule your appointment with our expert healthcare professionals.</p>
            </div>
            
            <MedicalIllustration />
            
            <div className="space-y-4 text-emerald-50">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5" />
                <span>Quick and easy scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <VideoIcon className="h-5 w-5" />
                <span>Online & in-person options</span>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5" />
                <span>24/7 emergency support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={`p-8 md:p-12 bg-white ${!show && 'w-full'}`}>

          <div className="search flex flex-col gap-2 relative">
    <input
      type="text"
      className="px-4 py-2 border border-gray-400 w-3/4 outline-none rounded-md"
      value={searchInput}
      onChange={handleInputChange}
      placeholder="Search for a patient..."
    />
    {searchInput && searchResult && (
      <div className="absolute top-12 w-3/4 bg-white border rounded-md shadow-md">
        {Array.isArray(searchResult) &&
          searchResult.map((result: Patient | string, index: number) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (typeof result !== "string") {
                  setSearchInput(result.name);
                  setAppointment((prev) => ({
                    ...prev,
                    patient_id: result.id,
                  }));
                  setSearchResult([]); // Clear results
                }
              }}
            >
              {typeof result === "string" ? result : result.name}
            </div>
          ))}
      </div>
    )}
  </div>
            <div className="space-y-8 mt-8">
              {/* Patient Selection */}
          
              <div className="flex items-center gap-4 max-w-md">
      <select
        name="doctor"
        id="doctor"
        onClick={(e) => handledoctors((e.target as HTMLSelectElement).value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select doctor</option>
        {/* @ts-ignore */}
        {doctors[0]?.map((doctor: Doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        disabled
        value={appointment.doctor_id}
        className="w-24 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
      />
    </div>

              {/* Appointment Mode Selector */}
              <div className="space-y-4">
                <label className="text-gray-700 text-sm font-semibold">Appointment Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleappointment("offline")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-xl border transition-all ${
                      appointment.mode === 'offline'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="text-gray-700 hidden sm:block">In-Person Visit</span>
                    <span className="text-gray-700 sm:hidden">Offline</span>

                  </button>
                  <button
                    onClick={() => handleappointment("online")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-xl border transition-all ${
                      appointment.mode === 'online'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <VideoIcon className="h-5 w-5" />
                    <span className="text-gray-700 hidden sm:block">Video Consult</span>
                    <span className="text-gray-700 sm:hidden">Online</span>

                  </button>
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-2 gap-4">
  <div className="space-y-2">
    <label className="text-gray-700 text-sm font-semibold">Date</label>
    <div className="relative">
      <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <input 
        type="date" 
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border text-gray-700 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
        value={aptDate} 
        onChange={handleDateChange} 
        name="date"
      />
    </div>
  </div>

  <div className="space-y-2">
    <label className="text-gray-700 text-sm font-semibold">Appointment Time</label>
    <div className="relative">
      <Clock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <input 
        type="time" 
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border text-gray-700 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        value={time}
        onChange={handleTimeChange}
        name="time"
      />
    </div>
  </div>
</div>
              {/* Submit Button */}
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-medium hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg" onClick={submitAppointment}>
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;