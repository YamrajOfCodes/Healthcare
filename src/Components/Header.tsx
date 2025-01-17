"use client"

import React, { useEffect, useState } from 'react';
import { Search, Settings, Phone, UserCircle, Calendar, UserPlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { getallPatients } from '@/Redux/Slices/Patient/patientSlices';

const ModernNavbar = () => {

  const { allpatients } = useSelector((state: RootState) => state.Patient);
   console.log(allpatients);
   const [search,setsearch] = useState(false);
   const [patient,setpatient] = useState(allpatients);

   const handlesearch = (data:any)=>{
    // setsearch(data);

    console.log(data);
    

    const filterdata = allpatients?.filter((patients)=>{
      const sliceName = patients.name.slice(0,data.length).toLocaleLowerCase();
      console.log(sliceName);
      
      if(data === sliceName){
        return patients
      }
    })

    setpatient(filterdata)
    console.log(patient);
    


   }
   
  const dispatch = useAppDispatch();
    
    useEffect(() => {
      dispatch(getallPatients());
    }, []);
  

  return (
    <nav className="w-full z-20 top-0">
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6">
            <div className="flex h-20 items-center justify-between">
              {/* Left Section - Search */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 
                                   group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2.5 w-48 sm:w-72 rounded-full border border-gray-200/80 
                             text-sm bg-white/50 
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                             focus:border-blue-500 transition-all duration-300
                             group-hover:shadow-lg group-hover:shadow-blue-500/5"
                          onChange={(e)=>{handlesearch(e.target.value)}}
                          onFocus={()=>{setsearch(true)}}
                        
                          onBlur={()=>{setsearch(false)}}
                  />
                </div>
                <div className={`results fixed bg-blue-400 h-44 w-1/4 bg-green-400 top-20 z-20  ${search? 'block' : 'hidden'} `}>
                  <div className={`flex flex-col w-1/4 ml-5 `} key={"10"}>
                    {
                      search &&  patient?.map((element,index)=>{
                        return(
                          <>
                          <p key={index}>{element?.name}</p>
                        
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              {/* Center Section - Action Buttons */}
              <div className="flex items-center gap-4">
                <button className="px-4 py-2.5 flex items-center gap-2 bg-blue-600 text-white 
                                 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20
                                 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-300">
                  <UserPlus className="h-4 w-4" />
                  Add Patient
                </button>
                <button className="px-4 py-2.5 flex items-center gap-2 bg-indigo-600 text-white 
                                 rounded-full text-sm font-medium shadow-lg shadow-indigo-500/20
                                 hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all duration-300">
                  <Calendar className="h-4 w-4" />
                  Schedule Appointment
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                {/* Settings with notification dot */}
                <div className="relative">
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                  <button className="p-2.5 text-gray-500 hover:text-gray-700 
                                   bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">+91 35637 38380</span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l">
                  <div className="relative group">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 
                                  p-0.5 group-hover:shadow-lg group-hover:shadow-indigo-500/30 
                                  transition-all duration-300">
                      <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Super Admin</span>
                    <span className="text-xs text-gray-500">Healthcare System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;