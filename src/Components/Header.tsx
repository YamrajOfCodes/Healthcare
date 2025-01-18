"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Settings,
  Phone,
  UserCircle,
  Calendar,
  UserPlus,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/App/store";
import { useAppDispatch } from "@/hooks";
import { getallPatients } from "@/Redux/Slices/Patient/patientSlices";
import Register from "./Register";
import Appointment from "./Appointment";

const ModernNavbar = () => {
  const { allpatients } = useSelector((state: RootState) => state.Patient);
  // console.log(allpatients);
  const [search, setsearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patient, setpatient] = useState(allpatients);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointmentSidebar, setAppointmentSidebar] = useState(false);

  const handlesearch = (data: string) => {
    setSearchTerm(data);
    if (!data.trim()) {
      setpatient(allpatients);
      return;
    }

    const filterdata = allpatients?.filter((patient) =>
      patient.name.toLowerCase().includes(data.toLowerCase().trim())
    );

    setpatient(filterdata);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getallPatients());
  }, []);

  const handleAddPatient = () => {
    setIsSidebarOpen(true);
    setAppointmentSidebar(false);
  };

  const handleScheduleAppointment = () => {
    setAppointmentSidebar(true);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    setpatient(allpatients);
  }, [allpatients]);

  return (
    <>
     <div className="relative flex justify-between px-4 py-3 bg-white/50">
  <input
    type="text"
    placeholder="Search patients..."
    value={searchTerm}
    className="pl-10 pr-4 py-2.5 w-[200px] sm:w-[320px] rounded-xl border border-gray-100 
             text-[15px] bg-white focus:outline-none focus:ring-1 
             focus:ring-gray-200 focus:border-gray-200"
    onChange={(e) => handlesearch(e.target.value)}
    onFocus={() => setsearch(true)}
    onBlur={() => setTimeout(() => setsearch(false), 200)}
    aria-label="Search patients"
    aria-expanded={search ? "true" : "false"}
    aria-haspopup="listbox"
  />

  {/* Search Results Dropdown */}
  {search && patient && (
    <div
      className="absolute left-2 mt-2 w-1/4 top-14  bg-white rounded-xl border border-gray-100 shadow-lg z-50"
      role="listbox"
      aria-live="polite"
    >
      <div className="max-h-[280px] overflow-y-auto py-2">
        {patient.length > 0 ? (
          patient.map((element, index) => (
            <div
              key={index}
              className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
              role="option"
              tabIndex={0}
            >
              <p className="text-[15px] text-gray-600">{element.name}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-2.5 text-gray-500" role="option">
            No patients found
          </div>
        )}
      </div>

      
    </div>
  )}


<div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={handleAddPatient}
                    className="px-2 sm:px-4 py-2.5 flex items-center gap-1 sm:gap-2 bg-blue-600 text-white 
                             rounded-full text-sm font-medium shadow-lg shadow-blue-500/20
                             hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Patient</span>
                  </button>
                  <button
                    onClick={handleScheduleAppointment}
                    className="px-2 sm:px-4 py-2.5 flex items-center gap-1 sm:gap-2 bg-indigo-600 text-white 
                             rounded-full text-sm font-medium shadow-lg shadow-indigo-500/20
                             hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all duration-300"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Schedule Appointment
                    </span>
                  </button>
                </div>

                {/* Right Section - Only visible on larger screens */}
                <div className="hidden md:flex items-center gap-6">
                  {/* Settings with notification dot */}
                  <div className="relative">
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                    <button
                      className="p-2.5 text-gray-500 hover:text-gray-700 
                                     bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
                    >
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">+91 93598 68665</span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-3 pl-6 border-l">
                    <div className="relative group">
                      <div
                        className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 
                                    p-0.5 group-hover:shadow-lg group-hover:shadow-indigo-500/30 
                                    transition-all duration-300"
                      >
                        <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                          <UserCircle className="h-6 w-6 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        Super Admin
                      </span>
                      <span className="text-xs text-gray-500">
                        Healthcare System
                      </span>
                    </div>
                  </div>
                </div>
   </div>


      {/* Patient Registration Sidebar */}
      <div
        className={`hidden sm:block fixed top-0 right-0 h-full w-2/3 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 overflow-hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between p-4 border-b">
            <h2
              className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer"
              onClick={() => {
                setAppointmentSidebar(true);
                setIsSidebarOpen(false);
              }}
            >
              Add Appointment
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Register
              show={false}
              onPatientAdded={() => {
                setIsSidebarOpen(false);
                dispatch(getallPatients());
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Patient Registration Sidebar */}
      <div
        className={`fixed sm:hidden top-0 right-0 h-full md:w-64 w-full bg-white shadow-xl transform transition-transform duration-300 overflow-hidden ${
          isSidebarOpen ? "translate-y-0" : "translate-y-full"
        } z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between p-4 border-b">
            <h2
              className="text-sm px-4 py-2 border rounded-md text-white bg-green-500 text-center cursor-pointer"
              onClick={() => {
                setAppointmentSidebar(true);
                setIsSidebarOpen(false);
              }}
            >
              Add Appointment
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Register
              show={false}
              onPatientAdded={() => {
                setIsSidebarOpen(false);
                dispatch(getallPatients());
              }}
            />
          </div>
        </div>
      </div>

      {/* Appointment Sidebar */}
      <div
        className={`hidden sm:block fixed top-0 right-0 h-full w-2/3 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 ${
          appointmentSidebar ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-sm px-4 py-2 text-black text-center cursor-pointer mb-2">
              Add Appointment
            </h2>
            <button
              onClick={() => setAppointmentSidebar(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>
          </div>
          <Appointment
            show={false}
            onAppointmentAdded={() => {
              setAppointmentSidebar(false);
              dispatch(getallPatients());
            }}
          />
        </div>
      </div>

      {/* Mobile Appointment Sidebar */}
      <div
        className={`fixed sm:hidden top-0 right-0 h-full md:w-64 w-full bg-white shadow-xl transform transition-transform duration-300 ${
          appointmentSidebar ? "translate-y-0" : "translate-y-full"
        } z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-sm px-4 py-2 text-center cursor-pointer mb-2">
              Add Appointment
            </h2>
            <button
              onClick={() => setAppointmentSidebar(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>
          </div>
          <Appointment
            show={false}
            onAppointmentAdded={() => {
              setAppointmentSidebar(false);
              dispatch(getallPatients());
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ModernNavbar;
