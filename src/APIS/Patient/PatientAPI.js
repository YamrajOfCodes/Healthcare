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

export const updatePatientsAPI = async(id, data, header)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/patients/${id}`, data, header,"")
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

export const HealthrecordsAPI = async(data, header) => {
    return await commonrequest(
        "POST",
        `${BASE_URL}/api/patients/${data.patient_id}/health-records`,
        data,
        header,
        ""
    );
}

export const transactionsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/transactions`,"",header,"");
}

export const getHealthrecordsAPI = async(data, header) => {
    return await commonrequest(
        "GET",
        `${BASE_URL}/api/patients/${37}/health-records`,
        data,
        header,
        ""
    );
}

export const postBillingAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/billings`,data,header,"");
}

export const getBillingsDetailsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/billings`,"",header,"");
}