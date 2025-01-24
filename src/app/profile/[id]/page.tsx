"use client";
import {
  getallPatients,
  getAppointments,
  patientPrescription,
} from "@/Redux/Slices/Patient/patientSlices";
import { useAppDispatch } from "@/hooks";
import { RootState } from "@/Redux/App/store";
import {
  Home,
  Clock,
  CreditCard,
  FileText,
  History,
  Phone,
  User,
  Mail,
  ChevronRight,
  Printer,
  Calendar,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { BaseAppointment } from "@/types/shared";
import HealthChart from "@/Components/Dashboard/Healthchart";
import Billings from "@/Components/Dashboard/Billings";
import VisitHistoryPopup from "@/Components/Dashboard/ViewHistoryPopup";

const page = () => {
  const { id } = useParams(); // Extract the patient ID from URL params
  const dispatch = useAppDispatch();
  const { getappointments } = useSelector((state: RootState) => state.Patient); // Access appointments from the store
  const { allpatients } = useSelector((state: RootState) => state.Patient);
  const { prescriptions } = useSelector((state: RootState) => state.Patient);
  let datas;
  // console.log("prescriptions",prescriptions?.prescriptions);

  const healthdata = {
    patient_id: 1,
    description: "Some description about the patient's health.",
    date: "2025-01-20",
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    healthMetrics: [
      { name: "Exercise", value: "80" },
      { name: "Diet", value: "70" },
    ],
    attachment_path: "/path/to/attachment",
  };

  // @ts-ignore
  const filterPrescription = prescriptions?.prescriptions?.filter((element) => {
    if (element?.id == id) {
      return element;
    }
  });

  console.log(filterPrescription);

  const Prescription_details = filterPrescription?.[0]?.prescription_details;
  console.log(Prescription_details);

  setTimeout(() => {
    if (Prescription_details == undefined) {
      console.log("data is not defined");
      if (activeItem === "prescription") {
        return <div>Prescription is not found</div>;
      }
    } else {
      datas = JSON.parse(Prescription_details);
      // console.log(data);
    }
  }, 3000);

  const [activeItem, setActiveItem] = useState("profile");

  const navItems = [
    { id: "profile", label: "Profile" },
    { id: "prescription", label: "Prescription" },
    { id: "billing", label: "OTD Billing" },
    { id: "healthchart", label: "Health Chart" },
  ];

  const filteindividual = allpatients?.filter((element) => {
    if (element.id == id) {
      return element;
    }
  });

  // console.log(filteindividual);

  const [patients, setPatient] = useState<any>(null); // Initialize patients state
  const [loading, setLoading] = useState<boolean>(true); // Loading state to handle fetching data

  // Function to filter patient based on patient ID
  const filterpatient = () => {
    if (getappointments?.appointments) {
      const data = getappointments.appointments.filter(
        (element: any) => element.patient_id == id
      );

      // Set the filtered data to patients state
      setPatient(data);
      console.log("Filtered Data:", data);
    }
  };

  const [data, setdata] = useState<BaseAppointment[]>([]);
  // console.log(getappointments.appointments);

  const handleupcoming = () => {
    const upcominappointments =
      getappointments?.appointments?.filter((element: BaseAppointment) => {
        const appointmentDate = new Date(element.appointment_date);
        const now = new Date();
        return appointmentDate > now;
      }) || []; // Add default empty array to avoid undefined

    setdata(upcominappointments);
  };

   console.log(data);

  const [origionaldata, setorigionaldata] = useState<BaseAppointment[]>([]);

  const handleData = () => {
    const filteredData =data?.filter((element:any)=>{
          if(element.patient_id == id){
            return element;
          }
    })
  

    setorigionaldata(filteredData || []);
  };

  console.log(origionaldata);
  

  // Effect to dispatch the action when the component mounts
  useEffect(() => {
    dispatch(getAppointments());
    dispatch(getallPatients());
    dispatch(patientPrescription());
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
    handleData();
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
      { date: "Dec 10, 2024", doctor: "Dr. Brown", reason: "Flu Symptoms" },
    ],
    appointments: [
      { date: "Jan 24, 2025", time: "10:00 AM", doctor: "Dr. Smith" },
      { date: "Feb 15, 2025", time: "2:30 PM", doctor: "Dr. Wilson" },
    ],
    transactions: [
      { date: "Jan 15, 2025", amount: "$150", description: "Consultation" },
      { date: "Dec 10, 2024", amount: "$75", description: "Blood Test" },
    ],
  };

  const [showVisitHistory, setShowVisitHistory] = useState(false);

  // Add this demo billing data
  const demoBillings = [
    {
      id: "BILL001",
      date: "2024-03-15",
      time: "10:30 AM",
      total_amount: 1500,
      discount: 0,
      payable_amount: 1500,
      received_amount: 1500,
      payment_mode: "Cash",
      doctor: "Dr. Smith",
      status: "Paid",
      opd_type: "General OPD",
      subtype: "N/A",
      diagnosis: "Regular checkup",
      remarks: "Patient doing well"
    },
    {
      id: "BILL002",
      date: "2024-03-10",
      time: "2:15 PM",
      total_amount: 2500,
      discount: 250,
      payable_amount: 2250,
      received_amount: 2250,
      payment_mode: "Card",
      doctor: "Dr. Williams",
      status: "Paid",
      opd_type: "Specialist OPD",
      subtype: "Cardiology",
      diagnosis: "Hypertension follow-up",
      remarks: "BP under control"
    },
    {
      id: "BILL003",
      date: "2024-03-01",
      time: "11:45 AM",
      total_amount: 1800,
      discount: 0,
      payable_amount: 1800,
      received_amount: 0,
      payment_mode: "Pending",
      doctor: "Dr. Davis",
      status: "Pending",
      opd_type: "General OPD",
      subtype: "N/A",
      diagnosis: "Fever and cold",
      remarks: "Prescribed antibiotics"
    }
  ];

  // Add these calculations
  const pendingBills = demoBillings.filter(bill => bill.status === 'Pending');
  const pendingAmount = pendingBills.reduce((sum, bill) => sum + bill.payable_amount, 0);
  const paidAmount = demoBillings.reduce((sum, bill) => sum + bill.total_amount, 0) - pendingAmount;

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
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {filteindividual?.[0]?.name}
              </h1>
              <p className="text-gray-500 bg-gray-100 px-4 py-1 rounded-full inline-block">
                ID: #${id}
              </p>
            </div>
          </div>
        </div>

        <nav className="bg-white rounded-xl shadow-md mx-4 mb-6">
          <ul className="flex items-center relative p-2">
            {navItems.map((item) => (
              <li key={item.id} className="relative flex-1">
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg
                ${
                  activeItem === item.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }
              `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {activeItem === "profile" ? (
          <>
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
                    <p className="font-semibold text-gray-800">
                      {filteindividual?.[0]?.phone}
                    </p>
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
                    <p className="font-semibold text-gray-800">
                      {filteindividual?.[0]?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-gray-800 truncate">
                      {filteindividual?.[0]?.address}
                    </p>
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
                    <p className="font-semibold text-gray-800">
                      {filteindividual?.[0]?.visit_count}
                    </p>
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
                    <h2 className="text-xl font-bold text-gray-800">
                      Visit History
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowVisitHistory(true)}
                    className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Recent Visits */}
                <div className="space-y-4">
                  {patients?.slice(0, 3).map((visit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {visit?.doctor?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {visit?.appointment_date?.slice(0, 10)}
                            </p>
                          </div>
                          {/* <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span> */}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Time: {visit?.appointment_date?.slice(10, 16)}</p>
                          <p>Mode: {visit?.mode || "In-person"}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!patients || patients.length === 0) && (
                    <div className="text-center py-4 text-gray-500">
                      No visit history available
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Upcoming Appointments
                    </h2>
                  </div>
                  <button className="text-green-500 hover:text-green-600 flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {origionaldata?.length > 0 ? (
                    <>
                      {" "}
                      {origionaldata?.map((appointment, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {appointment?.doctor?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment?.appointment_date.slice(10, 16)}
                            </p>
                            <p className="text-sm text-gray-400">
                              {appointment.appointment_date.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    "No upcoming Appointments"
                  )}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-90 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Recent Transactions
                    </h2>
                  </div>
                  <button className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {patient.transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {transaction.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeItem === "billing" ? (
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Total Bills</p>
                <p className="text-2xl font-bold text-gray-900">₹{demoBillings.reduce((sum, bill) => sum + bill.total_amount, 0)}</p>
                <p className="text-xs text-gray-600 mt-1">{demoBillings.length} bills</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">₹{pendingAmount}</p>
                <p className="text-xs text-orange-600 mt-1">{pendingBills.length} bills pending</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-gray-900">₹{paidAmount}</p>
                <p className="text-xs text-green-600 mt-1">All time paid</p>
              </div>
            </div>

            {/* Bills List */}
            <div className="space-y-4">
              {demoBillings.map((bill, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bill #{bill.id}</p>
                      <p className="text-xs text-gray-500">{bill.opd_type}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      bill.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {bill.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                    <div>
                      <p className="text-gray-500 text-xs">Date & Time</p>
                      <p className="font-medium text-gray-900">{bill.date}</p>
                      <p className="text-gray-600 text-xs">{bill.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Amount</p>
                      <p className="font-medium text-gray-900">₹{bill.total_amount}</p>
                      <p className="text-gray-600 text-xs">Discount: ₹{bill.discount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Payment</p>
                      <p className="font-medium text-gray-900">₹{bill.payable_amount}</p>
                      <p className="text-gray-600 text-xs">{bill.payment_mode}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Doctor</p>
                      <p className="font-medium text-gray-900">{bill.doctor}</p>
                      <p className="text-gray-600 text-xs">{bill.diagnosis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeItem === "prescription" ? (
          <>
            {filterPrescription?.length > 0 ? (
              <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative bg-emerald-100 p-8 flex justify-between">
                  <h1 className="text-xl font-bold text-gray-800">
                    Digitech <span className="text-emerald-500">CHOICE</span>{" "}
                    CLINIC
                  </h1>
                  {/* <h2 className="text-lg font-semibold text-gray-800"> */}
                  {/* Dr. {appointmentData?.["Doctor Name"] || ""} */}
                  {/* </h2> */}
                  <p className="px-4 py-1 bg-green-500 rounded-lg text-white">
                    {" "}
                    {filterPrescription?.[0]?.appointment?.mode}
                  </p>
                </div>
                <div className="p-8 pt-5">
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900">
                          NAME OF PATIENT
                        </label>
                        <div className="mt-1 p-2 bg-emerald-50 rounded">
                          {filterPrescription?.[0]?.appointment?.patient?.name}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900">
                          Appointment ID
                        </label>
                        <div className="mt-1 p-2 bg-emerald-50 rounded">
                          {filterPrescription?.[0]?.appointment?.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900">
                          AGE
                        </label>
                        <div className="mt-1 p-2 bg-emerald-50 rounded">
                          {new Date().getFullYear() -
                            filterPrescription?.[0]?.appointment?.patient?.dob.slice(
                              0,
                              3
                            )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        ADDRESS
                      </label>
                      <div className="mt-1 p-2 bg-emerald-50 rounded">
                        {filterPrescription?.[0]?.appointment?.patient?.address}
                      </div>
                    </div>
                    <div className="h-80"></div>
                    <div>
                      <p>signature</p>
                      <div className="w-1/3 border-b border-gray-700 mt-5"></div>
                    </div>
                  </div>
                  <div className="mt-5 pt-8 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      // onClick={handlePrint}
                    >
                      <Printer className="inline-block w-5 h-5 mr-2" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              "No prescription Found"
            )}
          </>
        ) : (
          <HealthChart healthData={healthdata} />
        )}
        {/* Add VisitHistoryPopup */}
        {showVisitHistory && (
          <VisitHistoryPopup
            onClose={() => setShowVisitHistory(false)}
            visits={patients || []}
            patientName={filteindividual?.[0]?.name || ""}
          />
        )}
      </div>
    </div>
  );
};

export default page;
