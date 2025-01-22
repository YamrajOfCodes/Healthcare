"use client"

import { useState } from 'react'; // Import useState hook for state management
import { Hospital, Mail, Phone, Calendar, User , Lock, Home } from 'lucide-react';
import Image from 'next/image';
import doctorpanne from "@/Assets/doctors.png"
import doctorpann from "@/Assets/rb_1515.png"
import { useDispatch } from 'react-redux';
import { RegisterPatient } from '@/Redux/Slices/Patient/patientSlices';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AppDispatch } from '@/Redux/App/store';
import { RegisterFormData, RegisterProps } from '@/types/auth';

export const useAppDispatch = () => useDispatch<AppDispatch>();


export default function Register({ show, onPatientAdded }: RegisterProps) {
  const router = useRouter();
  const [order, setOrder] = useState(1); // Track the order of the sections
  const [isSliding, setIsSliding] = useState(false); // Track sliding animation state
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  const handleOrderChange = () => {
    setIsSliding(!isSliding);
    setOrder(order === 1 ? 2 : 1);
   
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove redundant formData declaration - we already have the state
    const { name, dob, gender, phone, email, address, password } = formData;

    if (name === "") {
      toast.error("Name is required");
    } else if (dob === "") {
      toast.error("Date of birth is required");
    } else if (gender === "") {
      toast.error("Please select a gender");
    } else if (phone === "") {
      toast.error("Please enter phone number");
    } else if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
    } else if (email === "") {
      toast.error("Email is mandatory");
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email");
    } else {
      dispatch(RegisterPatient(formData))
        .then((res) => {
          if (res?.payload) {
            toast.success("Registration successful!");
            router.push("/clinic");
            onPatientAdded?.();
          } else {
            toast.error("Registration failed");
            // console.error("Registration failed: No payload returned.");
          }
        })
        .catch((error) => {
          toast.error("Registration failed");
          console.error("Error during registration:", error);
        });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${!show && 'flex justify-start w-[200%]'} justify-start`}>
      <div className={`flex flex-col sm:flex-row min-h-screen overflow-hidden ${!show && 'w-[100vw] sm:w[300vw]'}`}>
        {/* Left Image Section */}
        {
          show &&  <div
          className={`w-full sm:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 ${isSliding? 'bg-gradient-to-br from-red-600 to-orange-500' :'bg-gradient-to-br from-green-400 to-green-500'} text-white transition-transform duration-500 ease-in-out sm:transform ${isSliding ? "    sm:translate-x-full " : "sm:translate-x-0"} `}
        >
          <div className="max-w-xl space-y-6">
            <div className="flex items-center space-x-2">
              <Hospital className="h-8 w-8" />
              <h1 className="text-2xl font-bold">HealthCare Plus</h1>
            </div>

            {/* Decorative elements with proper Image implementation */}
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-36 bg-blue-500/30 rounded-full blur-xl"></div>
              <div className="relative w-full h-full">
               {
                isSliding?       <Image
                src={doctorpann}
                alt="Doctor illustration"
                layout="fill"
                objectFit="contain"
                priority
                className="p-6"
              />   : <Image
                src={doctorpanne}
                alt="Doctor illustration"
                layout="fill"
                objectFit="contain"
                priority
                className="p-6"
              />
               }
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">{isSliding? "Welcome Back!" : "Welcome Sir"}</h2>
              <p className="text-sm text-blue-100">Your healthcare journey begins here. Access your medical records, appointments, and more.</p>
            </div>
          </div>
        </div>
        }

        {/* Right Login Form Section */}
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-md mx-auto backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl p-8 border border-white/20">
        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
            {isSliding ? "Login" : "Patient Registration"}
          </h2>
          <p className="text-gray-600 text-center text-sm">
            {isSliding ? "Welcome back!" : "Please enter patient details to continue"}
          </p>
        </div>

        {isSliding ? (
          // Login Form
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>

              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
              Login
            </button>
          </form>
        ) : (
          // Registration Form
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group col-span-2">
                <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData?.name}
                  onChange={(e) => setFormData?.({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>

              <div className="relative group">
                <Calendar className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="date"
                  value={formData?.dob}
                  onChange={(e) => setFormData?.({ ...formData, dob: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>

              <div className="relative group">
                <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <select
                  value={formData?.gender}
                  onChange={(e) => setFormData?.({ ...formData, gender: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="relative group">
                <Phone className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData?.phone}
                  onChange={(e) => setFormData?.({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>

              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData?.email}
                  onChange={(e) => setFormData?.({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400"
                />
              </div>

              <div className="relative group col-span-2">
                <Home className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <textarea
                  placeholder="Address"
                  value={formData?.address}
                  onChange={(e) => setFormData?.({ ...formData, address: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none hover:border-blue-400 resize-none h-24"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Add Patient
            </button>
          </form>
        )}
      </div>
    </div>
      </div>
    </div>
  );
}
