"use client"
import { getAppointments } from '@/Redux/Slices/Patient/patientSlices';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { 
    Home,
    Clock,
    CreditCard,
    FileText,
    History,
    Phone,
    User,
    Mail,
    ChevronRight
  } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';


const page = () => {



    const { id } = useParams(); // Extract the patient ID from URL params
    const dispatch = useAppDispatch();
    const { getappointments } = useSelector((state: RootState) => state.Patient); // Access appointments from the store
    
    const [patients, setPatient] = useState<any>(null); // Initialize patients state
    const [loading, setLoading] = useState<boolean>(true); // Loading state to handle fetching data
    
    // Function to filter patient based on patient ID
    const filterpatient = () => {
      if (getappointments?.appointments) {
        // Filter the appointments based on patient_id
        const data = getappointments.appointments.filter(
          (element: any) => element.patient_id == id
        );
        
        // Set the filtered data to patients state
        setPatient(data);
        console.log("Filtered Data:", data);
      }
    };





     const [data,setdata] = useState([])
       // console.log(getappointments.appointments);
     
       
       
     
     
       const handleupcoming = () => {
         const upcominappointments = getappointments?.appointments?.filter((element: any) => {
           const sliceDate = element?.appointment_date; // Ensure this is in "YYYY-MM-DD HH:mm:ss" format
           if (sliceDate) {
             const appointmentDate = new Date(sliceDate); // Parse the string into a Date object
             const now = new Date(); // Current date and time
            //  console.log("Appointment Date:", appointmentDate);
            //  console.log("Current Date:", now);
       
             // Check if the appointment date is in the future
             return appointmentDate > now;
           }
           return false; // Exclude if sliceDate is invalid
         }).map((element: any) => {
           // Transform the filtered data into the required format
           return {
             id: element?.id,
             patientName:element?.patient?.name,
             date: element?.appointment_date.slice(0,10),
             time:element?.appointment_date.slice(10,16),
             doctor: element?.doctor?.name,
             status: element?.status,
             phone: element?.patient.phone,
             mode:element?.mode
           };
         });
       
        //  console.log("Upcoming Appointments:", upcominappointments); // Log the filtered results
         setdata(upcominappointments); // Update the state

         
         console.log(data);
         
            const individual = data?.filter((element)=>{
                console.log(element);
                
                if(element.id == id){
                    return element
                }
            })
            console.log("individual",individual);
            
         
       };
       
       

    
    // Effect to dispatch the action when the component mounts
    useEffect(() => {
      dispatch(getAppointments());
    }, [dispatch]);
    
    // Effect to filter patient when appointments are updated
    useEffect(() => {
      if (getappointments) {
        filterpatient();
        setLoading(false); // Set loading to false once the appointments are fetched and filtered
        handleupcoming();
      }
    }, [getappointments]);
    
    // Effect to log patients whenever the state updates
    useEffect(() => {
      console.log("Updated Patients:", patients);
    }, [patients]);
    
    
    const patient = {
        name: "Sarah Johnson",
        age: 42,
        email: "sarah.j@email.com",
        phone: "(555) 123-4567",
        address: "123 Healthcare Ave, Medical District, NY 10001",
        totalVisits: 15,
        visits: [
          { date: "Jan 15, 2025", doctor: "Dr. Smith", reason: "Regular Checkup" },
          { date: "Dec 10, 2024", doctor: "Dr. Brown", reason: "Flu Symptoms" }
        ],
        appointments: [
          { date: "Jan 24, 2025", time: "10:00 AM", doctor: "Dr. Smith" },
          { date: "Feb 15, 2025", time: "2:30 PM", doctor: "Dr. Wilson" }
        ],
        transactions: [
          { date: "Jan 15, 2025", amount: "$150", description: "Consultation" },
          { date: "Dec 10, 2024", amount: "$75", description: "Blood Test" }
        ]
      };




      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{patients?.[0]?.patient?.name}</h1>
                  <p className="text-gray-500 bg-gray-100 px-4 py-1 rounded-full inline-block">ID: #${id}</p>
                </div>
              </div>
            </div>
    
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold text-gray-800">{patients?.[0]?.patient?.phone}</p>
                  </div>
                </div>
              </div>
    
              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-md">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-semibold text-gray-800">{patients?.[0]?.patient?.email}</p>
                  </div>
                </div>
              </div>
    
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-gray-800 truncate">{patients?.[0]?.patient?.address}</p>
                  </div>
                </div>
              </div>
    
              {/* Total Visits Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Visits</p>
                    <p className="font-semibold text-gray-800">{patients?.[0]?.patient?.visit_count}</p>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Detailed Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visit History */}
              <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <History className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Visit History</h2>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {patients?.slice(0,3).map((appointment, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                      <p className="font-semibold text-gray-800">{appointment?.doctor?.name}</p>
                        <p className="text-sm text-gray-500">{appointment?.appointment_date.slice(10,16)}</p>
                        <p className="text-sm text-gray-400">{appointment.appointment_date.slice(0,10)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                  </div>
                  <button className="text-green-500 hover:text-green-600 flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                 {
                    data?.length>0? <> {data?.map((appointment, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                          <p className="font-semibold text-gray-800">{appointment?.doctor}</p>
                            <p className="text-sm text-gray-500">{appointment?.time}</p>
                            <p className="text-sm text-gray-400">{appointment.date}</p>
                          </div>
                        </div>
                      ))}</> : "No upcoming Appointments"
                 }
                </div>
              </div>
    
              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
                  </div>
                  <button className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {patient.transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">{transaction.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default page
