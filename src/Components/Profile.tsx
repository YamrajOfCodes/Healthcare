'use client';
import React, { useState } from 'react';
import { User, FileText, Activity, Clock, MoreVertical, Phone, MapPin, Shield } from 'lucide-react';
import EditPatient from './Dashboard/EditPatient';


type ProfileProps = {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  addedBy: string;
  visits: number;
  entryTime: string;
  waitingTime: string;
  updated_at: string;
};




const profiles: ProfileProps[] = [
  {
    id: 1,
    name: 'MR Shounak Dey - VJNSPTH',
    age: 41,
    gender: 'Male',
    address: 'Mahindra, flat no 4, Pimpri, PUNE',
    phone: '+91 2323 323 3232',
    addedBy: 'super admin by no doctor',
    visits: 9,
    entryTime: '1:00pm',
    waitingTime: '2 mins',
    updated_at: '2 mins',
  },
  // Add more profiles here...
];

const ProfileCard: React.FC<ProfileProps> = ({
  name,
  address,
  phone,
  entryTime,
  updated_at
},) => {
  const [redirected,setredirected] = useState<boolean>(false)


 

  let entryyear = entryTime.slice(0,4);
  let entrymonth:any = entryTime.slice(5,7)
  let entryday = entryTime.slice(8,10)

  
  

  if(entrymonth == 1){
    entrymonth = "Jan"
  }else if(entrymonth == 2){
     entrymonth = "Feb"
  }else if(entrymonth == 3){
    entrymonth = "March"
  }else if(entrymonth == 4){
    entrymonth = "April"
  }else if(entrymonth == 5){
    entrymonth = "May"
  }else if(entrymonth == 6){
    entrymonth = "June"
  }else if(entrymonth == 7){
    entrymonth = "July"
  }else if(entrymonth == 8){
    entrymonth = "August"
  }else if(entrymonth == 9){
    entrymonth = "Sept"
  }else if(entrymonth == 10){
   entrymonth = "October"
  }else if(entrymonth == 11){
   entrymonth = "November"
  }else{
  entrymonth = "December"
  } 
  
  
  

  const date = new Date(updated_at)


  // console.log("time today",date)
   


 
  // Function to handle clicks on the overlay (background)
  const handleOverlayClick = () => {
    setredirected(false); // Close the modal by setting the state to false
  };

  // Function to stop the event propagation when clicking inside the modal
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if(redirected){
    window.scrollTo(0,0)
  }



  // const handleeditpatient = (e)=>{
  //   window.scrollTo(0,0);
  //   setIsEditing(true);
  //   seteditpatient(e)
  // }
  

 

  return (
    <>
  

{/* For big screens */}

<div 
      className="w-full max-w-4xl bg-gradient-to-br from-pink-100 to-pink-50 border border-gray-400 rounded-2xl shadow-lg p-8 hidden xl:block
                 backdrop-blur-xl border border-white/20 transition-all duration-500 
                 hover:shadow-2xl hover:border-blue-200/30"
    >
      <div className="flex items-center justify-between gap-8">
        {/* Profile Section */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="relative group shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-xl">
              <User className="h-8 w-8 text-white drop-shadow-md" />
            </div>
          </div>
          
          {/* Patient Details */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 truncate">
               {name}
              </h2>
              <Shield className="h-4 w-4 text-blue-500 shrink-0" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 shrink-0" />
                <p className="text-sm truncate">{address}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 shrink-0" />
                <p className="text-sm">+91 {phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col items-end gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-600">{entryday}</span>
            <div className="text-sm text-gray-500">
              <p>{entrymonth}</p>
              <p>{entryyear}</p>
            </div>
          </div>
          
          {/* OPD Buttons */}
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                           shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 
                           transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>OPD Bill</span>
              </div>
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl 
                           shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 
                           transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Health Chart</span>
              </div>
            </button>
          </div>         
        </div>
      </div>
    </div>

{/* For sma screens */}
    <div 
      className="w-[300px] sm:w-[330px] bg-white rounded-xl shadow-lg p-4 xl:hidden
                 backdrop-blur-xl border border-white/20 transition-all duration-500 
                 hover:shadow-2xl hover:border-blue-200/30"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-xl">
            <User className="h-8 w-8 text-white drop-shadow-md" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              {name}
            </h2>
            <Shield className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <p className="text-xs">{address}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <p className="text-xs">+91 {phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Section */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">{entryday}</span>
          <div className="text-sm text-gray-500">
            <p>{entrymonth}</p>
            <p>{entryyear}</p>
          </div>
        </div>
      </div>

      {/* Time Information */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-medium">No entry time available</span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                         shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 
                         transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="text-xs">OPD Bill</span>
            </div>
          </button>
          
          <button className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl 
                         shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 
                         transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Health Chart</span>
            </div>
          </button>
        </div>

        {/* <div className="relative">
          <button 
            onClick={() => setOpen(!open)}
            className="w-full p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <span className="text-xs">More Options</span>
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {open && (
            <div className="absolute top-0 left-0 right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 
                         backdrop-blur-lg py-2 z-10">
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 
                             transition-colors">
                Edit Patient
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 
                             transition-colors">
                View History
              </button>
            </div>
          )}
        </div> */}
      </div>
    </div>




   
    {redirected && (
        <div
          className="w-[100vw] h-[100%] absolute top-0 left-0 bg-black/40 z-10 flex justify-center pt-5"
          onClick={handleOverlayClick} // If you click on the overlay, it will close the modal
        >
          {/* Inside the modal (EditPatient), click will stop propagation */}
          <div onClick={handleModalClick} className='w-2/3'>
            <EditPatient 
              patientdata={{}}
              onClose={() => setredirected(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
