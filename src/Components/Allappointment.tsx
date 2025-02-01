"use client"
import { getDoctors, getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Calendar, Phone, Mail, User, Clock, MapPin, Activity, Hash, Monitor, X, Filter , Download} from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { AppointmentDetails } from '@/types/appointment';
import { getAppointments } from '@/Redux/Slices/Patient/patientSlices';
import { BaseAppointment } from '@/types/shared';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Allappointment: React.FC = () => {
    const dispatch = useAppDispatch();
    const { waitingroom }: { waitingroom: AppointmentDetails[][] } = useSelector((state: RootState) => state.Doctor);
    const { doctors } = useSelector((state: RootState) => state.Doctor);
    const { getappointments } = useSelector((state: RootState) => state.Patient);
    
    const [getallappointments, setallappointments] = useState<BaseAppointment[]>([]);
    const [search, setsearch] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [selectedDoctor, setSelectedDoctor] = useState<string>("All");
    const [selectedDate, setSelectedDate] = useState<string>("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(7); 
    
    // console.log(getallappointments);
    
    
    
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = getallappointments.slice(indexOfFirstPatient, indexOfLastPatient);
    // const totalPages = Math.ceil(localWaitingRoom.length / patientsPerPage);
    const totalPages = Math.ceil(getallappointments.length / patientsPerPage);
  


    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const handledoctor = (data: string) => {
      setSelectedDoctor(data);
      setSelectedStatus("All");
      setSelectedDate("");
      setsearch("");
      
      if (data === "All") {
        setallappointments(getappointments?.appointments || []);
        return;
      }
      
      const filteredData = getappointments?.appointments?.filter((element: BaseAppointment) => {
        return element?.patient?.name === data;
      }) || [];
      
      setallappointments(filteredData);
    };


     
const exportToExcel = (appointments:any) => {
  const data = getallappointments?.map((appointment) => ({
    ID: appointment.id,
    Patient: appointment.patient?.name,
    Email: appointment.patient?.email,
    Phone: appointment.patient?.phone,
    Doctor: appointment.doctor?.name,
    Mode: appointment.mode,
    Date: appointment.appointment_date.slice(0, 10),
    Type: appointment.type,
    Visit: appointment.patient?.visit_count,
    Status: appointment.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "allAppointments");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "Allappointments.xlsx");
}; 


    const handleStatus = (data:any) => {
      setSelectedStatus(data);
      setSelectedDoctor("All");
      setSelectedDate("");
      setsearch("");
      
      // Reset the input fields
      if (document.getElementById('patient-name')) {
        (document.getElementById('patient-name') as HTMLInputElement).value = '';
      }
      if (document.getElementById('mobile-patient-name')) {
        (document.getElementById('mobile-patient-name') as HTMLInputElement).value = '';
      }
      if (document.getElementById('doctor')) {
        (document.getElementById('doctor') as HTMLSelectElement).value = 'All';
      }
      if (document.getElementById('mobile-doctor')) {
        (document.getElementById('mobile-doctor') as HTMLSelectElement).value = 'All';
      }
      if (document.getElementById('appointment-date')) {
        (document.getElementById('appointment-date') as HTMLInputElement).value = '';
      }
      if (document.getElementById('mobile-appointment-date')) {
        (document.getElementById('mobile-appointment-date') as HTMLInputElement).value = '';
      }
    
      if (data === "All") {
        setallappointments(getappointments?.appointments || []);
        return;
      }
    
      const filteredData = getappointments?.appointments?.filter((element: any) => {
        return element?.status === data;
      });
      
      setallappointments(filteredData || []);
    };
    

    const handledate = (date:any) => {
      setSelectedDate(date);
      setSelectedDoctor("All");
      setSelectedStatus("All");
      setsearch("");
      
      // Reset the input fields
      if (document.getElementById('patient-name')) {
        (document.getElementById('patient-name') as HTMLInputElement).value = '';
      }
      if (document.getElementById('mobile-patient-name')) {
        (document.getElementById('mobile-patient-name') as HTMLInputElement).value = '';
      }
      if (document.getElementById('doctor')) {
        (document.getElementById('doctor') as HTMLSelectElement).value = 'All';
      }
      if (document.getElementById('mobile-doctor')) {
        (document.getElementById('mobile-doctor') as HTMLSelectElement).value = 'All';
      }
      if (document.getElementById('status')) {
        (document.getElementById('status') as HTMLSelectElement).value = 'All';
      }
      if (document.getElementById('mobile-status')) {
        (document.getElementById('mobile-status') as HTMLSelectElement).value = 'All';
      }
    
      if (date === "") {
        setallappointments(getappointments?.appointments || []);
        return;
      }
    
      const filteredData = getappointments?.appointments?.filter((element: any) => {
        const spliceDate = element?.appointment_date.slice(0,10);
        if(spliceDate === date){
          return element;
        }
      });
      
      setallappointments(filteredData || []);
    };
   

    const handleSearch = (patientName: string) => {
      setsearch(patientName); // Update the search state with the input value
    
      // Check if the search input is empty
      if (!patientName.trim()) {
        // If the search input is empty, reset the appointments to the original list
        setallappointments(getappointments?.appointments || []);
        return;
      }
    
      // Perform case-insensitive filtering based on the patient's name
      const filteredData = getallappointments?.filter((element: any) =>
        element?.patient?.name.toLowerCase().startsWith(patientName.toLowerCase())
      );
    
      setallappointments(filteredData || []); // Update the filtered appointments
    };
    
    
    
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
          case 'Completed':
            return 'bg-green-200 text-emerald-700 border-emerald-200';
          case 'pending':
            return 'bg-amber-50 text-amber-700 border-amber-200';
          default:
            return 'bg-red-50 text-red-700 border-red-200';
        }
    };

    useEffect(() => {
        dispatch(getAppointments());
        dispatch(getDoctors());
    }, [dispatch]);

    // Add new useEffect to update getallappointments when getappointments changes
    useEffect(() => {
        if (getappointments?.appointments) {
            setallappointments(getappointments.appointments);
        }
    }, [getappointments]);

    return (
        <div className="w-full">
            <div className="w-full px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Appointments</h1>
                     <div className="w-full">
      {/* Filters Section */}
      <div className="lg:hidden w-full flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
          {isFilterOpen ? 'Close' : 'Filters'}
        </button>
       
      </div>


      {/* Mobile Filters - Shown when filter button is clicked */}
      <div className={`lg:hidden ${isFilterOpen ? 'block' : 'hidden'} mb-6 bg-white p-4 rounded-lg shadow-md`}>
        <form className="space-y-4">
          <div>
            <label htmlFor="mobile-patient-name" className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              id="mobile-patient-name"
              placeholder="Enter patient name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="mobile-doctor" className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            <select
              id="mobile-doctor"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handledoctor(e.target.value)}
            >
              <option value="All">All</option>
              {(doctors?.[0] as any[])?.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mobile-status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="mobile-status"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="mobile-appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              id="mobile-appointment-date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handledate(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Desktop Filters - Hidden on mobile, shown on large screens */}
      <div className="hidden lg:block mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
        <form className="grid grid-cols-5 gap-4">
          <div>
            <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              id="patient-name"
              placeholder="Enter patient name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            <select
              id="doctor"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handledoctor(e.target.value)}
            >
              <option value="All">All</option>
              {(doctors?.[0] as any[])?.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              id="appointment-date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow"
              onChange={(e) => handledate(e.target.value)}
            />
          </div>
          <div className='cursor-pointer flex  items-center mt-5' onClick={exportToExcel}><button className='bg-gradient-to-br ml-5 from-violet-500 to-indigo-600 text-white px-8 py-1.5 text-lg rounded-md flex gap-2 justify-center items-center'><Download className='w-5 h-5'/>Export</button></div>
        </form>
      </div>
    </div>

                {/* Table for larger screens */}
                <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg">
                    <table className="w-full bg-white border-collapse">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Appointment</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Patient </th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Email</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Phone</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Doctor</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Mode</th>
                                {/* <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Specialization</th> */}
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Date</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Type</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Visit</th>
                                <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Status</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-200">
                            {currentPatients?.map((appointment, index) => (
                                <tr
                                    key={appointment.id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-indigo-50 transition duration-200`}
                                >
                                    <td className="py-4 px-6 text-gray-800">{appointment?.id}</td>
                                    <td className="py-4 px-6 text-gray-800">{appointment?.patient?.name}</td>
                                    <td className="py-4 px-6 text-gray-600">{appointment?.patient?.email}</td>
                                    <td className="py-4 px-6 text-gray-600">{appointment?.patient?.phone}</td>
                                    <td className="py-4 px-6 text-gray-800">{appointment?.doctor?.name}</td>
                                    <td className="py-4 px-6 text-gray-800">{appointment?.mode}</td>
                                    {/* <td className="py-4 px-6 text-gray-600">{appointment?.doctor?.specialization}</td> */}
                                    <td className="py-4 px-6 text-gray-800">{appointment?.appointment_date.slice(0,10)}</td>
                                    <td className="py-4 px-6 text-gray-800">{appointment?.type}</td>
                                    <td className="py-4 px-6 text-gray-600">{appointment?.patient?.visit_count}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                                                appointment.status === 'completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : appointment.status === 'pending'
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

                {/* Cards for smaller screens */}
                <div className="sm:hidden space-y-6">
                    {getallappointments?.map((appointment) => (
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
                                        {appointment?.id}
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
                                            <p className="text-sm text-gray-900">{appointment?.appointment_date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Type</p>
                                            <p className="text-sm text-gray-900">{appointment?.type}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                                        <Monitor className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Mode</p>
                                            <p className="text-sm text-gray-900">{appointment?.mode}</p>
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
