"use client"
import React, { useState } from 'react'
import { User, Calendar, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/hooks';
import { RegisterPatient } from '@/Redux/Slices/Patient/patientSlices';
import { RegistercomponentProps } from '@/types/auth';
import { useRouter } from 'next/navigation';

const RegisterComponent: React.FC<RegistercomponentProps> = ({ onPatientAdded }) => {

    const dispatch = useAppDispatch();
      const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        email: '',
        phone:'',
        address:''
      });
    
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [id]: value
        }));
      };
    
   
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
    
        // Remove redundant formData declaration - we already have the state
        const { name, dob, gender, phone, email, address } = formData;
    
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex ">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center flex items-center justify-center">
            <User className="mr-3 text-blue-600" />
            Patient Admission
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`
                    block w-full px-4 py-3 border rounded-lg shadow-sm
                  `}
              />
             
            </div>
  
            {/* Date of Birth */}
            <div className="relative">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`
                  block w-full px-4 py-3 border rounded-lg shadow-sm
                `}
              />
            
            </div>
  
            {/* Gender */}
            <div className="relative">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`
                  block w-full px-4 py-3 border rounded-lg shadow-sm
                 
                `}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            
            </div>
  
            {/* Contact Number */}
            <div className="relative">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit contact number"
                className={`
                  block w-full px-4 py-3 border rounded-lg shadow-sm
                 
                `}
              />
              
            </div>
  
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`
                  block w-full px-4 py-3 border rounded-lg shadow-sm
                  
                `}
              />
              
            </div>


            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                 Address
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your  address"
                className={`
                  block w-full px-4 py-3 border rounded-lg shadow-sm
                  
                `}
              />
              
            </div>
  
            {/* Submit Button */}
            <div>
              <button 
                className={`
                  w-full py-3 rounded-lg shadow-lg transition-all duration-300
                  ${isSubmitted 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                  }
                `}
                onClick={handleSubmit}
              >
                {isSubmitted ? 'Submission Successful' : 'Add Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
      );
    
}

export default RegisterComponent
