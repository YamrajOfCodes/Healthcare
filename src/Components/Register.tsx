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
            console.error("Registration failed: No payload returned.");
          }
        })
        .catch((error) => {
          toast.error("Registration failed");
          console.error("Error during registration:", error);
        });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${!show && 'flex justify-start w-[200%]'}`}>
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
        <div
          className={`w-[100%] sm:w-1/2 flex justify-center items-center p-8 sm:p-12 transition-transform duration-500 ease-in-out transform ${isSliding ? "sm:-translate-x-full" : "sm:translate-x-0"}`}
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{isSliding? "Login" : "Patient Registration"}</h2>
              <p className="text-gray-500">Please enter patient details to continue</p>
            </div>

            {
                isSliding ? <form className="space-y-6">
                {/* Form fields remain unchanged */}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-900">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div className='space-y-2'>
                <label className="flex items-center text-sm font-medium text-gray-900">
                    <Lock className='w-4 h-4 mr-2 text-blue-600'/>
                    Password</label>
                <input
                    type="password"
                    placeholder='*****'
                    className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  login
                </button>
              </form>   :   <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Full Name Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <User className="w-4 h-4 mr-2 text-blue-600" />
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update state on input change
        />
      </div>

      {/* DOB Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-900">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          Date of Birth
        </label>
        <input
          type="date"
          className="w-full px-4 py-3 rounded-xl border text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
      </div>

      {/* Gender Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-900">
          <User className="w-4 h-4 mr-2 text-blue-600" />
          Gender
        </label>
        <select
          className="w-full px-4 py-3 rounded-xl border text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })} // Update state on select change
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-900">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="w-full px-4 py-3 rounded-xl border text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} // Update state on input change
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-900">
          <Mail className="w-4 h-4 mr-2 text-blue-600" />
          Email
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full px-4 py-3 rounded-xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update state on input change
        />
      </div>

      

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-900">
          <Home className="w-4 h-4 mr-2 text-blue-600" />
          Address
        </label>
        <input
          type="textarea"
          placeholder="plot no 10,Pune"
          className="w-full px-4 py-3 rounded-xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })} // Update state on input change
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-0.5"
      >
       Add Patient
      </button>
    </form>
            }

            {/* <p className="text-center text-gray-900">
            {
                isSliding?  " Don't have an account " : "already have an account?"
            }
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={handleOrderChange}
              >
                 {
                isSliding?  " Register" : "login"
            }
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
