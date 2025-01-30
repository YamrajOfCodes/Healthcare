"use client"
import { Printer, X } from 'lucide-react';
import logo from "@/Assets/vedgarbha_logo.png"
import Image from 'next/image';
import { useState } from 'react';

interface PrescriptionTemplateProps {
  selectedPrescription: any;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const PrescriptionTemplate: React.FC<PrescriptionTemplateProps> = ({ 
  selectedPrescription, 
  onClose,
  showCloseButton = true 
}) => {

   const [handlecross,setCross] = useState(true)
 
  const handlePrint = () => {
    window.print();
  };

  // Helper function to get patient name
  const getPatientName = () => {
    if (selectedPrescription?.patient?.name) {
      return selectedPrescription.patient.name;
    }
    if (selectedPrescription?.name) {
      return selectedPrescription.name;
    }
    if (selectedPrescription?.appointment?.patient?.name) {
      return selectedPrescription.appointment.patient.name;
    }
    return 'N/A';
  };

  // Helper function to get patient age
  const getPatientAge = () => {
    const dob = selectedPrescription?.patient?.dob || 
                selectedPrescription?.dob || 
                selectedPrescription?.appointment?.patient?.dob;
    if (dob) {
      return new Date().getFullYear() - parseInt(dob.slice(0,4));
    }
    return 'N/A';
  };

  // Helper function to get patient address
  const getPatientAddress = () => {
    return selectedPrescription?.patient?.address || 
           selectedPrescription?.address || 
           selectedPrescription?.appointment?.patient?.address || 
           'N/A';
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 shadow-2xl">
      {showCloseButton && (
        <div className={`absolute top-0 right-0 z-20 crossbar  border-gray-200 ${handlecross? 'block' : "hidden"}`} >
          <div className="p-6">
            <div className="flex justify-end items-center">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 ">
        <div className="relative min-h-[1000px]">
          {/* Watermark Logo - Centered */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-[400px] h-[400px] flex items-center justify-center">
              <Image 
                src={logo.src}
                height={1000}
                width={1000}
                alt="Vedgarbha Ayurveda Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="p-8">
              <div className="flex items-center gap-4">
                {/* Header Logo */}
                <div className="w-32">
                <Image 
                src={logo.src}
                height={300}
                width={300}
                alt="Vedgarbha Ayurveda Logo" 
                className="w-full h-full object-contain"
              />
                </div>
                
                {/* Header Text */}
                <div className="flex-1">
                  <h1 className="text-[#8B0000] text-2xl font-bold">
                    Vedgarbha Ayurveda
                  </h1>
                  <h2 className="text-lg text-gray-700">
                    Panchakarma & Fertility Clinic
                  </h2>
                  <div className="mt-2">
                    <p className="text-sm text-black">Dr. Pallavi Chindhe</p>
                    <p className="text-sm text-gray-600">M.S. (Ayu Gynec)</p>
                    <p className="text-sm text-gray-600">Reg. No.: I-88793-A</p>
                    <p className="text-sm text-gray-600">Mob.: 8766882737</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-right text-sm text-gray-600">
                  <p>For Appointment</p>
                  <p>9359-8686-65</p>
                  <p>vedgarbhaayurveda@gmail.com</p>
                  <p>www.vedgarbhaayurveda.com</p>
                  <div className="mt-2">
                    <p>Timing : Monday - Saturday</p>
                    <p>Morning 10.00 am - 1.00 pm</p>
                    <p>Evening 4.00 pm - 8.00 pm</p>
                    <p>Sunday Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescription Content */}
            <div className="p-8 pt-5">
              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500">
                      NAME OF PATIENT
                    </label>
                    <div className="mt-1 text-black p-2 bg-white/80 backdrop-blur-sm ">
                      {getPatientName()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black">
                      Appointment ID
                    </label>
                    <div className="mt-1 text-black p-2 bg-white/80 backdrop-blur-sm ">
                      {selectedPrescription?.id || selectedPrescription?.appointment_id || 'N/A'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500">
                      AGE
                    </label>
                    <div className="mt-1 p-2 text-black bg-white/80 backdrop-blur-sm ">
                      {getPatientAge()}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    ADDRESS
                  </label>
                  <div className="mt-1 text-black p-2 bg-white/80 backdrop-blur-sm ">
                    {getPatientAddress()}
                  </div>
                </div>
                <div className="h-80 relative z-10">
                  {/* Prescription content area */}
                </div>
                <div className="relative z-10">
                  <p className="text-black">signature</p>
                  <div className="w-1/3 border-b border-gray-700 mt-5"></div>
                </div>
              </div>
              <div className="mt-5 pt-8 text-center relative z-10 print">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handlePrint}
                >
                  <Printer className="inline-block w-5 h-5 mr-2" />
                  Print
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-sm text-gray-600 relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  Follow Us: 
                  <span className="ml-2">@vedgarbha_ayurveda</span>
                  <span className="ml-2">vedgarbha ayurveda Panchakarma & Fertility Clinic</span>
                </div>
              </div>
              <p className="mt-2 text-center">
                201, Second Floor, DS Tower, Above Siddhi Medical, Opp. KTC Building,<br />
                Near Dange Chowk, Datta Mandir Road, Wakad, Pune - 33
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionTemplate; 