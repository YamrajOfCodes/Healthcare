"use client"
import { deletePatient, getallPatients } from '@/Redux/Slices/Patient/patientSlices';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Activity, AlertCircle, Calendar, ChevronRight, Clock, Edit2, FileText, Notebook, Printer, Search, Trash2, Users, X } from 'lucide-react';
import PatientEditForm from './EditPatient';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { Patient } from '@/types/patient';
import Link from 'next/link';

const Patients: React.FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const { deletepatient } = useSelector((state: RootState) => state.Patient);
  const { allpatients } = useSelector((state: RootState) => state.Patient);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [popup, setpopup] = useState(false);
  const [selectedpatient, setselectedpatient] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(5);

  const handleEditPatient = (patient: Patient): void => {
    window.scrollTo(0, 0);
    setIsEditing(true);
    setEditPatient(patient);
  };

  // otdSidebar variables
  const [showOPDSidebar,setShowOPDSidebar] = useState(false);
  const [selectedPatient,SetselectedPatient] = useState(null);


  
  const handleOPDSidebar = (patient)=>{
    SetselectedPatient(patient);
    setShowOPDSidebar(true)
  }

// healthchart variables

const [healthPatient,sethealthpatient] = useState<null>(null);
const [healthsidebar,sethealthsidebar] = useState(false)

const handleHealthsidebar = (patient)=>{
  sethealthsidebar(true);
  sethealthpatient(patient)
}


// prescription sidebar variables

const [prescriptionSidebar,setPrescriptionSidebar] = useState(false);
const [selectedPrescription,setSelectedPrescription] = useState(null);

const handleprescriptionSidebar = (patient)=>{
  setPrescriptionSidebar(true);
  setSelectedPrescription(patient);
  console.log("selectedPrescription",selectedPrescription);
  
}

