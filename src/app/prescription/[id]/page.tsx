"use client";

import { useState, useEffect } from "react";
import { Printer } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { patientPrescription } from "@/Redux/Slices/Patient/patientSlices";
import { RootState, AppDispatch } from "@/Redux/App/store";
import { useAppDispatch } from "@/hooks";

// Custom hook for typed dispatch


// Define the type for a single prescription
type Prescription = {
  appointment_id: string;
  prescription_details: string;
  appointment: {
    patient: {
      dob: string;
      address: string;
      name: string;
    };
    appointment_date: string;
  };
};

// Component definition
const Prescription = () => {
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { prescriptions } = useSelector((state: RootState) => state.Patient);
  const { id } = useParams();

  useEffect(() => {
    // Dispatch the action to fetch prescriptions
    dispatch(patientPrescription());
  }, [dispatch]);

  useEffect(() => {
    if (prescriptions.length > 0) {
      const matchedPrescription = prescriptions[0]?.prescriptions?.find(
        (element: Prescription) => element.appointment_id === id
      );
      setPrescription(matchedPrescription || null);
    }
  }, [prescriptions, id]);

  // Disable the loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Render no prescription found state
  if (!prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No prescriptions found.
      </div>
    );
  }

  // Extract data from the prescription
  const appointmentData = JSON.parse(prescription.prescription_details);
  const dob = parseInt(prescription.appointment.patient.dob.slice(0, 4), 10);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative bg-emerald-100 p-8">
          <h1 className="text-xl font-bold text-gray-800">
            Digitech <span className="text-emerald-500">CHOICE</span> CLINIC
          </h1>
          <h2 className="text-lg font-semibold text-gray-800">
            Dr. {appointmentData["Doctor Name"]}
          </h2>
        </div>
        <div className="p-8 pt-5">
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500">
                  NAME OF PATIENT
                </label>
                <div className="mt-1 p-2 bg-emerald-50 rounded">
                  {appointmentData["Patient Name"]}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500">
                  Appointment ID
                </label>
                <div className="mt-1 p-2 bg-emerald-50 rounded">
                  {prescription.appointment_id}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500">
                  AGE
                </label>
                <div className="mt-1 p-2 bg-emerald-50 rounded">
                  {new Date().getFullYear() - dob}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                ADDRESS
              </label>
              <div className="mt-1 p-2 bg-emerald-50 rounded">
                {prescription.appointment.patient.address}
              </div>
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
    </div>
  );
};

export default Prescription;
