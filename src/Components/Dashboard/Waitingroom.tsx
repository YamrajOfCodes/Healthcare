"use client"
import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MoreVertical, X, Printer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import Link from 'next/link';
import { completePatient } from '@/Redux/Slices/Patient/patientSlices';
import { AppDispatch, RootState } from '@/Redux/App/store';
import { Patient, WaitingRoomPatient } from '@/types/patient';

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
  onHealthClick : ()=> void
  onHealthClicks : ()=>void,
  onPrescription:()=> void
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
  onComplete,
  onHealthClick,
  onHealthClicks,
  onPrescription
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
      await dispatch(completePatient({ id: parseInt(waitingid) })).unwrap();
      setOpen(false);
      if (onComplete) {
        onComplete(waitingid);
      }
      dispatch(getWaitingroom());
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
                    width: tempdate && parseInt(tempdate.slice(0,2)) == 1 ? '20%' : parseInt(tempdate.slice(0,2)) == 2?  '40%': parseInt(tempdate.slice(0,2)) == 3? '60%' :parseInt(tempdate.slice(0,2)) == 4? '80%' : '100%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
    
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex-1 text-sm md:text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200" onClick={onHealthClick}>
            OPD Bill
          </button>
          <button className="flex-1 text-sm md:text-lg px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"onClick={onHealthClicks}>
            Health
          </button>
            <button className="flex-1 text-sm md:text-lg flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"onClick={onPrescription}>
              Prescription
            </button>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(3); 
  const { waitingroom, complete } = useSelector((state: RootState) => ({
    waitingroom: state.Doctor.waitingroom,
    complete: state.Patient.complete
  }));
  const [selectedpatient, setselectedpatient] = useState<WaitingRoomPatient | null>(null);
  const [OTDsidebar,Setotdsidebar] = useState<boolean>(false);


  const handleOTDSidebar = (patient: WaitingRoomPatient) => {
    setselectedpatient(patient);
    Setotdsidebar(true);
  }

  
  // healthchart variables
  
  const [healthPatient, sethealthpatient] = useState<WaitingRoomPatient | null>(null);
  const [healthsidebar,sethealthsidebar] = useState(false)
  
  const handleHealthsidebar = (patient: WaitingRoomPatient) => {
    sethealthsidebar(true);
    sethealthpatient(patient);
  }
  
  
  // prescription sidebar variables
  
  const [prescriptionSidebar,setPrescriptionSidebar] = useState(false);
  const [selectedPrescription,setSelectedPrescription] = useState<WaitingRoomPatient | null>(null);
  
  const handleprescriptionSidebar = (patient: WaitingRoomPatient) => {
    setPrescriptionSidebar(true);
    setSelectedPrescription(patient);
    console.log("selectedPrescription",selectedPrescription);
    
  }
  
  const handlePrint = ()=>{
    window.print()
  }
  
  

  const [completedPatients, setCompletedPatients] = useState<Set<string>>(new Set());

  const handlePatientComplete = async (completedId: string) => {
    try {
      await dispatch(completePatient({ id: parseInt(completedId) })).unwrap();
      
      setLocalWaitingRoom(prev => prev.filter(patient => patient.id !== completedId));
      
      const remainingPatients = localWaitingRoom.length - 1;
      const newTotalPages = Math.ceil(remainingPatients / patientsPerPage);
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      
      setOpen(false);
      
      dispatch(getWaitingroom());

    } catch (error: any) {
      if (error?.response?.status === 404 || error?.status === 404) {
        setLocalWaitingRoom(prev => prev.filter(patient => patient.id !== completedId));
        console.error('Error completing consultation:', error);
        return;
      }
      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getWaitingroom());
      } catch (error) {
        console.error('Error fetching waiting room:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (waitingroom?.[0]) {
      const filteredPatients = waitingroom[0].filter(patient => {
        return !complete?.some(completedPatient => 
          completedPatient.id === patient.id || 
          completedPatient.appointment_id === patient.id
        );
      });
      setLocalWaitingRoom(filteredPatients);
    }
  }, [waitingroom, complete]);

  // Calculate pagination values
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = localWaitingRoom.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(localWaitingRoom.length / patientsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gradient-to-br h-[120vh] from-blue-50 to-cyan-50 py-6 px-4 rounded-md h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-xl lg:text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8">
          Patient Waiting Room
        </h1>

        <div className="space-y-4">
          {/* Show paginated patients for all screen sizes */}
          {currentPatients?.map((element: WaitingRoomPatient) => (
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
              onHealthClick={()=>{handleOTDSidebar(element)}}
              onHealthClicks={()=>{handleHealthsidebar(element)}}
              onPrescription={()=>{handleprescriptionSidebar(element)}}
            />
          ))}
        </div>

        {/* Pagination controls - show on all screen sizes */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>




      <div 
        className={`fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                    ${OTDsidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Healthchart</h2>
                <p className="text-sm text-gray-500 mt-1">Generate Healthchart</p>
              </div>
              <button 
                onClick={() => Setotdsidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedpatient && (
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Patient Info Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Patient Name</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedpatient.name}</p> */}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Patient ID</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedpatient.id}</p> */}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedpatient.phone}</p> */}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedpatient.age} years</p> */}
                </div>
              </div>
            </div>

            {/* Bill Details Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Bill Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Consultation Fee</span>
                  <span className="text-sm font-medium text-gray-900">₹500</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Medicine Charges</span>
                  <span className="text-sm font-medium text-gray-900">₹0</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-800">Total Amount</span>
                  <span className="text-sm font-bold text-gray-900">₹500</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                Generate Bill
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"onClick={()=>{window.print()}}>
                Print Preview
              </button>
            </div>
          </div>
        )}
      </div>

      <div 
              className={`fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                          ${healthsidebar ? 'translate-x-0' : 'translate-x-full'}`}
            >
              {/* Header */}
              <div className="border-b border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Healthchart</h2>
                      <p className="text-sm text-gray-500 mt-1">Generate Healthchart</p>
                    </div>
                    <button 
                      onClick={() => sethealthsidebar(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
      
              {/* Content */}
              {healthPatient && (
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
                  {/* Patient Info Section */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="text-sm font-medium text-blue-800 mb-3">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Patient Name</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.patient.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Patient ID</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date().getFullYear() - parseInt(healthPatient.patient.dob.slice(0,4))} years
                        </p>
                      </div>
                    </div>
                  </div>
      
                  {/* Bill Details Section */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Bill Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Consultation Fee</span>
                        <span className="text-sm font-medium text-gray-900">₹500</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Medicine Charges</span>
                        <span className="text-sm font-medium text-gray-900">₹0</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-800">Total Amount</span>
                        <span className="text-sm font-bold text-gray-900">₹500</span>
                      </div>
                    </div>
                  </div>
      
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                      Generate Bill
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"onClick={()=>{window.print()}}>
                      Print Preview
                    </button>
                  </div>
                </div>
              )}
            </div>




            <div 
        className={`fixed top-0 right-0 h-full w-full bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                    ${prescriptionSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
              </div>
              <button 
                onClick={() => setPrescriptionSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedPrescription && (
           <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
           <div className="relative bg-emerald-100 p-8">
             <h1 className="text-xl font-bold text-gray-800">
               Digitech <span className="text-emerald-500">CHOICE</span> CLINIC
             </h1>
             <h2 className="text-lg font-semibold text-gray-800">
               {/* Dr. {appointmentData?.["Doctor Name"] || ""} */}
             </h2>
           </div>
           <div className="p-8 pt-5">
             <div className="space-y-4 mb-8">
               <div className="flex flex-wrap gap-4">
                 <div className="flex-1">
                   <label className="block text-sm font-medium text-gray-900">
                     NAME OF PATIENT
                   </label>
                   <div className="mt-1 p-2 bg-emerald-50 rounded">
                    {selectedPrescription?.patient?.name}
                   </div>
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm font-medium text-gray-900">
                     Appointment ID
                   </label>
                   <div className="mt-1 p-2 bg-emerald-50 rounded">
                   {selectedPrescription?.id}
                   </div>
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm font-medium text-gray-900">
                     AGE
                   </label>
                   <div className="mt-1 p-2 bg-emerald-50 rounded">
                     {new Date().getFullYear() - parseInt(selectedPrescription?.patient?.dob?.slice(0,4) || '0')}
                   </div>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-900">
                   ADDRESS
                 </label>
                 <div className="mt-1 p-2 bg-emerald-50 rounded">
                 {selectedPrescription?.patient?.address}
                 </div>
               </div>
               <div className="h-80">
   
               </div>
               <div>
                 <p>signature</p>
                 <div className="w-1/3 border-b border-gray-700 mt-5"></div>
               </div>
             </div>
             <div className="mt-5 pt-8 text-center">
               <button
                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
                 onClick={handlePrint}
               >
                 <Printer className="inline-block w-5 h-5 mr-2" />
                 Print
               </button>
             </div>
           </div>
         </div>
        )}
      </div>

      {/* Overlay with improved opacity animation */}
      {OTDsidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => Setotdsidebar(false)}
        />
      )}

{prescriptionSidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setPrescriptionSidebar(false)}
        />
      )}

{healthsidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => sethealthsidebar(false)}
        />
      )}

    </div>
  );
}