const handlePrint = ()=>{
  window.print()
}


  const handleSearch = (e: string): void => {
    setSearch(e);
    
    if (e === "") {
      setPatients(allpatients as unknown as Patient[]);
      return;
    }

    const searchResults = (allpatients as unknown as Patient[]).filter((element) => {
      if (element && element.name) {
        return element.name.toLowerCase().includes(e.toLowerCase());
      }
      return false;
    });

    setPatients(searchResults);
  };
  const handleDeletePatient = (): void => {
    if (selectedpatient) {
      dispatch(deletePatient(selectedpatient));
      const filterdata = patients.filter((data) => data.id !== selectedpatient);
      setPatients(filterdata);
      setpopup(false);
    }
  };
  const resetHandle = (): void => {
    setPatients(allpatients as unknown as Patient[]);
    setSearch("");
  };
  useEffect(() => {
    dispatch(getallPatients());
  }, [dispatch]);

  useEffect(() => {
    if (allpatients) {
      setPatients(allpatients as unknown as Patient[]);
    }
  }, [allpatients]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className="w-full">
        {allpatients && allpatients.length > 0 ? (
          <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            {/* Search and filters header */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => { handleSearch(e.target.value) }}
                />
              </div>
              <button onClick={resetHandle} className='px-6 py-2 bg-white/40 rounded-md text-gray-500 md:text-white hover:bg-white/20 font-semibold'>Reset</button>
            </div>

            {/* Main table */}
            <div className="w-full">
              {patients.length > 0 ? (
                <>
                  {/* Desktop View - Table */}
                  <div className="hidden lg:block">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                            <tr className="text-left">
                              <th className="px-6 py-4 font-semibold text-xs tracking-wider">ID</th>
                              <th className="px-6 py-4 font-semibold text-xs tracking-wider">Name</th>
                              <th className="px-6 py-4 font-semibold text-xs tracking-wider">Age</th>
                              <th className="px-6 py-4 font-semibold text-xs tracking-wider">Visit Count</th>
                              <th className="px-6 py-4 font-semibold text-xs tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {patients?.map((profile) => (
                              <tr key={profile.id} className="hover:bg-gray-50 transition-colors duration-300">
                                <Link href={`profile/${profile.id}`}><td className="px-6 py-4 whitespace-nowrap text-gray-900">#{profile.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{profile.name}</td></Link>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                  {new Date().getFullYear() - parseInt(profile.dob.slice(0, 4))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {profile.visit_count}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-10">
                                  <button
                                    className="text-blue-600 hover:text-blue-900 inline-flex items-center space-x-1"
                                    onClick={() => handleEditPatient(profile)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                    <span>Edit</span>
                                  </button>
                                  <button className="text-red-600 hover:text-red-900 inline-flex items-center space-x-1">
                                    <Trash2 className="h-4 w-4" />
                                    {/* <span onClick={()=>{handledeletepatient(profile.id)}}>Delete</span> */}
                                    <span onClick={() => {
                                      setpopup(true)
                                      setselectedpatient(profile?.id)
                                    }}>Delete</span>
                                  </button>
                                  <button className="text-pink-600 hover:text-red-900 inline-flex items-center space-x-1" onClick={()=>{handleprescriptionSidebar(profile)}}>
                                    <Notebook className="h-4 w-4" />
                                    {/* <span onClick={()=>{handledeletepatient(profile.id)}}>Delete</span> */}
                                    <span>Prescription</span>
                                  </button>
                                  <button 
                              onClick={()=>{handleOPDSidebar(profile)}}
                             className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                           shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 
                           transition-all duration-300 hover:-translate-y-0.5">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>OPD Bill</span>
                                  </div>
              
                                 </button>
                                 <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl 
                                                            shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 
                                                            transition-all duration-300 hover:-translate-y-0.5" onClick={()=>{handleHealthsidebar(profile)}} > 
                                               <div className="flex items-center gap-2" >
                                                 <Activity className="h-4 w-4" />
                                                 <span>Health Chart</span>
                                               </div>
                                             </button>
                                </td>
                                 
                              </tr >

                            ))}
                          </tbody >
                        </table >
                      </div >
                    </div >
                  </div >

                  <div className={`"overlay absolute -top-28 w-[100%] h-[120vh] bg-black/40 left-0 py-10 " ${isEditing ? 'block' : 'hidden'}`}>
                    <PatientEditForm
                      patientdata={editPatient ? {
                        id: editPatient.id,
                        name: editPatient.name,
                        dob: editPatient.dob
                      } : {}}
                      onClose={() => setIsEditing(false)}
                    />
                  </div>
                  <div>
                    {/* popup */}
                    <div className={`absolute -top-1/2 inset-0   bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${popup ? 'block' : 'hidden'}`}>
                      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full animate-in fade-in duration-200">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-full">
                              <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Confirm Deletion
                            </h3>
                          </div>

                          {/* Content */}
                          <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this  This action cannot be undone.
                          </p>

                          {/* Icon */}
                          <div className="flex justify-center mb-6">
                            <Trash2 className="w-12 h-12 text-red-500 opacity-80" />
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-3 justify-between">
                            <button
                              // onClick={onClose}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => { setpopup(false) }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleDeletePatient}
                              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >

                  {/* Mobile View - Cards */}
                  <div className="space-y-4 px-3 py-4 max-w-sm lg:hidden w-full overflow-hidden">
                    {currentPatients?.map((profile: Patient) => (
                      <div
                        key={profile.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        {/* Header with patient info */}
                        <div className="p-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 rounded-full p-2 ring-2 ring-blue-50">
                                <span className="text-xs font-bold text-blue-700">#{profile.id}</span>
                              </div>
                             <Link href={`/profile/${profile?.id}`}> <div>
                                <h3 className="text-base font-semibold text-gray-900">
                                  Mr.{profile.name}
                                </h3>
                                <p className="text-xs text-gray-500">Patient Profile</p>
                              </div></Link>
                            </div>
                            <div className="bg-white p-1.5 rounded-full shadow-sm">
                              <ChevronRight className="h-4 w-4 text-blue-500" />
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-200">
                              <div className="flex items-center space-x-2 mb-1">
                                <div className="bg-blue-50 p-1 rounded-lg">
                                  <Calendar className="h-3 w-3 text-blue-600" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Age</span>
                              </div>
                              <p className="text-lg font-bold text-gray-900">
                                {new Date().getFullYear() - parseInt(profile.dob.slice(0, 4))}
                                <span className="text-xs text-gray-500"> years</span>
                              </p>
                            </div>

                            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-200">
                              <div className="flex items-center space-x-2 mb-1">
                                <div className="bg-blue-50 p-1 rounded-lg">
                                  <Users className="h-3 w-3 text-blue-600" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Visits</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-lg font-bold text-gray-900">{profile.visit_count}</span>
                                <span className="text-xs text-gray-500">total</span>
                              </div>
                            </div>
                          </div>

                          {/* Additional Stats */}
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-100">
                              <div className="bg-green-50 p-1 rounded-lg">
                                <Activity className="h-3 w-3 text-green-600" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">Active</p>
                                <p className="text-[10px] text-gray-500">Status</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-100">
                              <div className="bg-purple-50 p-1 rounded-lg">
                                <Clock className="h-3 w-3 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">Regular</p>
                                <p className="text-[10px] text-gray-500">Check-ups</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-2 p-3 bg-gray-50 border-t border-gray-100">
                          <button
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-blue-600 transition-all duration-200"
                            onClick={() => {
                              handleEditPatient(profile);
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                            <span className="text-xs font-semibold">Edit</span>
                          </button>
                          <button
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-600 transition-all duration-200"
                            onClick={() => {
                              setpopup(true),
                                setselectedpatient(profile?.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="text-xs font-semibold">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Pagination controls for mobile */}
                    <div className="flex justify-center gap-2 mt-6">
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
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No matching patients found
                </div>
              )}
            </div >
          </div >
        ) : (
          "No Patients Data"
        )}
      </div>




      <div 
        className={`fixed top-0 right-0 h-full w-[450px] bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
                    ${showOPDSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">OPD Bill</h2>
                <p className="text-sm text-gray-500 mt-1">Generate patient bill</p>
              </div>
              <button 
                onClick={() => setShowOPDSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedPatient && (
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Patient Info Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Patient Name</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Patient ID</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.age} years</p>
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
              <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium">
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
                        <p className="text-sm font-medium text-gray-900">{healthPatient.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Patient ID</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">{healthPatient.age} years</p>
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
                    {selectedPrescription?.name}
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
                     {new Date().getFullYear() - selectedPrescription?.dob.slice(0,4)}
                   </div>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-900">
                   ADDRESS
                 </label>
                 <div className="mt-1 p-2 bg-emerald-50 rounded">
                 {selectedPrescription?.address}
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

      {showOPDSidebar && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowOPDSidebar(false)}
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
  )
}

export default Patients
