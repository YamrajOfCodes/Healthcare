import { commonrequest } from "../commonrequest";
import { BASE_URL } from "../helper";


export const getdoctorsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/doctors`,"",header,"")
}
export const waitingroomAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/waitingrooms`,"",header,"");
}