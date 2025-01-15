"use client"
import { deletePatient, getallPatients} from '@/Redux/Slices/Patient/patientSlices';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Activity, Calendar, ChevronRight, Clock, Edit2, Search, Trash2, Users } from 'lucide-react';
import PatientEditForm from './EditPatient';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';



const Patients = () => {
    const dispatch = useAppDispatch();
    const [search,setsearch]=useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editpatient,seteditpatient]=useState(null)
    const {deletepatient} = useSelector((state:RootState)=>state.Patient);

    console.log(deletepatient);

   


    const handleeditpatient = (e)=>{
      window.scrollTo(0,0);
      setIsEditing(true);
      seteditpatient(e)
    }
    
    
    
     
   useEffect(()=>{
    dispatch(getallPatients())
   },[])



    const {allpatients} = useSelector((state:RootState)=>state.Patient)
    console.log("data",allpatients)
    
    const [patients,setPatients] = useState(allpatients);


    const handlesearch = (e) => {
      setsearch(e)
  
      if (!allpatients[0] || !Array.isArray(allpatients[0])) {
          console.error("Invalid data format for allpatients");
          setPatients([]); // Reset patients to an empty array
          return;
      }
  
      const data = allpatients[0].filter((element) => {
          if (!element?.name) return false; // Ensure element and name exist
  
          const substring = element.name.slice(0, search.length).toLowerCase();
          return substring === search.toLowerCase(); // Case-insensitive comparison
      });
  
      console.log("Filtered data:", data);
      setPatients(data);
  };


  const resethandle = ()=>{
    setPatients(allpatients?.[0]);
    setsearch("");
  }

  const handledeletepatient = (data)=>{
    console.log("id",data);
    dispatch(deletePatient(data));
  }

 

  return (
    <div>
<div className="  overflow-hidden " style={{width:"100vw"}}>
 {
  patients?  <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
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
        onChange={(e)=>{handlesearch(e.target.value)}}
      />
    </div>
    <button onClick={resethandle} className='px-6 py-2 bg-white/40 rounded-md text-gray-500 md:text-white hover:bg-white/20 font-semibold'>Reset</button>
  </div>

  {/* Main table */}
  <div className="w-full">
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
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">#{profile.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{profile.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date().getFullYear() - profile.dob.slice(0, 4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {profile.visit_count}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className="text-blue-600 hover:text-blue-900 inline-flex items-center space-x-1"onClick={handleeditpatient} >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button className="text-red-600 hover:text-red-900 inline-flex items-center space-x-1">
                    <Trash2 className="h-4 w-4" />
                    <span onClick={()=>{handledeletepatient(profile.id)}}>Delete</span>
                  </button>
                </td>
          
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div className={`"overlay absolute -top-28 w-[100%] h-[120vh] bg-black/40 left-0 py-10 " ${isEditing? 'block' : 'hidden'}`}>
              <PatientEditForm 
              patientdata={editpatient}
              onClose={() => setIsEditing(false)}
              />
            </div>
  

  {/* Mobile View - Cards */}
  <div className="space-y-4 px-3 py-4 max-w-sm lg:hidden w-full overflow-hidden">
  {patients?.map((profile: any) => (
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
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Mr.{profile.name}
              </h3>
              <p className="text-xs text-gray-500">Patient Profile</p>
            </div>
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
            handleeditpatient(profile);
          }}
        >
          <Edit2 className="h-3 w-3" />
          <span className="text-xs font-semibold">Edit</span>
        </button>
        <button
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-600 transition-all duration-200"
          onClick={() => {
            handledeletepatient(profile.id);
          }}
        >
          <Trash2 className="h-3 w-3" />
          <span className="text-xs font-semibold">Delete</span>
        </button>
      </div>
    </div>
  ))}
</div>

</div>


</div> : "NO patients Data"
 }
</div>





    </div>
  )
}

export default Patients
