import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  addPatientAppointmentAPI, 
  CompletePatientAPI, 
  deletePatientsAPI, 
  getBillingsDetailsAPI, 
  getHealthrecordsAPI, 
  getPatientAppointmentAPI, 
  getPatientsAPI, 
  HealthrecordsAPI, 
  PatientAPI, 
  patientPrescAPI, 
  postBillingAPI, 
  transactionsAPI, 
  updatePatientsAPI,
  
} from "../../../APIS/Patient/PatientAPI";
import toast from "react-hot-toast";
import { Patient, PatientState } from "@/types/patient";
import { Appointment, AppointmentsState } from "@/types/appointment";
import { PrescriptionResponse } from "@/types/prescription";
import { getWaitingroom } from "../Admin/adminSlice";

interface APIResponse {
  status: number;
  data: any;
  message?: string;
}

const initialState: PatientState = {
  loader: false,
  error: null,
  allpatients: [],
  update: [],
  complete: [],
  deletepatient: [],
  healthrecord: [],
  getappointments: {
    appointments: null,
    error: null
  },
  prescriptions: [],
  transactions: [],
  gethealthrecords: [],
  getbillings: [],
  billings: [],
  createBilling: null,
  registerpatient: [],
  appointment: []
};


// Define the async thunks
interface RegisterPatientData {
  name: string;
}

interface HealthRecordData {
  patient_id: number;
  description: string;
  date: string;
  medications: string;
  healthMetrics: string;
  attachment_path: string;
}

