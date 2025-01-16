import {createAsyncThunk,createSlice,PayloadAction} from "@reduxjs/toolkit"
import { addPatientAppointmentAPI, CompletePatientAPI, deletePatientsAPI, getPatientAppointmentAPI, getPatientsAPI, PatientAPI, patientPrescAPI, updatePatientsAPI } from "../../../APIS/Patient/PatientAPI"
import toast from "react-hot-toast"




type AppointmentsState = {
    appointments: Appointment[] | null;
    error: string | null;
  };

// Define types for the Appointment and other states
interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  mode: string;
  appointment_date: string;
  patient?: {
    name: string;
    email?: string;
    phone?: string;
  };
  doctor?: {
    name: string;
    specialization?: string;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  type?: string;
}

interface Patient {
  id: string;
  name: string;
  // Add any other properties you expect
  created_at: string;
  updated_at: string;
  visit_count?: number;
}

// Define a more comprehensive state interface
interface PatientState {
  registerpatient: any[]; // Consider defining a specific type instead of any[]
  allpatients: Patient[];
  deletepatient: string[];
  update: string[];
  complete: any[]; // Consider defining a specific type
  getappointments: AppointmentsState;
  error: string | null;
  loader: boolean;
  appointment: Appointment[] | null;
  prescriptions: any[] | null;
}

// Define the async thunks
interface APIResponse {
  status: number;
  data: any;
}

export const RegisterPatient = createAsyncThunk(
  "register",
  async (data: any, { rejectWithValue }) => {
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
  async (appointment: Appointment, { rejectWithValue }) => {
    try {
      const response = await addPatientAppointmentAPI(appointment) as APIResponse;
      return response.data;
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

export const deletePatient = createAsyncThunk("deletepatient", async (data: string) => {
  try {
    const response = await deletePatientsAPI(data) as APIResponse;
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
});

export const updatePatient = createAsyncThunk("updatepatient", async (data: any) => {
  try {
    const response = await updatePatientsAPI(data) as APIResponse;
    if (response.status === 200) {
      toast.success("Patient updated");
      return "Patient updated";
    } else {
      toast.success("patient updation successfully");
      return "Failed to update patient";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const completePatient = createAsyncThunk("completePatient", async (data: any) => {
  try {
    const response = await CompletePatientAPI(data) as APIResponse;
    if (response.status === 200) {
      toast.success("Patient consultation completed");
      return response.data;
    } else {
      toast.success("Failed to complete consultation");
      return "Failed to complete consultation";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Initial state with proper typing
const initialState: PatientState = {
  registerpatient: [],
  allpatients: [],
  deletepatient: [],
  update: [],
  complete: [],
  getappointments: {
    appointments: null,
    error: null
  },
  error: null,
  loader: false,
  appointment: null,
  prescriptions: null,
};

// Create the slice
export const PatientSlice = createSlice({
  name: "Patientslice",
  initialState: initialState,
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
        state.complete = [action.payload];
      })
      .addCase(completePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null;
      });
  },
});

export default PatientSlice.reducer;
