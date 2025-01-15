import { commonrequest } from "../commonrequest";
import { BASE_URL } from "../helper";




export const PatientAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/patients`,data,header,"")
}

export const getPatientsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/patients`,"",header,"")
}

export const deletePatientsAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/api/patients/${data}`,"",header,"")
}

export const updatePatientsAPI = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/patients/${data}`,"",header,"")
}

export const addPatientAppointmentAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/appointments`,data,header,"");
}

export const getPatientAppointmentAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/appointments`,data,header,"");
}

export const patientPrescAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/prescriptions`,data,header,"");
}
export const CompletePatientAPI = async(data,header)=>{
    return await commonrequest("PATCH",`${BASE_URL}/api/waiting-rooms/${data}/complete`,data,header,"");
}