interface BillingData {
  appointment_id: number;
  total_amount: string;
  paid_amount: string;
  remaining_balance: string;
  status: string;
  services: Array<{
    name: string;
    price: string;
  }>;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

interface UpdatePatientData {
  id: number;
  name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
}

export const RegisterPatient = createAsyncThunk(
  "register",
  async (data: RegisterPatientData, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await PatientAPI(data) as APIResponse;
      if (response.status === 200) {
        toast.success("patient registration successful");
        return response.data;
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getallPatients = createAsyncThunk(
  "getallpatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatientsAPI() as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const Addappointment = createAsyncThunk(
  "appointment/addAppointment",
  async (appointment: Appointment, { rejectWithValue, dispatch }) => {
    try {
      const response = await addPatientAppointmentAPI(appointment) as APIResponse;
      if (response.status === 200) {
        dispatch(getWaitingroom());
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue((error as any).response.data);
    }
  }
);

export const getAppointments = createAsyncThunk(
  "getallappointments", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatientAppointmentAPI() as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("Error while fetching appointments");
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch appointments");
    }
  }
);

export const patientPrescription = createAsyncThunk(
  "patientsprescription", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientPrescAPI() as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("Error while fetching prescriptions");
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch prescriptions");
    }
  }
);

export const deletePatient = createAsyncThunk(
  "deletepatient", 
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await deletePatientsAPI(data.toString()) as APIResponse;
      if (response.status === 200) {
        toast.success("Patient deleted");
        return "Patient deleted";
      } else {
        toast.success("patient deleted successfully");
        return "Failed to delete patient";
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updatePatient = createAsyncThunk(
  "updatepatient", 
  async (data: UpdatePatientData, { rejectWithValue, dispatch }) => {
    try {
      const response = await updatePatientsAPI(
        data.id,
        {
          name: data.name,
          dob: data.dob,
          email: data.email,
          phone: data.phone,
          address: data.address
        },
      ) as APIResponse;
      
      if (response.status === 200) {
        toast.success("Patient updated successfully");
        dispatch(getallPatients()); // Refresh the patients list
        return response.data;
      } else {
        toast.error("Failed to update patient");
        return rejectWithValue("Failed to update patient");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating patient");
      return rejectWithValue(error);
    }
  }
);

export const completePatient = createAsyncThunk(
  "completePatient", 
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await CompletePatientAPI(id) as APIResponse;
      
      if (response.status === 200) {
        toast.success("Patient consultation completed");
        return response.data;
      } else {
        return rejectWithValue(response.message || "Failed to complete consultation");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to complete consultation";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const Healthrecord = createAsyncThunk(
  "HealthrecordsAPI",
  async (data: HealthRecordData, { rejectWithValue }) => {
    try {
      if (!data.patient_id || typeof data.patient_id !== 'number') {
        throw new Error('Invalid patient ID');
      }
      
      // Create the request data
      const requestData = {
        patient_id: data.patient_id,
        description: data.description,
        date: data.date,
        medications: data.medications,
        healthMetrics: data.healthMetrics,
        attachment_path: data.attachment_path
      };
      
      const response = await HealthrecordsAPI(requestData) as APIResponse;
      
      if (response.status === 200) {
        toast.success("Health record is created");
        return response.data;
      } else {
        toast.error("Error while adding record");
        return response.data;
      }
    } catch (error) {
      console.log("Error while adding record", error);
      toast.error("Failed to create health record");
      return rejectWithValue(error);
    }
  }
);

export const Transactionn = createAsyncThunk(
  "Transactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionsAPI() as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);

export const createBilling = createAsyncThunk(
  "billing/create",
  async (data: BillingData, { rejectWithValue }) => {
    try {
      const response = await postBillingAPI(data) as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Failed to create billing");
    }
  }
);

export const getHealthRecord = createAsyncThunk("gethealthRecord",async()=>{
  try {
    const response = await getHealthrecordsAPI();
    if(response.status == 200){
      return response.data;
    }else{
      return response.data
    }
  } catch (error) {
    console.log("error while fetching healthrecord",error);
    
  }
})

export const getBillings = createAsyncThunk(
  "billing/getBillings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBillingsDetailsAPI() as APIResponse;
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Failed to fetch billings");
    }
  }
);

// Create the slice
export const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register Patient
      .addCase(RegisterPatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(RegisterPatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.registerpatient = [action.payload];
      })
      .addCase(RegisterPatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Get All Patients
      .addCase(getallPatients.pending, (state) => {
        state.loader = true;
      })
      .addCase(getallPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loader = false;
        state.allpatients = action.payload;
      })
      .addCase(getallPatients.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Delete Patient
      .addCase(deletePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.loader = false;
        state.deletepatient = [action.payload];
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Add Appointment
      .addCase(Addappointment.pending, (state) => {
        state.loader = true;
      })
      .addCase(Addappointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loader = false;
        state.appointment = [action.payload];
      })
      .addCase(Addappointment.rejected, (state, action: PayloadAction<unknown>) => {
        state.loader = false;
        state.error = action.payload as string;
      })

      // Get Appointments
      .addCase(getAppointments.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAppointments.fulfilled, (state, action: PayloadAction<AppointmentsState>) => {
        state.loader = false;
        state.getappointments = action.payload;  // Directly assign the payload (AppointmentsState)
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Get Prescriptions
      .addCase(patientPrescription.pending, (state) => {
        state.loader = true;
      })
      .addCase(patientPrescription.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loader = false;
        state.prescriptions = action.payload;
      })
      .addCase(patientPrescription.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Update Patient
      .addCase(updatePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.loader = false;
        state.update = [action.payload];
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Complete Patient Consultation
      .addCase(completePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(completePatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.complete = state.complete ? [...state.complete, action.payload] : [action.payload];
      })
      .addCase(completePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload as string || action.error.message;
      })

      // HealthRecord
      .addCase(Healthrecord.pending, (state) => {
        state.loader = true;
      })
      .addCase(Healthrecord.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.healthrecord = [action.payload];
      })
      .addCase(Healthrecord.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Transactions
      .addCase(Transactionn.pending, (state) => {
        state.loader = true;
      })
      .addCase(Transactionn.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.transactions = [action.payload];
      })
      .addCase(Transactionn.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })
      
      //  getrecords
      .addCase(getHealthRecord.pending, (state) => {
        state.loader = true;
      })
      .addCase(getHealthRecord.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.gethealthrecords = [action.payload];
      })
      .addCase(getHealthRecord.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // getbillings
      .addCase(getBillings.pending, (state) => {
        state.loader = true;
      })
      .addCase(getBillings.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.getbillings = [action.payload];
      })
      .addCase(getBillings.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      })

      // Add createBilling reducers
      .addCase(createBilling.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBilling.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.createBilling = action.payload;
      })
      .addCase(createBilling.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      });
  },
});
export const Postbillings = createAsyncThunk("postBillingsDetails",async(data)=>{
  try {
    const response = await postBillingAPI(data);
    console.log(response);
    
    if(response.status == 200){
      toast.success("billing is generated successfully")
      return response.data
    }else{
      toast.error("billing is not generated")
      return response.data
    }
  } catch (error) {
    console.log(error);
    
  }
})

export default PatientSlice.reducer;
